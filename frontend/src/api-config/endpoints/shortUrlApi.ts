import api from "../api";
import {
    CreateShortUrlRequestBody,
    CreateShortUrlAPIResponse,
    GetUserUrlsAPIResponse,
    GetUrlInfoAPIResponse,
    GetUrlAnalyticsAPIResponse,
    GetGlobalUrlAnalyticsAPIResponse,
    UpdateShortUrlRequestBody,
    UpdateShortUrlAPIResponse,
    DeleteShortUrlAPIResponse,
    RedirectShortUrlAPIResponse,
} from "../types";

const URLS = {
    create: "/urls",
    list: "/urls",
    info: "/urls/info",
    redirect: "/urls",
    analytics: "/urls",
    globalAnalytics: "/urls/analytics/global",
    update: "/urls",
    delete: "/urls",
};

/**
 * Create a new shortened URL
 */
export const createShortUrl = (body: CreateShortUrlRequestBody) => {
    return api.post<CreateShortUrlAPIResponse>(URLS.create, body);
};

/**
 * Get all shortened URLs for the authenticated user
 */
export const getUserUrls = (page: number = 1, limit: number = 10) => {
    return api.get<GetUserUrlsAPIResponse>(URLS.list, {
        params: { page, limit },
    });
};

/**
 * Get public information about a short URL
 */
export const getUrlInfo = (shortCode: string) => {
    return api.get<GetUrlInfoAPIResponse>(`${URLS.info}/${shortCode}`);
};

/**
 * Redirect to original URL (public endpoint, not typically called from frontend)
 */
export const redirectShortUrl = (shortCodeOrAlias: string) => {
    return api.get<RedirectShortUrlAPIResponse>(
        `${URLS.redirect}/${shortCodeOrAlias}`
    );
};

/**
 * Update a short URL
 */
export const updateShortUrl = (
    shortCode: string,
    body: UpdateShortUrlRequestBody
) => {
    return api.put<UpdateShortUrlAPIResponse>(
        `${URLS.update}/${shortCode}`,
        body
    );
};

/**
 * Delete a short URL
 */
export const deleteShortUrl = (shortCode: string) => {
    return api.delete<DeleteShortUrlAPIResponse>(`${URLS.delete}/${shortCode}`);
};

/**
 * Get analytics for a short URL (owner only)
 */
export const getUrlAnalytics = (shortCode: string) => {
    return api.get<GetUrlAnalyticsAPIResponse>(
        `${URLS.analytics}/${shortCode}/analytics`
    );
};

/**
 * Get global analytics for all user's shortened URLs
 */
export const getGlobalUrlAnalytics = () => {
    return api.get<GetGlobalUrlAnalyticsAPIResponse>(URLS.globalAnalytics);
};
