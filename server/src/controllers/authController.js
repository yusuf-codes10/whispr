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
