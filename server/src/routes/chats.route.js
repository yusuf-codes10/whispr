import express from 'express';
import verifyToken from '../middlewares/verifyToken';
import {getAllChats} from '../controllers/chatsController.js';

const router = express.Router();

// get all chats by user
router.get('/', verifyToken, getAllChats);

export default router;