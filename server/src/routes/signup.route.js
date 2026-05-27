import express from 'express';
import {handleGoogleCallback, getGoogleAuthUrl, logout, getMe} from '../controllers/authController.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

// redirects user to google login page
router.get('/google', getGoogleAuthUrl);

// recieves the code from google
router.post('/google/callback', handleGoogleCallback);

router.post('/logout', logout);

router.get('/me', verifyToken, () => {
    res.status(200).json({ user: req.user });
});

export default router;