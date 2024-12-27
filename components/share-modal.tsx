"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Copy } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemCount: number;
}

interface dataComing {
  data: {
    id: number;
    hash: string;
    userId: string;
  };
  allowed: boolean;
}

export function ShareModal({ isOpen, onClose, itemCount }: ShareModalProps) {
  const [isSharing, setIsSharing] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const [shareHash, setShareHash] = useState<string | null>(null);
  const [allowed] = useState<boolean>(true);

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["hash"],
    queryFn: async () => {
      const response = await axios.get("/api/v1/brain/share", {
        withCredentials: true,
      });
      console.log("------- ", response.data);
      return response.data as dataComing;
    },
    enabled: isOpen,
  });

  useEffect(() => {
    if (isSuccess && data?.allowed && data?.data.hash) {
      setShareHash(data.data.hash);
    }
  }, [isSuccess, data]);

  const handleStopSharing = () => {
    setIsSharing(false);
  };

  const handleCopyLink = async () => {
    if (shareHash) {
      const fullLink = `${window.location.origin}/api/v1/brain/share/${shareHash}`;
      await navigator.clipboard.writeText(fullLink);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 gap-0 animate-in">
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-start gap-4">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold tracking-tight">
                Share Your Bookmark list
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Share your entire collection of notes, documents, tweets, and
                videos with others. They&apos;ll be able to see all your
                bookmarks
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {isSharing && (
            <div className="rounded-lg bg-muted/50 px-3 py-2 text-sm text-muted-foreground">
              Some contents are being shared.
            </div>
          )}

          {!allowed && !isLoading && (
            <div className="rounded-lg bg-red-500 text-white px-3 py-2 text-sm">
              Sharing is not allowed.
            </div>
          )}

          <div className="flex gap-3">
            {data?.allowed ? (
              <Button
                variant="destructive"
                className="flex-1 font-medium"
                onClick={handleStopSharing}
              >
                Stop Sharing
              </Button>
            ) : (
              <Button
                className="flex-1 font-medium bg-green-400"
                onClick={handleStopSharing}
              >
                Start Sharing
              </Button>
            )}

            <Button
              variant="secondary"
              className="flex-1 font-medium"
              onClick={handleCopyLink}
              disabled={!allowed || isLoading || !shareHash}
            >
              <Copy className="w-4 h-4 mr-2" />
              {isCopied ? "Copied!" : "Copy Link"}
            </Button>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            {itemCount} {itemCount === 1 ? "item" : "items"} will be shared.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
