import createError from "../utils/createError.js";
import generateChatTitle from "../utils/generateChatMessage.js";
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

// get all chats by user
export const getAllChats = async (req, res, next) => {
  const userId = req.user.id; // ← verifyToken already put it here

  if (!userId) return next(createError(401, "User id is required"));

  try {
    const chatHistory = await pool.query(
      "SELECT * FROM chats WHERE chats.user_id = $1",
      [userId],
    );
    res.status(200).json({ messages: chatHistory.rows });
  } catch (error) {
    console.log("failed getting user chats", error);
    next(error);
  }
};

export const createNewChat = async (req, res, next) => {
  // grab the user id again, form the verifyToken(auth) mw
  const userId = 1;

  if (!userId) return next(createError(400, "user id is required!"));

  try {
    const message = req.body.message;

    // if (!message) return next(createError(400, "message is required!"));

    // Verify user exists
    // const userResponse = await chatClient.queryUsers({ id: { $eq: userId } });

    // if (!userResponse.users.length)
    //   return next(createError(404, "user not found. Please register first"));

    // generate the title
    const title = await generateChatTitle(groq, message);
    const { rows } = await pool.query(
      "INSERT INTO chats (title, user_id) VALUES ($1, $2) RETURNING *",
      [title, userId],
    );

    const chat = rows[0];

    // creating a channel for the 1on1 converstaion
    const channel = chatClient.channel("messaging", `chat-${userId}`, {
      name: "whispr",
      created_by_id: "whisper_bot", // fixed
    });

    await channel.create();

    res.status(201).json({ chat });
  } catch (error) {
    console.log("failed creating a new chat", error);
    next(error);
  }
};

export const deleteChat = async (req, res, next) => {
const userId = req.user.id;
  const chatId = req.params.id;

  if (!chatId) return next(createError(400, "chat id is required"));
  try {
    await pool.query("DELETE FROM chats WHERE chats.id = $1 AND chats.user_id = $2 RETURNING *", [
      chatId,
      userId
    ]);

    if (!rows.length) return next(createError(404, "chat not found"));

    // delete the corresponding stream channel
    const channel = chatClient.channel("messaging", `chat-${chatId}`);
    await channel.delete();
    res.status(201).json({ msg: "chat has been deleted" });
  } catch (error) {
    console.log("error deelting chat: ", error);
    next(error);
  }
};

// TODO: POST /chats/:id/messages would be a better RESTFUL design
export const sendMessage = async (req, res, next) => {
  // grab the chat content from user
  const { content } = req.body;
  const chatId = req.params.id;
  const userId = 1;

  if (!content)
    return next(createError(401, "message is required!"));

  try {
    const channel = chatClient.channel("messaging", `chat-${chatId}`);
    // save the message to db
    await pool.query(
      "INSERT INTO messages (sender, content, chat_id) VALUES ($1, $2, $3) RETURNING *",
      ["user", content, chatId],
    );

    // send through Stream (for realtime delivery to the frontend)
    await channel.sendMessage({ text: content, user_id: String(userId) });

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