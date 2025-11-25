"use client";

import React, { useState } from "react";
import { Edit2, Trash2 } from "lucide-react";
import { ShortUrlInfo } from "@/api-config/types";
import { formatDate } from "@/lib/utils";
import { EditUrlDialog } from "./EditUrlDialog";
import { DeleteUrlDialog } from "./DeleteUrlDialog";


interface UrlCardProps {
  url: ShortUrlInfo;
}

export function UrlCard({ url }: UrlCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const isExpired = url.expiresAt && new Date(url.expiresAt) < new Date();

  return (
    <>
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow backdrop-blur-sm">
        {/* Top Bar with Status and Action Buttons */}
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

          {/* Action Icons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditOpen(true)}
              className="p-2 hover:bg-slate-700/50 rounded-md transition-colors text-slate-400 hover:text-blue-400"
              title="Edit URL"
            >
              <Edit2 size={18} />
            </button>
            <button
              onClick={() => setIsDeleteOpen(true)}
              className="p-2 hover:bg-slate-700/50 rounded-md transition-colors text-slate-400 hover:text-red-400"
              title="Delete URL"
            >
              <Trash2 size={18} />
            </button>
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
              href={`${process.env.NEXT_PUBLIC_APP_URL}/${url.customAlias || url.shortCode
                }`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-mono font-semibold text-blue-400 hover:text-blue-300 break-all"
            >
              {`${process.env.NEXT_PUBLIC_APP_URL}/${url.customAlias || url.shortCode
                }`}
            </a>
          </div>

          {/* Click Count */}
          <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-md">
            <p className="text-xs text-slate-500 font-medium mb-1">Clicks</p>
            <p className="text-2xl font-bold text-blue-400">{url.clickCount}</p>
          </div>

          {/* Description */}
          {url.description && (
            <div className="mb-4">
              <p className="text-xs text-slate-500 font-medium mb-1">
                Description
              </p>
              <p className="text-sm text-slate-300">{url.description}</p>
            </div>
          )}

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
                <span
                  className={`font-medium ${isExpired ? "text-red-400" : "text-slate-300"
                    }`}
                >
                  {formatDate(new Date(url.expiresAt))}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Dialog */}
      <EditUrlDialog
        url={url}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
      />

      {/* Delete Dialog */}
      <DeleteUrlDialog
        url={url}
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
      />
    </>
  );
}
