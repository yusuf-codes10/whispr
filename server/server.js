import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import handleError from './src/middlewares/handleError.js';
import catchAll from './src/middlewares/catchAll.js';
import logger from './src/middlewares/logger.js';

import registerRouter from './src/routes/register.route.js';
import chatRouter from './src/routes/chat.route.js';
import googleOauthRouter from './src/routes/signup.route.js';

import { StreamChat } from 'stream-chat';

import Groq from 'groq-sdk';

const port = process.env.PORT || 5100;

dotenv.config();

const app = express();

app.use(logger);
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true  // ← required for cookies to work cross-origin
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Initialize Stream Client
const chatClient = StreamChat.getInstance(
  process.env.STREAM_API_KEY,
  process.env.STREAM_API_SECRET
);

// Groq initializer
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// register user with streamchat
// app.post();
app.use('/register', registerRouter);
// google auth
app.use('/auth', googleOauthRouter);
app.use('/chat', chatRouter);

// handle errors
app.use(catchAll);
app.use(handleError);

app.listen(port, () => console.log(`server's running on ${port}`));