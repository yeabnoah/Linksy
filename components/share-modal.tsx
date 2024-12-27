"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Copy } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import dataComing from "@/interface/dataIncoming";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemCount: number;
}

export function ShareModal({ isOpen, onClose, itemCount }: ShareModalProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [shareHash, setShareHash] = useState<string | null>(null);
  const [allowed, setAllowed] = useState<boolean>(false);
  const [link, setLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchShareData = async () => {
      if (isOpen) {
        setIsLoading(true);
        try {
          const response = await axios.get("/api/v1/brain/share", {
            withCredentials: true,
          });
          const data = response.data as dataComing;
          if (data.data.hash) {
            setShareHash(data.data.hash);
            setAllowed(data.data.allowed);
            setLink(
              `${window.location.origin}/api/v1/brain/share/${data.data.hash}`
            );
          }
        } catch (error) {
          toast.error("Failed to fetch sharing data.");
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchShareData();
  }, [isOpen]);

  const handleStopSharing = async () => {
    try {
      await axios.post(
        "/api/v1/brain/share",
        { shareApproved: false },
        { withCredentials: true }
      );
      toast.success("Sharing disabled successfully");
      setAllowed(false);
      setShareHash(null);
      setLink("");
    } catch (error) {
      toast.error("An error occurred while disabling sharing.");
    }
  };

  const handleStartSharing = async () => {
    try {
      const response = await axios.post(
        "/api/v1/brain/share",
        { shareApproved: true },
        { withCredentials: true }
      );
      const data = response.data as dataComing;
      if (data.data.hash) {
        toast.success("Sharing enabled successfully");
        setShareHash(data.data.hash);
        setLink(
          `${window.location.origin}/api/v1/brain/share/${data.data.hash}`
        );
        setAllowed(true);
      } else {
        toast.error("Sharing enabled, but no hash received.");
      }
    } catch (error) {
      toast.error("An error occurred while enabling sharing.");
    }
  };

  const handleCopyLink = async () => {
    if (shareHash) {
      await navigator.clipboard.writeText(link);
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
                Share Your Bookmark List
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Share your entire collection of notes, documents, tweets, and
                videos with others. They&apos;ll be able to see all your
                bookmarks.
              </p>
            </div>
          </div>

          {allowed && shareHash && (
            <div className="rounded-lg bg-muted/50 px-3 py-2 text-sm text-muted-foreground">
              {link}
            </div>
          )}

          {!allowed && !isLoading && (
            <div className="rounded-lg bg-red-500 text-white px-3 py-2 text-sm">
              Sharing is not allowed.
            </div>
          )}

          <div className="flex gap-3">
            {allowed ? (
              <div className="flex items-center w-full gap-5 justify-between">
                <Button
                  variant="destructive"
                  className="flex-1 font-medium"
                  onClick={handleStopSharing}
                >
                  Stop Sharing
                </Button>
                <Button
                  variant="secondary"
                  className="flex-1 font-medium"
                  onClick={handleCopyLink}
                  disabled={!shareHash}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  {isCopied ? "Copied!" : "Copy Link"}
                </Button>
              </div>
            ) : (
              <Button
                className="flex-1 font-medium bg-green-400 hover:bg-green-500"
                onClick={handleStartSharing}
              >
                Start Sharing
              </Button>
            )}
          </div>

          <div className="text-center text-sm text-muted-foreground">
            {itemCount} {itemCount === 1 ? "item" : "items"} will be shared.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
