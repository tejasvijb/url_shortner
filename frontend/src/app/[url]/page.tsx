

'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { isApiError } from '@/api-config/api';
import { urlQueries } from '@/api-config/queryOptions/urlQueries';
import { useRouter } from 'next/navigation';

export default function UrlRedirectPage() {
  const router = useRouter();
  const params = useParams();
  const url = params.url as string;

  // Fetch the URL info and track the redirect
  const { isLoading, error, status, isSuccess, data } = useQuery(
    urlQueries.redirectShortUrlOptions(url)
  );

  useEffect(() => {
    if (isSuccess && data?.data?.originalUrl) {
      // Redirect to the original URL using window.location.href
      router.push(data.data.originalUrl);
    }
  }, [isSuccess, data, router]);

  useEffect(() => {
    if (error && isApiError(error)) {
      const statusCode = error.response?.status;


      // Handle 404 - short URL not found
      if (statusCode === 404) {
        router.push('/404');
        return
      }

      // Handle 410 - short URL expired
      if (statusCode === 410) {
        router.push('/404');
        return
      }

      // Handle other errors
      console.error('Error redirecting URL:', error);
      router.push('/error');
    }
  }, [error, router]);

  // Show loading state
  if (isLoading || status === 'pending') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-slate-600">Redirecting...</p>
        </div>
      </div>
    );
  }

  // Should not reach here if redirect worked
  return null;
}