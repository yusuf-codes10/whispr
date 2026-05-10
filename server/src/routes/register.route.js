import express from 'express';
import handleRegister from '../controllers/registerController.js';

const router = express.Router();

// register users to stream-chat
router.post('/', handleRegister);

export default router;