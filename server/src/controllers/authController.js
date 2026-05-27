import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import { StreamChat } from "stream-chat";
import pool from "../db/pool.js";

import createError from "../utils/createError.js";

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI, // http://localhost:5173/auth/callbacku
);

// Initialize Stream Client
const chatClient = StreamChat.getInstance(
  process.env.STREAM_API_KEY,
  process.env.STREAM_API_SECRET,
);

// Step 1: Generate Google login URL
// Vue calls this to get the URL to redirect the user to
export const getGoogleAuthUrl = (req, res) => {
  const url = client.generateAuthUrl({
    access_type: "offline",
    scope: ["openid", "email", "profile"],
  });
  res.json({ url });
};

// Step 2: Handle the code Vue sends back
// Vue picks up ?code=xyz and sends it here
export const handleGoogleCallback = async (req, res, next) => {
  try {
        console.log("KEY:", process.env.STREAM_API_KEY);
console.log("SECRET:", process.env.STREAM_API_SECRET);
    const { code } = req.body;

    // Exchange code for tokens
    const { tokens } = await client.getToken(code);
    client.setCredentials(tokens);

    // Get user info from Google
    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    // 1. Get user info from Google
    const { sub: google_id, email, name, picture } = ticket.getPayload();

    // 2. Check/create in Stream using google_id
    const userResponse = await chatClient.queryUsers({ id: { $eq: google_id } });

    if (!userResponse.users.length) {
      // Add new user to stream
      await chatClient.upsertUser({
        id: google_id,
        name: name,
        email: email,
        role: "user",
      });
    }

    // 3. Check/create in your DB
    let user = await pool.query("SELECT * FROM users WHERE google_id = $1", [
      google_id,
    ]);

    console.log("user has been created it the db");

    if (user.rows.length === 0) {
      // New user — insert them
      user = await pool.query(
        "INSERT INTO users (google_id, email, name, avatar_url) VALUES ($1, $2, $3, $4) RETURNING *",
        [google_id, email, name, picture],
      );
      console.log("user created in db");
    } else {
      console.log("existing user found");
    }

    // 4. Sign JWT
    const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true, // JS can't access it — XSS protection
      secure: process.env.NODE_ENV === "production", // HTTPS only in prod
      sameSite: "lax", // CSRF protection
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
    });

    res.json({ message: "logged in" });
  } catch (error) {
    console.log("failed to sign user in", error);
    next(createError(500, "INTERNAL SEVER ERROR"));
  }
};

export const logout = (req, res) => {
  res.clearCookie('token')
  res.json({ message: 'logged out' })
};