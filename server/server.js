import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import handleError from './src/middlewares/handleError.js';
import catchAll from './src/middlewares/catchAll.js';
import logger from './src/middlewares/logger.js';

import chatsRouter from './src/routes/chats.route.js';
import googleOauthRouter from './src/routes/signup.route.js';

const port = process.env.PORT || 5100;

const app = express();

app.use(logger);
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true  // ← required for cookies to work cross-origin
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/auth', googleOauthRouter);
app.use('/chats', chatsRouter);

// handle errors
app.use(catchAll);
app.use(handleError);

app.listen(port, () => console.log(`server's running on ${port}`));

export default app;