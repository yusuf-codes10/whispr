import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import pool from "../db/pool.js";

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI, // http://localhost:5173/auth/callbacku
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
export const handleGoogleCallback = async (req, res) => {
  const { code } = req.body;

  // Exchange code for tokens
  const { tokens } = await client.getToken(code);
  client.setCredentials(tokens);

  // Get user info from Google
  const ticket = await client.verifyIdToken({
    idToken: tokens.id_token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const { sub: google_id, email, name, picture } = ticket.getPayload();

  // Check if user exists in YOUR database
  const user = await pool.query("SELECT * FROM users WHERE google_id = $1", [
    google_id,
  ]);

  if (user.rows.length === 0) {
    // New user — insert them
    user = await pool.query(
      "INSERT INTO users (google_id, email, name, avatar_url) VALUES ($1, $2, $3, $4) RETURNING *",
      [google_id, email, name, picture],
    );
  }

    // Sign your own JWT
  const token = jwt.sign(
    { id: user.rows[0].id },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )

  res.json({ token })
};
