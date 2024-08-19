import redisClient from '../middlewares/cacheMiddleware.js'; // Ensure redisClient is correctly imported
import NodeCache from 'node-cache';

// Create and configure NodeCache
const nodeCache = new NodeCache({ stdTTL: 600 });

// Function to get data from Redis or NodeCache
const getCache = async (key) => {
    try {
        // Check Redis connection
        if (redisClient.connected) {
            const redisData = await new Promise((resolve, reject) => {
                redisClient.get(key, (err, data) => {
                    if (err) return reject(err);
                    resolve(data);
                });
            });

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
        if (redisClient.connected) {
            await new Promise((resolve, reject) => {
                redisClient.setex(key, ttl, JSON.stringify(data), (err) => {
                    if (err) return reject(err);
                    resolve();
                });
            });
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
        if (redisClient.connected) {
            await new Promise((resolve, reject) => {
                redisClient.del(key, (err) => {
                    if (err) return reject(err);
                    resolve();
                });
            });
        }

        // Delete from NodeCache
        nodeCache.del(key);
    } catch (err) {
        console.error('Error deleting cache:', err);
    }
};

export default { getCache, setCache, delCache };
