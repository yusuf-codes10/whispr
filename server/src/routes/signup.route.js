import express from 'express';
import {handleGoogleCallback, getGoogleAuthUrl} from '../controllers/authController.js';

const router = express.Router();

// redirects user to google login page
router.get('/google', getGoogleAuthUrl);

// recieves the code from google
router.get('/google/callback', handleGoogleCallback);

export default router;