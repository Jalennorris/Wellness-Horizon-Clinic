import redis from 'redis';

const redisClient = redis.createClient();

redisClient.on('error', (err) => {
    console.error('Redis Client Error:', err);
});

redisClient.connect().catch(err => console.error('Redis connection error:', err)); // Ensure connection for Redis v4+

const cache = async (req, res, next) => {
    const { userId } = req.params;

    try {
        if (!redisClient.connected) {
            console.warn('Redis not connected');
            return next();
        }

        const cachedData = await redisClient.get(userId);

        if (cachedData) {
            console.log('Cache hit in Redis');
            return res.json(JSON.parse(cachedData));
        }

        // If no data is found in cache, proceed to next middleware
        next();
    } catch (err) {
        console.error('Redis error:', err);
        next(); // Proceed even if there’s an error to avoid blocking the request
    }
};

export default cache;

