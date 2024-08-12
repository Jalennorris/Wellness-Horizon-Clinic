import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

// Route to create a new user
router.post('/create', userController.createUser);

// Route to log in an existing user
router.post('/login', userController.loginUser);

export default router;
