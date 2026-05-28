import express from 'express';
import verifyToken from '../middlewares/verifyToken.js';
import {sendMessage} from '../controllers/messagesController.js';

const router = express.Router();

// send a message
router.post('/', verifyToken, sendMessage);

export default router;