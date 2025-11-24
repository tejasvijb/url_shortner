"use client"

import React, { useState } from "react"
import { CheckCircle2, Copy } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface SuccessDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  shortUrl: string
}

export function SuccessDialog({
  open,
  onOpenChange,
  shortUrl
}: SuccessDialogProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (shortUrl) {
      try {
        await navigator.clipboard.writeText(shortUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error("Failed to copy:", err)
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex flex-col items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
              <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="text-center">
              <DialogTitle className="text-xl font-semibold">
                Sucess! Your link is ready
              </DialogTitle>
              <DialogDescription className="mt-2">
                Copy link to share
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-6 space-y-4">
          {/* Short URL Display */}
          <div className="flex items-center gap-2 rounded-lg bg-slate-900 p-4 dark:bg-slate-800">
            <input
              type="text"
              value={shortUrl}
              readOnly
              className="flex-1 bg-transparent text-blue-400 outline-none"
            />
            <Button
              onClick={handleCopy}
              size="sm"
              variant="ghost"
              className="hover:bg-slate-700"
            >
              <Copy className="h-4 w-4 text-blue-400" />
            </Button>
          </div>

          {/* Copy Feedback */}
          {copied && (
            <p className="text-center text-sm text-green-600 dark:text-green-400">
              Copied to clipboard!
            </p>
          )}

          {/* Close Button */}
          <Button
            onClick={() => onOpenChange(false)}
            className="w-full"
          >
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
