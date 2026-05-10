import createError from "../utils/createError.js";
import { StreamChat } from "stream-chat";
import Groq from 'groq-sdk';

// Initialize Stream Client
const chatClient = StreamChat.getInstance(
  process.env.STREAM_API_KEY,
  process.env.STREAM_API_SECRET,
);

// Groq initializer
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const handleChat = async (req, res, next) => {
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

    // send a message to the groq
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile", // free and very capable
      messages: [{role: 'user', content: message}],
    });
    console.log(response);

    res.status(200).send("It is working");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default handleChat;
