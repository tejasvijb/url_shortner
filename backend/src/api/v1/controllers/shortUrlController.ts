import type { Request, Response } from "express";

import { CreateShortUrlBody, UpdateShortUrlBody } from "#/types/shortUrl.js";
import { generateShortCode, isReservedAlias, isUrlExpired, validateCustomAlias, validateUrl } from "#/utils/shortUrlUtils.js";
import asyncHandler from "express-async-handler";

import ShortUrl from "../models/shortUrl.model.js";

/**
 * Create a new shortened URL
 * POST /api/v1/urls
 */
export const createShortUrl = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const { customAlias, description, expiresAt, originalUrl, tags } = req.body as CreateShortUrlBody;

  // Validate original URL
  if (!originalUrl || !originalUrl.trim()) {
    res.status(400).json({ error: "Original URL is required" });
    return;
  }

  if (!validateUrl(originalUrl)) {
    res.status(400).json({ error: "Invalid URL format. Please provide a valid HTTP/HTTPS URL" });
    return;
  }

  // Validate custom alias if provided
  if (customAlias) {
    if (!validateCustomAlias(customAlias)) {
      res.status(400).json({
        error: "Invalid alias format. Use 3-30 characters (letters, numbers, hyphens, underscores)",
      });
      return;
    }

    if (isReservedAlias(customAlias)) {
      res.status(400).json({ error: "This alias is reserved and cannot be used" });
      return;
    }

    // Check if alias is already taken
    const existingUrl = await ShortUrl.findOne({ customAlias: customAlias.toLowerCase() });
    if (existingUrl) {
      res.status(409).json({ error: "This alias is already taken" });
      return;
    }
  }

  // Generate unique short code
  let shortCode: string;
  let attempts = 0;
  const maxAttempts = 10;

  do {
    shortCode = generateShortCode();
    attempts += 1;
  } while ((await ShortUrl.findOne({ shortCode })) && attempts < maxAttempts);

  if (attempts === maxAttempts) {
    res.status(500).json({ error: "Failed to generate short code. Please try again" });
    return;
  }

  // Validate expiration date if provided
  let expirationDate: Date | undefined;
  if (expiresAt) {
    expirationDate = new Date(expiresAt);
    if (expirationDate <= new Date()) {
      res.status(400).json({ error: "Expiration date must be in the future" });
      return;
    }
  }

  // Create new short URL
  const newShortUrl = await ShortUrl.create({
    customAlias: customAlias ? customAlias.toLowerCase() : undefined,
    description: description?.trim(),
    expiresAt: expirationDate,
    originalUrl: originalUrl.trim(),
    shortCode,
    tags: tags?.map((tag: string) => tag.toLowerCase()) || [],
    userId,
  });

  res.status(201).json({
    clickCount: newShortUrl.clickCount,
    createdAt: newShortUrl.createdAt,
    customAlias: newShortUrl.customAlias,
    description: newShortUrl.description,
    expiresAt: newShortUrl.expiresAt,
    id: newShortUrl._id,
    isActive: newShortUrl.isActive,
    originalUrl: newShortUrl.originalUrl,
    shortCode: newShortUrl.shortCode,
    tags: newShortUrl.tags,
  });
});

/**
 * Get all shortened URLs for the authenticated user
 * GET /api/v1/urls
 */
export const getUserUrls = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const urls = await ShortUrl.find({ isActive: true, userId }).sort({ createdAt: -1 }).skip(skip).limit(limit).exec();

  const total = await ShortUrl.countDocuments({ isActive: true, userId });

  res.json({
    data: urls.map((url) => ({
      clickCount: url.clickCount,
      createdAt: url.createdAt,
      customAlias: url.customAlias,
      description: url.description,
      expiresAt: url.expiresAt,
      id: url._id,
      isActive: url.isActive,
      originalUrl: url.originalUrl,
      shortCode: url.shortCode,
      tags: url.tags,
    })),
    pagination: {
      currentPage: page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
});

/**
 * Get public information about a short URL
 * GET /api/v1/urls/:shortCode/info
 */
export const getUrlInfo = asyncHandler(async (req: Request, res: Response) => {
  const { shortCode } = req.params;

  const shortUrl = await ShortUrl.findOne({ isActive: true, shortCode });
  if (!shortUrl) {
    res.status(404).json({ error: "Short URL not found" });
    return;
  }

  // Check if expired
  if (isUrlExpired(shortUrl.expiresAt)) {
    res.status(410).json({ error: "This short URL has expired" });
    return;
  }

  res.json({
    clickCount: shortUrl.clickCount,
    createdAt: shortUrl.createdAt,
    customAlias: shortUrl.customAlias,
    description: shortUrl.description,
    expiresAt: shortUrl.expiresAt,
    id: shortUrl._id,
    isActive: shortUrl.isActive,
    originalUrl: shortUrl.originalUrl,
    shortCode: shortUrl.shortCode,
    tags: shortUrl.tags,
  });
});

/**
 * Redirect to original URL (public endpoint)
 * GET /api/v1/urls/redirect/:shortCodeOrAlias
 */
export const redirectShortUrl = asyncHandler(async (req: Request, res: Response) => {
  const { shortCodeOrAlias } = req.params;

  // Try to find by custom alias first, then by short code
  const shortUrl = await ShortUrl.findOne({
    $or: [{ customAlias: shortCodeOrAlias.toLowerCase() }, { shortCode: shortCodeOrAlias }],
    isActive: true,
  });

  console.log(shortUrl);

  if (!shortUrl) {
    res.status(404).json({ error: "Short URL not found" });
    return;
  }

  // Check if expired
  if (isUrlExpired(shortUrl.expiresAt)) {
    shortUrl.isActive = false;
    await shortUrl.save();
    res.status(410).json({ error: "This short URL has expired" });
    return;
  }

  // Update click count and last clicked timestamp
  shortUrl.clickCount += 1;
  shortUrl.lastClickedAt = new Date();
  await shortUrl.save();

  // // Redirect to original URL
  res.status(200).json({ originalUrl: shortUrl.originalUrl });
});

/**
 * Update a short URL (owner only)
 * PUT /api/v1/urls/:shortCode
 */
export const updateShortUrl = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const { shortCode } = req.params;
  const { customAlias, description, expiresAt, tags } = req.body as UpdateShortUrlBody;

  const shortUrl = await ShortUrl.findOne({ shortCode, userId });
  if (!shortUrl) {
    res.status(404).json({ error: "Short URL not found" });
    return;
  }

  // Validate and update custom alias if provided
  if (customAlias !== undefined) {
    if (customAlias && customAlias !== shortUrl.customAlias) {
      if (!validateCustomAlias(customAlias)) {
        res.status(400).json({
          error: "Invalid alias format. Use 3-30 characters (letters, numbers, hyphens, underscores)",
        });
        return;
      }

      if (isReservedAlias(customAlias)) {
        res.status(400).json({ error: "This alias is reserved" });
        return;
      }

      const existingAlias = await ShortUrl.findOne({ customAlias: customAlias.toLowerCase() });
      if (existingAlias) {
        res.status(409).json({ error: "This alias is already taken" });
        return;
      }

      shortUrl.customAlias = customAlias.toLowerCase();
    } else if (customAlias === "") {
      shortUrl.customAlias = undefined;
    }
  }

  // Update other fields
  if (description !== undefined) {
    shortUrl.description = description?.trim();
  }

  if (expiresAt !== undefined && expiresAt) {
    const expirationDate = new Date(expiresAt);
    if (expirationDate <= new Date()) {
      res.status(400).json({ error: "Expiration date must be in the future" });
      return;
    }

    shortUrl.expiresAt = expirationDate;
  }

  if (tags !== undefined) {
    shortUrl.tags = tags.map((tag: string) => tag.toLowerCase());
  }

  await shortUrl.save();

  res.json({
    clickCount: shortUrl.clickCount,
    createdAt: shortUrl.createdAt,
    customAlias: shortUrl.customAlias,
    description: shortUrl.description,
    expiresAt: shortUrl.expiresAt,
    id: shortUrl._id,
    isActive: shortUrl.isActive,
    originalUrl: shortUrl.originalUrl,
    shortCode: shortUrl.shortCode,
    tags: shortUrl.tags,
  });
});

/**
 * Delete a short URL (owner only)
 * DELETE /api/v1/urls/:shortCode
 */
export const deleteShortUrl = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const { shortCode } = req.params;

  const shortUrl = await ShortUrl.findOne({ shortCode, userId });
  if (!shortUrl) {
    res.status(404).json({ error: "Short URL not found" });
    return;
  }

  // Soft delete - mark as inactive
  shortUrl.isActive = false;
  await shortUrl.save();

  res.json({ message: "Short URL deleted successfully" });
});

/**
 * Get analytics for a short URL (owner only)
 * GET /api/v1/urls/:shortCode/analytics
 */
export const getUrlAnalytics = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const { shortCode } = req.params;

  const shortUrl = await ShortUrl.findOne({ shortCode, userId });
  if (!shortUrl) {
    res.status(404).json({ error: "Short URL not found" });
    return;
  }

  res.json({
    clickCount: shortUrl.clickCount,
    customAlias: shortUrl.customAlias,
    lastClicked: shortUrl.lastClickedAt,
    shortCode: shortUrl.shortCode,
  });
});
