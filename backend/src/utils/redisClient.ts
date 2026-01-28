import { createClient } from "redis";

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on("error", (err) => {
  console.error("Redis Client Error", err);
});

redisClient.on("connect", () => {
  console.log("Redis Client Connected");
});

// Connect to Redis
await redisClient.connect().catch((err) => {
  console.error("Failed to connect to Redis:", err);
});

export default redisClient;
