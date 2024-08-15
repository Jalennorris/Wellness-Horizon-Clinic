import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateToken = (user, secret = process.env.JWT_SECRET, expiresIn = '1h') => {
    if (!secret) throw new Error('JWT secret is not defined');
    
    const payload = {
        id: user.id,
        username: user.username,
        email: user.email
    };
    return jwt.sign(payload, secret, { expiresIn });
};

export const verifyToken = (token, secret = process.env.JWT_SECRET) => {
    if (!secret) throw new Error('JWT secret is not defined');

    try {
        return jwt.verify(token, secret);
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
};

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    if (token == null) return res.status(401).json({ error: 'No token provided' });

    try {
        const user = verifyToken(token);
        req.user = user; // Attach user information to request
        next();
    } catch (error) {
        res.status(403).json({ error: 'Invalid token' });
    }
};

export default generateToken;
