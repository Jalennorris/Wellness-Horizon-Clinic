import express from 'express';
import user from '../controllers/userController.js'

const router = express.Router();

// Route to create a new user
router.post('/create', user.createUser);

// Route to log in an existing user
router.post('/login', user.loginUser);

router.get('/:id', user.getUserById);

export default router;
