"use client";

import { useQuery } from "@tanstack/react-query";
import { urlQueries } from "@/api-config/queryOptions/urlQueries";
import { ShortUrlInfo } from "@/api-config/types";
import { formatDate } from "@/lib/utils";

export default function Analytics() {
  const { data: globalAnalyticsResponse, isLoading: isLoadingGlobal } = useQuery(
    urlQueries.getGlobalUrlAnalyticsOptions()
  );

  const { data: userUrlsResponse, isLoading: isLoadingUrls } = useQuery(
    urlQueries.getUserUrlsOptions()
  );

  const isLoading = isLoadingGlobal || isLoadingUrls;

  // Extract data from axios response
  const globalAnalytics = globalAnalyticsResponse?.data || { totalUrls: 0, totalClicks: 0 };
  const urls = userUrlsResponse?.data?.data || [];



  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-2 text-muted-foreground">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-sm:p-2">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white">Analytics</h1>
          <p className="text-slate-400 mt-2">
            Track your shortened URLs performance
          </p>
        </div>

        {/* Global Analytics Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Total URLs Card */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">
                  Total URLs
                </p>
                <p className="text-4xl font-bold text-white mt-2">
                  {globalAnalytics.totalUrls}
                </p>
              </div>
              <div className="text-6xl opacity-20">📝</div>
            </div>
          </div>

          {/* Total Clicks Card */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">
                  Total Clicks
                </p>
                <p className="text-4xl font-bold text-white mt-2">
                  {globalAnalytics.totalClicks}
                </p>
              </div>
              <div className="text-6xl opacity-20">👆</div>
            </div>
          </div>
        </div>

        {/* URLs List */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Your URLs</h2>

          {urls.length === 0 ? (
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-12 text-center backdrop-blur-sm">
              <p className="text-slate-400 text-lg">
                No URLs yet. Create one to get started!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {urls.map((url: ShortUrlInfo) => (
                <UrlCard key={url.id} url={url} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface UrlCardProps {
  url: ShortUrlInfo;
}

function UrlCard({ url }: UrlCardProps) {
  const isExpired = url.expiresAt && new Date(url.expiresAt) < new Date();

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow backdrop-blur-sm">
      {/* Status Badge */}
      <div className="px-6 pt-4 pb-0 flex items-start justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${url.isActive
              ? "bg-green-500/20 text-green-300 border border-green-500/30"
              : "bg-red-500/20 text-red-300 border border-red-500/30"
              }`}
          >
            {url.isActive ? "Active" : "Inactive"}
          </span>
          {isExpired && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
              Expired
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="px-6 py-4">
        {/* Original URL */}
        <div className="mb-4">
          <p className="text-xs text-slate-500 font-medium mb-1">
            Original URL
          </p>
          <a
            href={url.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-mono truncate text-blue-400 hover:text-blue-300 break-all"
          >
            {url.originalUrl}
          </a>
        </div>

        {/* Short URL */}
        <div className="mb-4">
          <p className="text-xs text-slate-500 font-medium mb-1">
            Short URL
          </p>
          <a
            href={`${process.env.NEXT_PUBLIC_APP_URL}/${url.customAlias || url.shortCode}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-mono font-semibold text-blue-400 hover:text-blue-300 break-all"
          >
            {`${process.env.NEXT_PUBLIC_APP_URL}/${url.customAlias || url.shortCode}`}
          </a>
        </div>

        {/* Click Count */}
        <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-md">
          <p className="text-xs text-slate-500 font-medium mb-1">
            Clicks
          </p>
          <p className="text-2xl font-bold text-blue-400">{url.clickCount}</p>
        </div>

        {/* Dates */}
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-500">Created:</span>
            <span className="font-medium text-slate-300">
              {formatDate(new Date(url.createdAt))}
            </span>
          </div>
          {url.expiresAt && (
            <div className="flex justify-between">
              <span className="text-slate-500">Expires:</span>
              <span className={`font-medium ${isExpired ? "text-red-400" : "text-slate-300"}`}>
                {formatDate(new Date(url.expiresAt))}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 