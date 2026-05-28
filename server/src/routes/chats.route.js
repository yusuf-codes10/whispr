import express from 'express';
import verifyToken from '../middlewares/verifyToken';
import {getAllChats, createNewChat} from '../controllers/chatsController.js';

const router = express.Router();

// get all chats by user
router.get('/', verifyToken, getAllChats);

// create a chat
router.post('/newChat', verifyToken, createNewChat);

export default router;