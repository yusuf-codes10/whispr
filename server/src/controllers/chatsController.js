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
  const userId = req.user.id;

  if (!userId) return next(createError(400, "user id is required!"));

  try {
    const message = req.body.message;

    if (!message) return next(createError(400, "message is required!"));

    // Verify user exists
    const userResponse = await chatClient.queryUsers({ id: { $eq: userId } });

    if (!userResponse.users.length)
      return next(createError(404, "user not found. Please register first"));

    // generate the title
    const title = await generateChatTitle(message);
    const {rows} = await pool.query("INSERT INTO chats (title, user_id) VALUES ($1, $2) RETURNING *", [
      title,
      userId,
    ]);

    const chat = rows[0];

        // creating a channel for the 1on1 converstaion
    const channel = chatClient.channel("messaging", `chat-${userId}`, {
      name: "whispr",
      created_by_id: "whisper_bot", // fixed
    });

    await channel.create();

    res.status(201).json({chat});
  } catch (error) {
    console.log('failed creating a new chat', error);
    next(error);
  }
};
