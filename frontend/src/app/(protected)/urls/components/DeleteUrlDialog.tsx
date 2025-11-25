"use client";

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteShortUrl } from "@/api-config/endpoints/shortUrlApi";
import { ShortUrlInfo } from "@/api-config/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, AlertTriangle } from "lucide-react";

interface DeleteUrlDialogProps {
  url: ShortUrlInfo;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteUrlDialog({
  url,
  open,
  onOpenChange,
}: DeleteUrlDialogProps) {
  const [error, setError] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async () => {
      return deleteShortUrl(url.shortCode);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["urls", "list"],
      });
      onOpenChange(false);
      setError(null);
    },
    onError: (error: unknown) => {
      const axiosError = error as { response?: { data?: { error?: string } } };
      setError(
        axiosError?.response?.data?.error || "Failed to delete URL. Please try again."
      );
    },
  });

  const handleDelete = () => {
    setError(null);
    deleteMutation.mutate();
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      setError(null);
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md bg-slate-900 border border-slate-700">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10">
              <AlertTriangle className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <DialogTitle className="text-white">Delete URL</DialogTitle>
              <DialogDescription className="text-slate-400">
                This action cannot be undone
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* Warning Message */}
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-sm text-slate-300">
              You are about to delete the short URL:{" "}
              <span className="font-mono font-semibold text-red-400">
                {url.customAlias || url.shortCode}
              </span>
            </p>
            <p className="text-xs text-slate-400 mt-2">
              Any existing links using this short URL will stop working.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-md">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}
        </div>

        {/* Buttons */}
        <DialogFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={deleteMutation.isPending}
            className="border-slate-600 text-slate-300 hover:bg-slate-800"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="gap-2 bg-red-600 hover:bg-red-700"
          >
            {deleteMutation.isPending && (
              <Loader2 size={16} className="animate-spin" />
            )}
            {deleteMutation.isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
