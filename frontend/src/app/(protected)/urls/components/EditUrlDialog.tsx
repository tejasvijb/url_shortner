"use client";

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateShortUrl } from "@/api-config/endpoints/shortUrlApi";
import { ShortUrlInfo, UpdateShortUrlRequestBody } from "@/api-config/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Loader2, ChevronDownIcon } from "lucide-react";

interface EditUrlDialogProps {
  url: ShortUrlInfo;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditUrlDialog({
  url,
  open,
  onOpenChange,
}: EditUrlDialogProps) {
  const [customAlias, setCustomAlias] = useState(url.customAlias || "");
  const [description, setDescription] = useState(url.description || "");
  const [expiresAt, setExpiresAt] = useState<Date | undefined>(
    url.expiresAt ? new Date(url.expiresAt) : undefined
  );
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: async (data: UpdateShortUrlRequestBody) => {
      return updateShortUrl(url.shortCode, data);
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
        axiosError?.response?.data?.error || "Failed to update URL. Please try again."
      );
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Prepare update data
    const updateData: UpdateShortUrlRequestBody = {};

    if (customAlias !== url.customAlias) {
      updateData.customAlias = customAlias;
    }

    if (description !== url.description) {
      updateData.description = description;
    }

    if (
      expiresAt &&
      (!url.expiresAt ||
        expiresAt.getTime() !== new Date(url.expiresAt).getTime())
    ) {
      updateData.expiresAt = expiresAt.toISOString();
    }

    // Check if any changes were made
    if (Object.keys(updateData).length === 0) {
      setError("No changes made");
      return;
    }

    updateMutation.mutate(updateData);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      // Reset form when opening
      setCustomAlias(url.customAlias || "");
      setDescription(url.description || "");
      setExpiresAt(url.expiresAt ? new Date(url.expiresAt) : undefined);
      setError(null);
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md bg-slate-900 border border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-white">Edit URL</DialogTitle>
          <DialogDescription className="text-slate-400">
            Update the custom alias, description, or expiration date of your
            short URL.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Custom Alias */}
          <div className="space-y-2">
            <Label htmlFor="alias" className="text-slate-300">Custom Alias (Optional)</Label>
            <Input
              id="alias"
              placeholder="Enter custom alias"
              value={customAlias}
              onChange={(e) => setCustomAlias(e.target.value)}
              className="bg-slate-800 border-slate-600 text-slate-300 placeholder:text-slate-500"
              disabled={updateMutation.isPending}
            />
            <p className="text-xs text-slate-400">
              3-30 characters: letters, numbers, hyphens, underscores
            </p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-slate-300">Description (Optional)</Label>
            <Input
              id="description"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-slate-800 border-slate-600 text-slate-300 placeholder:text-slate-500"
              disabled={updateMutation.isPending}
            />
          </div>

          {/* Expiration Date */}
          <div className="space-y-2">
            <Label className="text-slate-300">Expiration Date (Optional)</Label>
            <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between font-normal bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700"
                  disabled={updateMutation.isPending}
                >
                  {expiresAt ? expiresAt.toLocaleDateString() : "Select date"}
                  <ChevronDownIcon size={16} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                <Calendar
                  mode="single"
                  selected={expiresAt}
                  onSelect={(date) => {
                    setExpiresAt(date);
                    setDatePickerOpen(false);
                  }}
                  disabled={(date) => date < new Date()}
                  captionLayout="dropdown"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-md">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {/* Buttons */}
          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={updateMutation.isPending}
              className="border-slate-600 text-slate-300 hover:bg-slate-800"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={updateMutation.isPending}
              className="gap-2 bg-blue-600 hover:bg-blue-700"
            >
              {updateMutation.isPending && (
                <Loader2 size={16} className="animate-spin" />
              )}
              {updateMutation.isPending ? "Updating..." : "Update"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
