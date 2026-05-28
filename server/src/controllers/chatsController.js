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