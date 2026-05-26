import express from 'express';

const router = express.Router();

// redirects user to google login page
router.get('/google');

// recieves the code from google
router.get('/google/callback');

export default router;