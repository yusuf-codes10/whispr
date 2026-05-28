import express from 'express';
import verifyToken from '../middlewares/verifyToken.js';
import {getAllChats, createNewChat, deleteChat} from '../controllers/chatsController.js';

const router = express.Router();

// get all chats by user
router.get('/', verifyToken, getAllChats);

// create a chat
router.post('/', verifyToken, createNewChat);

// delete a chat
router.delete('/:id', verifyToken, deleteChat);

export default router;