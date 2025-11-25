'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  CheckCircle2,
  Link as LinkIcon,
  Heart,
  Calendar,
} from 'lucide-react';
import { toast } from 'sonner';
import { urlMutationOptions } from '@/api-config/queryOptions/urlQueries';
import { useMutation } from '@tanstack/react-query';
import { addDaysToCurrentDate } from '@/lib/utils';
import { AxiosError } from 'axios';
import { SuccessDialog } from './components/ShortUrlDialog';

export default function Dashboard() {
  const [longUrl, setLongUrl] = useState('');
  const [useCustomAlias, setUseCustomAlias] = useState(false);
  const [customAlias, setCustomAlias] = useState('');
  const [setExpiration, setSetExpiration] = useState(false);
  const [expirationDays, setExpirationDays] = useState('1');
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [shortUrl, setShortUrl] = useState('');


  const { mutate: createShortUrlMutate, isPending: isCreatingShortUrl } = useMutation({
    mutationFn: urlMutationOptions.createShortUrl.mutationFunction,
    onSuccess: (data) => {
      toast.success(`Short URL created: ${data.data.shortCode}`);
      setShortUrl(`${process.env.NEXT_PUBLIC_APP_URL}/${data.data.shortCode}`);
      setSuccessDialogOpen(true);

    },
    onError: (error: AxiosError<{ error: string }>) => {
      toast.error(`Failed to create short URL: ${error.response?.data?.error || error.message}`);
    }
  });

  const handleReset = () => {
    setLongUrl('');
    setCustomAlias('');
    setExpirationDays('1');
    setUseCustomAlias(false);
    setSetExpiration(false);
  };

  const handleShortenUrl = async () => {
    if (!longUrl.trim()) {
      toast.error('Please enter a URL');
      return;
    }

    createShortUrlMutate({
      body: {
        originalUrl: longUrl,
        customAlias: useCustomAlias ? customAlias.trim() : undefined,
        expiresAt: setExpiration ? addDaysToCurrentDate(parseInt(expirationDays, 10)) : undefined,
      }
    })

    handleReset();

  };

  return (
    <div className="min-h-screen  max-sm:p-2">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white">URL Dashboard</h1>
          <p className="text-slate-400 mt-2">Manage and monitor your shortened URLs</p>
        </div>

        {/* Shorten URL Card */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 backdrop-blur-sm">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <LinkIcon className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Shorten URL</h2>
                <p className="text-slate-400 text-sm">Create a short link for your long URL</p>
              </div>
            </div>

            {/* Long URL Input */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-white">
                Long URL <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <Input
                  placeholder="asdfasdfasdf"
                  value={longUrl}
                  onChange={(e) => setLongUrl(e.target.value)}
                  className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus-visible:border-blue-500 focus-visible:ring-blue-500/30"
                />
              </div>
            </div>

            {/* Custom Alias Section */}
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={useCustomAlias}
                    onChange={(e) => setUseCustomAlias(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded border-2 transition-all ${useCustomAlias
                      ? 'bg-blue-500 border-blue-500'
                      : 'border-slate-600 bg-slate-700/50'
                      }`}
                  />
                  {useCustomAlias && (
                    <CheckCircle2 className="absolute inset-0 w-5 h-5 text-white pointer-events-none" />
                  )}
                </div>
                <Heart className="w-5 h-5 text-purple-400" />
                <span className="text-white font-medium">Use custom alias</span>
                <span className="text-slate-500 text-sm ml-auto">(optional)</span>
              </label>

              {useCustomAlias && (
                <div className="ml-8 space-y-2">
                  <label className="block text-sm font-medium text-white">
                    Custom Alias
                  </label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <Input
                      placeholder="my-custom-alias"
                      value={customAlias}
                      onChange={(e) => setCustomAlias(e.target.value)}
                      className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus-visible:border-blue-500 focus-visible:ring-blue-500/30"
                    />
                  </div>
                  <div className="mt-3 p-3 bg-slate-700/30 rounded border border-slate-600 space-y-2">
                    <p className="text-slate-300 text-sm font-medium">
                      Tips for choosing an alias:
                    </p>
                    <ul className="text-slate-400 text-xs space-y-1">
                      <li>• Use 3-30 characters</li>
                      <li>• Only letters, numbers, hyphens, and underscores</li>
                      <li>• Make it memorable and relevant to your content</li>
                      <li>
                        • Avoid reserved words like &quot;api&quot;, &quot;admin&quot;, &quot;www&quot;
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Expiration Date Section */}
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={setExpiration}
                    onChange={(e) => setSetExpiration(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded border-2 transition-all ${setExpiration
                      ? 'bg-green-500 border-green-500'
                      : 'border-slate-600 bg-slate-700/50'
                      }`}
                  />
                  {setExpiration && (
                    <CheckCircle2 className="absolute inset-0 w-5 h-5 text-white pointer-events-none" />
                  )}
                </div>
                <Calendar className="w-5 h-5 text-green-400" />
                <span className="text-white font-medium">Set expiration date</span>
                <span className="text-slate-500 text-sm ml-auto">(optional)</span>
              </label>

              {setExpiration && (
                <div className="ml-8 space-y-2">
                  <label className="block text-sm font-medium text-white">
                    Expires in (days)
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <Input
                      type="number"
                      min="1"
                      max="3650"
                      placeholder="1"
                      value={expirationDays}
                      onChange={(e) => setExpirationDays(e.target.value)}
                      className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus-visible:border-green-500 focus-visible:ring-green-500/30"
                    />
                  </div>
                  <p className="text-slate-400 text-sm">
                    Link will expire after specified days (1-3650)
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-end pt-6 border-t border-slate-700">
              <Button
                onClick={handleReset}
                variant="outline"
                className="bg-slate-700/50 border-slate-600 text-white hover:bg-slate-700 hover:text-white"
              >
                Reset
              </Button>
              <Button
                onClick={handleShortenUrl}
                disabled={isCreatingShortUrl}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6"
              >
                {isCreatingShortUrl ? 'Shortening...' : 'Shorten URL'}
              </Button>
            </div>
          </div>
        </div>
        <SuccessDialog
          open={successDialogOpen}
          onOpenChange={setSuccessDialogOpen}
          shortUrl={shortUrl}
        />


      </div>
    </div>
  );
}