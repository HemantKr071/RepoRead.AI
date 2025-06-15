import express from 'express';
import { redirectURL,authCallback, Logout } from '../controllers/gitAuthController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Auth routes
router.get('/auth/github', redirectURL);
router.get('/auth/github/callback', authCallback);
router.delete('/github/logout',authMiddleware,Logout);

export default router;
