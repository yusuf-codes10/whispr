import express from 'express';

const router = express.Router();

// register users to stream-chat
router.post('/', (req, res) => {
    res.send('it is working');
})

export default router;