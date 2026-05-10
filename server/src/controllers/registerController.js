import createError from "../utils/createError.js";
import { StreamChat } from 'stream-chat';

// Initialize Stream Client
const chatClient = StreamChat.getInstance(
  process.env.STREAM_API_KEY,
  process.env.STREAM_API_SECRET
);

const handleRegister = async (req, res, next) => {
  const { name, email } = req.body;

  if (!name || !email)
    return next(createError(400, "Please, include your name and email!"));

  try {
    const userId = email.replace(/[^a-zA-Z0-9_-]/g, "_");

    // Check if user exists
    const userResponse = await chatClient.queryUsers({ id: { $eq: userId } });

    console.log(userResponse);
    res.status(200).send("It is working");
  } catch (error) {
    next(error);
  }
};

export default handleRegister;
