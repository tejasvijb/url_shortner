/**
 * Utility functions for URL shortening operations
 */

const BASE62_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

/**
 * Format URL for display (truncate if too long)
 */
export function formatUrlForDisplay(url: string, maxLength: number = 50): string {
  if (url.length <= maxLength) return url;
  return url.substring(0, maxLength) + "...";
}

/**
 * Generate a random short code (6-8 characters)
 * Uses base62 to create a URL-safe short code
 */
export function generateShortCode(length: number = 6): string {
  let shortCode = "";
  for (let i = 0; i < length; i++) {
    shortCode += BASE62_CHARS.charAt(Math.floor(Math.random() * BASE62_CHARS.length));
  }
  return shortCode;
}

/**
 * Get clicks today count (placeholder for analytics)
 */
export function getClicksToday(clicks: number, lastClickedAt?: Date): number {
  if (!lastClickedAt) return 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const lastClicked = new Date(lastClickedAt);
  lastClicked.setHours(0, 0, 0, 0);

  // If last click was today, return 1 (simplified)
  // In a real app, you'd track clicks by date in analytics model
  return lastClicked.getTime() === today.getTime() ? 1 : 0;
}

/**
 * Check if a URL has expired
 */
export function isUrlExpired(expiresAt?: Date): boolean {
  if (!expiresAt) return false;
  return new Date() > new Date(expiresAt);
}

/**
 * Reserved words that cannot be used as custom aliases
 */
const RESERVED_ALIASES = new Set([
  "about",
  "admin",
  "api",
  "app",
  "auth",
  "blog",
  "contact",
  "dashboard",
  "docs",
  "docs-api",
  "ftp",
  "help",
  "login",
  "logout",
  "mail",
  "privacy",
  "profile",
  "register",
  "settings",
  "shop",
  "support",
  "terms",
  "www",
]);

/**
 * Check if alias is reserved
 */
export function isReservedAlias(alias: string): boolean {
  return RESERVED_ALIASES.has(alias.toLowerCase());
}

/**
 * Validate custom alias format
 * Allowed: 3-30 characters, letters (lowercase), numbers, hyphens, underscores
 */
export function validateCustomAlias(alias: string): boolean {
  const aliasRegex = /^[a-z0-9_-]{3,30}$/;
  return aliasRegex.test(alias.toLowerCase());
}

/**
 * Validate if a string is a valid URL
 */
export function validateUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    // Only allow http and https protocols
    return urlObj.protocol === "http:" || urlObj.protocol === "https:";
  } catch {
    return false;
  }
}
