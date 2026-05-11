import createError from "../utils/createError.js";
import { StreamChat } from "stream-chat";
import pool from '../db/pool.js';

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

    // Check if user exists in stream
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
    // checking if user exists in db
    const existingUser = await pool.query('SELECT * FROM users WHERE users.user_id = $1', [userId]);

    if (!existingUser.rows.length) {
      console.log('User does not exist, adding...');
      await pool.query('INSERT INTO users (user_id, name, email) VALUES ($1, $2, $3)', [userId, name, email]);
    }

    res.status(200).json({userId, name, email});
  } catch (error) {
    next(error);
  }
};

export default handleRegister;
