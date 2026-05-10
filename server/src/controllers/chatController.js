import createError from "../utils/createError.js";
import { StreamChat } from "stream-chat";
import Groq from "groq-sdk";
import pool from "../db/pool.js";

// Initialize Stream Client
const chatClient = StreamChat.getInstance(
  process.env.STREAM_API_KEY,
  process.env.STREAM_API_SECRET,
);

// Groq initializer
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const handleChat = async (req, res, next) => {
  console.log("KEY:", process.env.STREAM_API_KEY);
  console.log("SECRET:", process.env.STREAM_API_SECRET);
  const { message, userId } = req.body;

  if (!message || !userId)
    return next(createError(400, "The message and user id are requierd!"));

  try {
    // Verify user exists
    const userResponse = await chatClient.queryUsers({ id: userId });

    if (!userResponse.users.length)
      return next(createError(404, "user not found. Please register first"));

    // checking if user exists in db
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE users.user_id = $1",
      [userId],
    );

    if (!existingUser.rows.length) {
      return next(createError(404, "User not found! please register first!"));
    }

    // send a message to the groq
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile", // free and very capable
      messages: [{ role: "user", content: message }],
    });
    console.log(response.choices[0].message.content);

    const aiMessage = response.choices[0].message.content;

    // Save chat to db
    await pool.query(
      "INSERT INTO chats (user_id, message, reply) VALUES ($1, $2, $3)",
      [userId, message, aiMessage],
    );

    // creating a channel for the 1on1 converstaion
    const channel = chatClient.channel("messaging", `chat-${userId}`, {
      name: "whispr",
      created_by_id: "whisper_bot", // fixed
    });

    await channel.create();
    await channel.sendMessage({ text: aiMessage, user_id: "whisper_bot" });

    res.status(200).json({ reply: aiMessage });
  } catch (error) {
    console.log("error getting the response", error);
    next(error);
  }
};

export const getChatHistory = async (req, res, next) => {
  const {userId} = req.body;

  if (!userId) return next(createError(400, 'User id is required!'));

  try {
    const chatHistory = await pool.query('SELECT * FROM chats WHERE chats.user_id = $1', [userId]);

    res.status(200).json({messages: chatHistory.rows});
  } catch (error) {
    console.log('Error Fetching chat history', error);
    next(error);
  }
}
