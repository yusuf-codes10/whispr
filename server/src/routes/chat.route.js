import express from 'express';
import {handleChat, getChatHistory} from '../controllers/chatController.js';

const router = express.Router();

router.post('/', handleChat);

router.post('/get-messages', getChatHistory);

export default router;