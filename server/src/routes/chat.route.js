import express from 'express';

const router = express.Router();

router.post('/', handleChat);

export default router;