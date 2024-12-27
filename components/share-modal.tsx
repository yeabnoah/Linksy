"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Copy } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "@/util/query-client";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemCount: number;
}

export function ShareModal({ isOpen, onClose, itemCount }: ShareModalProps) {
  const [isCopied, setIsCopied] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["hash"],
    queryFn: async () => {
      const response = await axios.get("/api/v1/brain/share", {
        withCredentials: true,
      });
      return response.data;
    },
  });

  const { mutate: toggleSharing } = useMutation({
    mutationFn: async (shareApproved: boolean) => {
      const response = await axios.post(
        "/api/v1/brain/share",
        { shareApproved },
        { withCredentials: true }
      );
      return response.data;
    },
    onSuccess: () => {
      // Refetch the data after successful mutation
      queryClient.invalidateQueries();
    },
  });

  const handleCopyLink = async () => {
    if (data?.data?.hash) {
      await navigator.clipboard.writeText(
        `https://secondbrain.app/share/${data.data.hash}`
      );
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 gap-0 animate-in">
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-start gap-4">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold tracking-tight">
                Share Your Second Brain
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Share your entire collection of notes, documents, tweets and
                videos with others. They&apos;ll be able to import your content
                into their own Second Brain.
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {data && data.allowed && (
            <div className="flex gap-3">
              <Button
                variant="destructive"
                className="flex-1 font-medium"
                onClick={() => toggleSharing(false)}
              >
                Stop Sharing
              </Button>
              <Button
                variant="secondary"
                className="flex-1 font-medium"
                onClick={handleCopyLink}
                disabled={!data?.data?.hash}
              >
                <Copy className="w-4 h-4 mr-2" />
                {isCopied ? "Copied!" : "Copy Link"}
              </Button>
            </div>
          )}

          {data && !data.allowed && (
            <Button
              // variant="primary"
              className="w-full font-medium"
              onClick={() => toggleSharing(true)}
            >
              Start Sharing
            </Button>
          )}

          <div className="text-center text-sm text-muted-foreground">
            {itemCount} {itemCount === 1 ? "item" : "items"} will be shared
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
