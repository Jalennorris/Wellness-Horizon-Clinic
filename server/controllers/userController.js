import pool from '../db/index.js';
import bcrypt from 'bcrypt';
import generateToken from '../utils/authUtils.js';
import { createBadRequestResponse, createErrorResponse } from '../utils/errorUtils.js';

const saltRounds = 10;

export default {
    createUser: async (req, res) => {
        try {
            const { username, password, email } = req.body;

            // Check if all required fields are provided
            if (!username || !password || !email) {
                return res.status(400).json(createBadRequestResponse('Username, password, and email are required.'));
            }

            // Check if username or email already exists
            const checkQuery = 'SELECT * FROM users WHERE username = $1 OR email = $2';
            const { rows: existingUsers } = await pool.query(checkQuery, [username, email]);
            
            if (existingUsers.length > 0) {
                // Check if the username or email exists
                const existingUser = existingUsers[0];
                if (existingUser.username === username) {
                    return res.status(400).json(createBadRequestResponse('Username already exists.'));
                } else if (existingUser.email === email) {
                    return res.status(400).json(createBadRequestResponse('Email already exists.'));
                }
            }


            // Hash the password
            const hashPassword = await bcrypt.hash(password, saltRounds);

            // Insert the new user into the database
            const insertQuery = 'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *';
            const { rows: newUser } = await pool.query(insertQuery, [username, hashPassword, email]);

            res.status(201).json(newUser[0]);
            
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json(createErrorResponse('Internal server error while creating user.'));
        }
    },

    loginUser: async (req, res) => {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                return res.status(400).json(createBadRequestResponse('Username and password are required.'));
            }

            const query = 'SELECT * FROM users WHERE username = $1';
            const { rows: users } = await pool.query(query, [username]);
            if (users.length === 0) {
                return res.status(404).json(createBadRequestResponse('User not found.'));
            }

            const user = users[0];
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json(createBadRequestResponse('Password is incorrect.'));
            }

            // Generate JWT token
            const token = generateToken(user, process.env.JWT_SECRET);

            res.status(200).json({
                status: true,
                message: 'Login successful',
                token
            });

        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json(createErrorResponse('Internal server error during login.'));
        }
    }
};
