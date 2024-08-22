// server/utils/cacheUtils.js
import redisClient from '../middlewares/cacheMiddleware.js'
import NodeCache from 'node-cache';

// Create and configure NodeCache
const nodeCache = new NodeCache({ stdTTL: 600 }); // Default TTL is 600 seconds (10 minutes)

// Function to get data from Redis or NodeCache
const getCache = async (key) => {
    try {
        let redisData;

        // Check Redis connection and get data from Redis
        if (redisClient.isOpen) {
            redisData = await redisClient.get(key); // Redis v4 style
            if (redisData) {
                console.log('Cache hit in Redis');
                return JSON.parse(redisData);
            }
        }

        // If Redis miss, check NodeCache
        console.log('Cache miss in Redis, checking NodeCache');
        const nodeCacheData = nodeCache.get(key);
        if (nodeCacheData) {
            console.log('Cache hit in NodeCache');
            return nodeCacheData;
        }

        // Cache miss in both Redis and NodeCache
        return null;
    } catch (err) {
        console.error('Error accessing cache:', err);
        throw err;
    }
};

// Function to set data in Redis and NodeCache
const setCache = async (key, data, ttl = 3600) => {
    try {
        // Set in Redis
        if (redisClient.isOpen) {
            await redisClient.setEx(key, ttl, JSON.stringify(data)); // Redis v4 syntax for setting with expiration
        }

        // Set in NodeCache
        nodeCache.set(key, data, ttl);
    } catch (err) {
        console.error('Error setting cache:', err);
    }
};

// Function to delete data from Redis and NodeCache
const delCache = async (key) => {
    try {
        // Delete from Redis
        if (redisClient.isOpen) {
            await redisClient.del(key);
        }

        // Delete from NodeCache
        nodeCache.del(key);
    } catch (err) {
        console.error('Error deleting cache:', err);
    }
};

// Export NodeCache and cache utility functions
export default {
    getCache,
    setCache,
    delCache,
    nodeCache,
};