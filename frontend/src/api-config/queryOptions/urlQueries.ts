import { queryOptions } from "@tanstack/react-query";
import {
    createShortUrl,
    deleteShortUrl,
    getUrlAnalytics,
    getUrlInfo,
    getUserUrls,
    redirectShortUrl,
    updateShortUrl,
} from "../endpoints/shortUrlApi";
import { CreateShortUrlRequestBody, UpdateShortUrlRequestBody } from "../types";

export const urlQueries = {
    redirectShortUrlOptions: (shortCodeOrAlias: string) =>
        queryOptions({
            queryFn: () => redirectShortUrl(shortCodeOrAlias),
            queryKey: ["urls", "redirect", shortCodeOrAlias],
            refetchOnMount: "always",
            retry: false,
        }),

    getUserUrlsOptions: (page: number = 1, limit: number = 10) =>
        queryOptions({
            queryFn: () => getUserUrls(page, limit),
            queryKey: ["urls", "list", page, limit],
        }),

    /**
     * Get public information about a URL
     */
    getUrlInfoOptions: (shortCode: string) =>
        queryOptions({
            queryFn: () => getUrlInfo(shortCode),
            queryKey: ["urls", "info", shortCode],
        }),

    getUrlAnalyticsOptions: (shortCode: string) =>
        queryOptions({
            queryFn: () => getUrlAnalytics(shortCode),
            queryKey: ["urls", "analytics", shortCode],
        }),
};

// ============= MUTATION OPTIONS =============

export const urlMutationOptions = {
    createShortUrl: {
        mutationFunction: ({ body }: { body: CreateShortUrlRequestBody }) => {
            return createShortUrl(body);
        },
    },

    updateShortUrl: {
        mutationFunction: ({
            shortCode,
            body,
        }: {
            shortCode: string;
            body: UpdateShortUrlRequestBody;
        }) => {
            return updateShortUrl(shortCode, body);
        },
    },
    deleteShortUrl: {
        mutationFunction: ({ shortCode }: { shortCode: string }) => {
            return deleteShortUrl(shortCode);
        },
    },
};

// // ============= CUSTOM HOOKS (Optional) =============

// /**
//  * Hook to fetch user's shortened URLs
//  */
// export const useGetUserUrls = (page: number = 1, limit: number = 10) => {
//     return useQuery(getUserUrlsOptions(page, limit));
// };

// /**
//  * Hook to fetch URL info
//  */
// export const useGetUrlInfo = (shortCode: string) => {
//     return useQuery(getUrlInfoOptions(shortCode));
// };

// /**
//  * Hook to fetch URL analytics
//  */
// export const useGetUrlAnalytics = (shortCode: string) => {
//     return useQuery(getUrlAnalyticsOptions(shortCode));
// };

// /**
//  * Hook to create a short URL
//  */
// export const useCreateShortUrl = () => {
//     return useMutation({
//         mutationFn: ({ body }: { body: CreateShortUrlRequestBody }) => {
//             return createShortUrl(body);
//         },
//     });
// };

// /**
//  * Hook to update a short URL
//  */
// export const useUpdateShortUrl = () => {
//     return useMutation({
//         mutationFn: ({
//             shortCode,
//             body,
//         }: {
//             shortCode: string;
//             body: UpdateShortUrlRequestBody;
//         }) => {
//             return updateShortUrl(shortCode, body);
//         },
//     });
// };

// /**
//  * Hook to delete a short URL
//  */
// export const useDeleteShortUrl = () => {
//     return useMutation({
//         mutationFn: ({ shortCode }: { shortCode: string }) => {
//             return deleteShortUrl(shortCode);
//         },
//     });
// };
