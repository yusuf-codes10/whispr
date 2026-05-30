import createError from "../utils/createError.js";
import generateChatTitle from "../utils/generateChatMessage.js";
import { StreamChat } from "stream-chat";
import sendMessageUtil from "../utils/sendMessage.js";
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
    const {rows} = await pool.query(
      "SELECT * FROM chats WHERE chats.user_id = $1",
      [userId],
    );
    res.status(200).json({ messages: rows });
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

    // generate the title
    const title = await generateChatTitle(groq, message);
    const { rows } = await pool.query(
      "INSERT INTO chats (title, user_id) VALUES ($1, $2) RETURNING *",
      [title, userId],
    );

    const chat = rows[0];

    // ✅ Upsert the real user into Stream before using them
    await chatClient.upsertUser({
      id: String(userId),
      name: req.user.name,
    });

    // ✅ Use chat.id (DB id), not userId
    const channel = chatClient.channel("messaging", `chat-${chat.id}`, {
      name: "whispr",
      created_by_id: String(userId), // ✅ must match an existing Stream user
    });
    await channel.create();

    // send that first message too
    await sendMessageUtil(groq, pool, channel, message, userId, chat.id);

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
    const { rows } = await pool.query(
      "DELETE FROM chats WHERE chats.id = $1 AND chats.user_id = $2 RETURNING *",
      [chatId, userId],
    );

    // fixed rows bug
    if (rows.length === 0) return next(createError(404, "chat not found"));

    // ✅ Use chatId, not userId
    const channel = chatClient.channel("messaging", `chat-${chatId}`);
    await channel.delete();
    res.status(201).json({ msg: "chat has been deleted" });
  } catch (error) {
    console.log("error deelting chat: ", error);
    next(error);
  }
};

export const sendMessage = async (req, res, next) => {
  // grab the chat content from user
  const { content } = req.body;
  const chatId = req.params.id;
  const userId = req.user.id;

  if (!content) return next(createError(401, "message is required!"));

  try {
    const channel = chatClient.channel("messaging", `chat-${chatId}`);

    // fetch last 10 messages
    const context = await pool.query('SELECT * FROM messages AS msg WHERE msg.chat_id = $1 LIMIT 10', [chatId]);

        // Format for Groq
    const conversation = context.rows.flatMap((chat) => [
      { sender: "user", content: chat.content },
      { sender: "assistant", content: chat.content },
    ]);

    // add the message to send
    conversation.push({sender: 'user', content: content});


    const whisprMessage = await sendMessageUtil(groq, pool, channel, conversation, content, userId, chatId);


    res.status(201).json({ msg: whisprMessage });
  } catch (error) {
    console.log("error sending message: ", error);
    next(error);
  }
};

export const getAllMessages = async (req, res, next) => {
  // grab the id
  const chatId = req.params.id;

  if(!chatId) return next(createError(404, 'Chat id is required'));

  try {
    const {rows} = await pool.query('SELECT * FROM messages AS msg WHERE msg.chat_id = $1', [chatId]);

    res.status(200).json({messages: rows});
  } catch (error) {
    console.log('error fetching messages', error);
    next(error);
  }
}
