import express from 'express';
import {handleGoogleCallback, getGoogleAuthUrl, logout} from '../controllers/authController.js';

const router = express.Router();

// redirects user to google login page
router.get('/google', getGoogleAuthUrl);

// recieves the code from google
router.post('/google/callback', handleGoogleCallback);

router.post('/logout', logout);

export default router;