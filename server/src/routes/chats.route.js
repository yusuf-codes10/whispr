import express from 'express';
import verifyToken from '../middlewares/verifyToken.js';
import {getAllChats, createNewChat, generateChatTitle} from '../controllers/chatsController.js';

const router = express.Router();

// get all chats by user
router.get('/', verifyToken, getAllChats);

// create a chat
router.post('/newChat', verifyToken, createNewChat);

// generate chat title
router.post('/title', generateChatTitle);

export default router;