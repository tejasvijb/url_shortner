import redisClient from "./redisClient.js";

const CACHE_TTL = 3600; // 1 hour in seconds

/**
 * Get cached data from Redis
 */
export const getCachedData = async (key: string) => {
  try {
    const cached = await redisClient.get(key);
    console.log("cached data", cached);
    return cached ? JSON.parse(cached) : null;
  } catch (error) {
    console.error("Cache get error:", error);
    return null;
  }
};

/**
 * Set data in Redis cache
 */
export const setCachedData = async (key: string, data: Record<string, unknown>, ttl: number = CACHE_TTL) => {
  try {
    await redisClient.setEx(key, ttl, JSON.stringify(data));
  } catch (error) {
    console.error("Cache set error:", error);
  }
};

/**
 * Delete cached data from Redis
 */
export const deleteCachedData = async (key: string) => {
  try {
    await redisClient.del(key);
  } catch (error) {
    console.error("Cache delete error:", error);
  }
};

/**
 * Delete multiple cached keys
 */
export const deleteCachedDataByPattern = async (pattern: string) => {
  try {
    const keys = await redisClient.keys(pattern);
    if (keys.length > 0) {
      await redisClient.del(keys);
    }
  } catch (error) {
    console.error("Cache delete by pattern error:", error);
  }
};

/**
 * Generate cache key for URL info
 */
export const getUrlInfoCacheKey = (shortCodeOrAlias: string) => {
  return `url-info:${shortCodeOrAlias.toLowerCase()}`;
};

/**
 * Invalidate cache for a URL when it's updated or deleted
 */
export const invalidateUrlCache = async (shortCode: string, customAlias?: string) => {
  const keys = [`url-info:${shortCode.toLowerCase()}`];
  if (customAlias) {
    keys.push(`url-info:${customAlias.toLowerCase()}`);
  }

  for (const key of keys) {
    await deleteCachedData(key);
  }
};
