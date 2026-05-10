import createError from "../utils/createError.js";
import { StreamChat } from "stream-chat";

// Initialize Stream Client
const chatClient = StreamChat.getInstance(
  process.env.STREAM_API_KEY,
  process.env.STREAM_API_SECRET,
);

const handleRegister = async (req, res, next) => {
    console.log("KEY:", process.env.STREAM_API_KEY);
console.log("SECRET:", process.env.STREAM_API_SECRET);

// ?TODO: a race condition to fix later
  const { name, email } = req.body;

  if (!name || !email)
    return next(createError(400, "Please, include your name and email!"));

  try {
    const userId = email.replace(/[^a-zA-Z0-9_-]/g, "_");

    // Check if user exists
    const userResponse = await chatClient.queryUsers({ id: { $eq: userId } });

    console.log(userResponse);

    if (!userResponse.users.length) {
      // Add new user to stream
      await chatClient.upsertUser({
        id: userId,
        name: name,
        email: email,
        role: "user",
      });
    }
    res.status(200).json({userId, name, email});
  } catch (error) {
    next(error);
  }
};

export default handleRegister;
