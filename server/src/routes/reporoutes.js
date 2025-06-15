import express from 'express';
import { getAllRepos,generateReadme } from '../controllers/githubController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();


// Protected routes (require user to be logged in with valid JWT)
router.use(authMiddleware);

// Repos routes
router.get('/repos', getAllRepos);              
router.get('/repos/readme/:id', generateReadme); 

export default router;
