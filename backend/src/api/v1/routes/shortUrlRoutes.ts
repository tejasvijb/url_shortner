import { Router } from "express";

import {
  createShortUrl,
  deleteShortUrl,
  getGlobalUrlAnalytics,
  getUrlAnalytics,
  getUrlInfo,
  getUserUrls,
  redirectShortUrl,
  updateShortUrl,
} from "../controllers/shortUrlController.js";
import validateToken from "../middleware/validateToken.js";

const router = Router();

/**
 * Public Routes
 */

/**
 * Get public information about a short URL
 * GET /info/:shortCode
 */
router.get("/info/:shortCode", getUrlInfo);

/**
 * Protected Routes (require authentication)
 */

/**
 * Create a new short URL
 * POST /
 */
router.post("/", validateToken, createShortUrl);

/**
 * Get global analytics for all user's shortened URLs
 * GET /analytics/global
 */
router.get("/analytics/global", validateToken, getGlobalUrlAnalytics);

/**
 * Get all short URLs for authenticated user
 * GET /
 */
router.get("/", validateToken, getUserUrls);

/**
 * Get analytics for a short URL
 * GET /:shortCode/analytics
 */
router.get("/:shortCode/analytics", validateToken, getUrlAnalytics);

/**
 * Update a short URL
 * PUT /:shortCode
 */
router.put("/:shortCode", validateToken, updateShortUrl);

/**
 * Delete a short URL
 * DELETE /:shortCode
 */
router.delete("/:shortCode", validateToken, deleteShortUrl);

/**
 * Redirect to original URL (must be last to avoid conflicts)
 * GET /:shortCodeOrAlias
 */
router.get("/:shortCodeOrAlias", redirectShortUrl);

export default router;
