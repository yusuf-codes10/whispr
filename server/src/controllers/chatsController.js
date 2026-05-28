import createError from "../utils/createError";
import { StreamChat } from "stream-chat";
import pool from '../db/pool.js';
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
    const userId = req.user.id  // ← verifyToken already put it here

    if (!userId) return next(createError(401, 'User id is required'));

    try {
        const chatHistory = await pool.query('SELECT * FROM chats WHERE chats.user_id = $1', [userId]);
        res.status(200).json({messages: chatHistory.rows});
    } catch (error) {
        console.log('failed getting user chats', error);
        next(error);
    }
}

export const createNewChat = async (req, res, next) => {
    // grab the user id again, form the verifyToken(auth) mw
    const userId = req.user.id;

    if (!userId) return next(createError(400, 'user id is required!'));

    // grab chat info from the user

    try {
        await pool.query('INSERT INTO chats ()')
    } catch (error) {
        
    }
}

export const generateChatTitle = async (req, res, next) => {
    const message = req.body.message;
    const prompt = 'Extract a title out of this: ';
    // send a message to the groq
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile", // free and very capable
      messages: prompt + message,
    });
    console.log(response.choices[0].message.content);
}