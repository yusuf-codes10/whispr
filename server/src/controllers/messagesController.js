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
    const {content, chatId} = req.body;

    if (!content || !chatId) return next(createError(401, 'message is required!'));

    try {
        // save the message to db
        await pool.query('INSERT INTO messages (sender, content, chat_id) VALUES ($1, $2, $3) RETURNING *', ['user', content, chatId]);

            // send a message to the groq
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile", // free and very capable
      messages: [{ role: "user", content:  content }],
    });

    const whisprMessage = response.choices[0].message.content;

    // save AI response to db
    await pool.query('INSERT INTO messages (sender, content, chat_id) VALUES ($1, $2, $3) RETURNING *', ['assistant', whisprMessage, chatId]);

    res.status(201).json({msg: whisprMessage});
    } catch (error) {
        console.log('error sending message: ', error);
        next(error);
    }
}