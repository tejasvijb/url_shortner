"use client";

import { useQuery } from "@tanstack/react-query";
import { urlQueries } from "@/api-config/queryOptions/urlQueries";
import { ShortUrlInfo } from "@/api-config/types";
import { UrlCard } from "./components/UrlCard";

export default function UrlsPage() {
  const { data: userUrlsResponse, isLoading: isLoadingUrls } = useQuery(
    urlQueries.getUserUrlsOptions()
  );

  const urls = userUrlsResponse?.data?.data || [];

  if (isLoadingUrls) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-2 text-muted-foreground">Loading URLs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-sm:p-2">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white">My URLs</h1>
          <p className="text-slate-400 mt-2">
            Manage and track your shortened URLs
          </p>
        </div>

        {/* URLs List */}
        <div>
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
