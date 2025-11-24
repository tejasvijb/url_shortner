'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error page:', error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
      <div className="text-center space-y-6 px-4">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-slate-900">Oops!</h1>
          <h2 className="text-2xl font-semibold text-slate-700">Something Went Wrong</h2>
        </div>

        <p className="text-slate-600 max-w-md mx-auto">
          There was an error trying to redirect. This might be a temporary issue. Please try again.
        </p>

        <div className="space-y-3 pt-4">
          <button
            onClick={() => reset()}
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
          <p className="text-sm text-slate-500">
            <Link href="/" className="text-blue-600 hover:underline">
              Go to Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
