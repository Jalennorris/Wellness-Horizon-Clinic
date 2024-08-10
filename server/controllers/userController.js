import pool from '../db/index.js';
import bcrypt from 'bcrypt';  // Fixed the import statement
import jwt from 'jsonwebtoken';

const saltRounds = 10;

export default {
    createUser: async (req, res) => {
        try {
            const { username, password, email } = req.body;

            // Check if all required fields are provided
            if (!username || !password || !email) {
                return res.status(400).json({
                    message: 'Username, password, and email are required.'
                });
            }

            // Check if username or email already exists
            const checkQuery = 'SELECT * FROM users WHERE username = $1 OR email = $2'; // Correct table name and query
            const { rows: existingUser } = await pool.query(checkQuery, [username, email]);

            if (existingUser.length > 0) {
                const existingField = existingUser[0].username === username ? 'username' : 'email';
                return res.status(400).json({
                    message: `${existingField} already exists.`
                });
            }

            // Hash the password
            const hashPassword = await bcrypt.hash(password, saltRounds);

            // Insert the new user into the database
            const insertQuery = 'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *'; // Correct table name and column names
            const { rows: newUser } = await pool.query(insertQuery, [username, hashPassword, email]);

            res.status(201).json(newUser[0]);
            
        } catch (error) {
            console.error('Error creating user:', error); 
            res.status(500).json({
                message: 'Internal server error while creating user.',
                error: error.message
            });
        }
    },
    loginUser: async (req, res) => {
        try {
            const{username,password} = req.body;
            if(!username || !password){
                return res.status(400).json({
                    status:false,
                    message:"Username and passowrd are required"
                })
            }
            const query = ( 'SELECT * FROM users WHERE username = $1')
            const{rows:users} = await pool.query(query[username,password])
            if(user.length === 0){
                return res.status.json({
                    status: false,
                    message: "User not found"
                })
            }
            const user = users[0]
            
        } catch (error) {
            
        }
    }

};
