// server/middleware/cacheMiddleware.js
import redis from 'redis';
import NodeCache from 'node-cache';

// Create and configure Redis client
const redisClient = redis.createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
});

redisClient.on('error', (err) => {
    console.error('Redis Client Error:', err);
});

const connectRedis = async () => {
    try {
        await redisClient.connect();
        console.log('Connected to Redis');
    } catch (err) {
        console.error('Redis connection error:', err);
    }
};

// Connect to Redis on startup
connectRedis();

// Create and configure NodeCache
const nodeCache = new NodeCache({ stdTTL: 600 }); // Default TTL is 600 seconds (10 minutes)

// Middleware for caching
const cacheMiddleware = async (req, res, next) => {
    const { userId } = req.params;

    try {
        // Check Redis connection and get data from Redis
        let redisData;
        try {
            redisData = await redisClient.get(userId);
        } catch (err) {
            console.error('Error getting data from Redis:', err);
        }

        if (redisData) {
            console.log('Cache hit in Redis');
            return res.json(JSON.parse(redisData));
        }

        // If Redis miss, check NodeCache
        console.log('Cache miss in Redis, checking NodeCache');
        const nodeCacheData = nodeCache.get(userId);
        if (nodeCacheData) {
            console.log('Cache hit in NodeCache');
            return res.json(nodeCacheData);
        }

        // Cache miss in both Redis and NodeCache
        // Proceed with the request
        res.sendResponse = res.json;
        res.json = (body) => {
            // Store in NodeCache
            nodeCache.set(userId, body);
            // Store in Redis
            redisClient.set(userId, JSON.stringify(body)).catch((err) => {
                console.error('Error setting data in Redis:', err);
            });
            res.sendResponse(body);
        };
        
        next();
    } catch (err) {
        console.error('Error accessing cache:', err);
        next(); // Proceed even if there’s an error to avoid blocking the request
    }
};

// Export Redis client and cache middleware
export default { redisClient, cacheMiddleware };
