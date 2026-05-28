import createError from "../utils/createError.js";
import { StreamChat } from "stream-chat";
import pool from "../db/pool.js";
import Groq from "groq-sdk";

// Initialize Stream Client
const chatClient = StreamChat.getInstance(
  process.env.STREAM_API_KEY,
  process.env.STREAM_API_SECRET,
);

// Groq initializer
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// TODO: POST /chats/:id/messages would be a better RESTFUL design
export const sendMessage = async (req, res, next) => {
  // grab the chat content from user
  const { content, chatId } = req.body;
  const userId = req.user.id;

  if (!content || !chatId)
    return next(createError(401, "message is required!"));

  try {
    const channel = chatClient.channel("messaging", `chat-${chatId}`);
    // save the message to db
    await pool.query(
      "INSERT INTO messages (sender, content, chat_id) VALUES ($1, $2, $3) RETURNING *",
      ["user", content, chatId],
    );

    // send through Stream (for realtime delivery to the frontend)
    await channel.sendMessage({ text: content, user_id: userId });

    // send a message to the groq
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile", // free and very capable
      messages: [{ role: "user", content: content }],
    });

    const whisprMessage = response.choices[0].message.content;

    // save AI response to db
    await pool.query(
      "INSERT INTO messages (sender, content, chat_id) VALUES ($1, $2, $3) RETURNING *",
      ["assistant", whisprMessage, chatId],
    );

    // send AI response through Stream
    await channel.sendMessage({ text: whisprMessage, user_id: "whisper_bot" });

    res.status(201).json({ msg: whisprMessage });
  } catch (error) {
    console.log("error sending message: ", error);
    next(error);
  }
};
