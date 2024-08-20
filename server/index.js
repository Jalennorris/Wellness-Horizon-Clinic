import https from 'https';
import fs from 'fs';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet'; // Added helmet import
import userRoute from './routes/userRoute.js'
import appointmentRoute from './routes/appointmentRoute.js'

dotenv.config();

const app = express();
const port = process.env.PORT || 3000; // Default to 3000 if PORT is not defined

const sslcert = './cert.pem';
const sslkey = './key.pem';

// SSL certificates
const privateKey = fs.readFileSync(sslkey, 'utf8');
const certificate = fs.readFileSync(sslcert, 'utf8');
const credentials = { key: privateKey, cert: certificate };

// Middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100
});

app.use(limiter);
app.use(helmet()); // Added Helmet for security
app.use(cors({
    origin: "*" // Consider restricting this in production
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/user', userRoute);
app.use('/appointment', appointmentRoute);

// Middleware for setting secure cookies
app.use((req, res, next) => {
    res.cookie('name', 'value', {
        secure: true,
        httpOnly: true
    });
    next();
});

// Custom root path route
app.get('/', (req, res) => {
    res.json({
        status: true,
        message: "Welcome to the API"
    });
});

// 404 Handler
app.use("*", (req, res) => {
    res.status(404).json({
        status: false,
        message: "API Doesn't exist"
    });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ // Added status code to response
        status: false,
        message: 'Internal Server Error',
        error: err.message // Include error message for debugging
    });
});

// Create HTTPS server
const server = https.createServer(credentials, app);

server.listen(port, () => {
    console.log(`Server is running on https://localhost:${port}`);
});

