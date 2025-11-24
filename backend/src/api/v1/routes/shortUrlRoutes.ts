import { Router } from "express";

import {
  createShortUrl,
  deleteShortUrl,
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
 * Redirect to original URL
 * GET /:shortCodeOrAlias
 */
router.get("/:shortCodeOrAlias", redirectShortUrl);

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
 * Get all short URLs for authenticated user
 * GET /
 */
router.get("/", validateToken, getUserUrls);

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
 * Get analytics for a short URL
 * GET /:shortCode/analytics
 */
router.get("/:shortCode/analytics", validateToken, getUrlAnalytics);

export default router;
