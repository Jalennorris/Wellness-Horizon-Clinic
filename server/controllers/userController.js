import pool from '../db/index.js';
import bcrypt from 'bcrypt';
import generateToken from '../utils/authUtils.js';
import { createErrorResponse, createBadRequestResponse } from '../utils/errorUtils.js';
import cacheUtils from '../utils/cacheUtils.js';


const saltRounds = 10;

export default {

    getUserById: async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json(createBadRequestResponse('The ID is needed to get the user.'));
            }

            // Check cache first
            const cacheKey = `user:${id}`;
            let user = await cacheUtils.getCache(cacheKey);

            if (!user) {
                console.log('Cache miss, querying database');
                const query = 'SELECT * FROM users WHERE id = $1';
                const { rows: users } = await pool.query(query, [id]);
                if (users.length === 0) {
                    return res.status(404).json(createBadRequestResponse(`User with ID ${id} not found.`));
                }
                user = users[0];
                await cacheUtils.setCache(cacheKey, user); // Cache the user data
            } else {
                console.log('Returning cached user data');
            }

            res.set('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
            return res.status(200).json({
                user,
                message: "User retrieved successfully."
            });
        } catch (error) {
            return res.status(500).json(createErrorResponse(error.message));
        }

    },
    createUser: async (req, res) => {
        try {
            const {firstname, lastname, sex, phone ,username, password, email } = req.body;

            // Check if all required fields are provided
            if (!firstname && !lastname && !sex && !phone &&!username && !password &&!email)  {
                return res.status(400).json(createBadRequestResponse(' firstname, lastname, Username, phone, password, and email are required.'));
            }

            // Check if username or email already exists
            const checkQuery = 'SELECT * FROM users WHERE username = $1 OR email = $2';
            const { rows: existingUsers } = await pool.query(checkQuery, [username, email]);

            if (existingUsers.length > 0) {
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
            const insertQuery = 'INSERT INTO users (firstname, lastname, sex, phone, username, password, email) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
            const { rows: newUser } = await pool.query(insertQuery, [firstname, lastname, sex, phone, username, hashPassword, email]);

            // Clear any existing cache for the user
            await cacheUtils.delCache('user:' + username);

            res.set('Cache-Control', 'no-store'); // Disable caching for user creation
            res.status(201).json(newUser[0]);

        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json(createErrorResponse('Internal server error while creating user.'));
        }
    },

    loginUser: async (req, res) => {
        try {
            const { username, password,id } = req.body;
            if (!username || !password) {
                return res.status(400).json(createBadRequestResponse('Username and password are required.'));
            }

            // Attempt to retrieve user data from cache (Redis or NodeCache)
            const cacheKey = 'user:' + username;
            let user = await cacheUtils.getCache(cacheKey);

            if (!user) {
                console.log('Cache miss, querying database');
                // Query the database if the user is not in the cache
                const query = 'SELECT * FROM users WHERE username = $1';
                const { rows: users } = await pool.query(query, [username]);
                if (users.length === 0) {
                    return res.status(404).json(createBadRequestResponse('User not found.'));
                }
                user = users[0];

                // Cache the user data in both Redis and NodeCache
                await cacheUtils.setCache(cacheKey, user);
            } else {
                console.log('Returning cached user data');
            }

            // Compare the password with the hashed password in the database
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json(createBadRequestResponse('Password is incorrect.'));
            }

            // Generate JWT token
            const token = generateToken(user, process.env.JWT_SECRET);

            res.set('Cache-Control', 'private, max-age=3600'); // Cache the token for 1 hour
            res.status(200).json({
                status: true,
                message: 'Login successful',
                token,
                id: user.id
            });
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json(createErrorResponse('Internal server error during login.'));
        }
    }
};