"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import dataComing from "@/interface/dataIncoming";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { Copy, Lock, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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
          const response = await axios.get("/api/v1/bookmark/share", {
            withCredentials: true,
          });
          const data = response.data as dataComing;
          if (data.data.hash) {
            setShareHash(data.data.hash);
            setAllowed(data.data.allowed);
            setLink(`${window.location.origin}/share/${data.data.hash}`);
          }
        } catch (error) {
          toast.error(`Failed to fetch sharing data. : ${error}`);
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
        "/api/v1/bookmark/share",
        { shareApproved: false },
        { withCredentials: true }
      );
      toast.success("Sharing disabled successfully");
      setAllowed(false);
      setShareHash(null);
      setLink("");
    } catch (error) {
      toast.error(`An error occurred while disabling sharing. : ${error}`);
    }
  };

  const handleStartSharing = async () => {
    try {
      const response = await axios.post(
        "/api/v1/bookmark/share",
        { shareApproved: true },
        { withCredentials: true }
      );
      const data = response.data as dataComing;
      if (data.data.hash) {
        toast.success("Sharing enabled successfully");
        setShareHash(data.data.hash);
        setLink(`${window.location.origin}/share/${data.data.hash}`);
        setAllowed(true);
      } else {
        toast.error("Sharing enabled, but no hash received.");
      }
    } catch (error) {
      toast.error(`An error occurred while enabling sharing.: ${error}`);
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
      <DialogContent className=" w-[90vw] mx-auto md:w-fit rounded-md sm:max-w-md md:max-w-xl p-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="p-4 sm:p-6 space-y-4 md:space-y-6"
        >
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div className="space-y-2 w-full sm:w-auto">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                Share Your Entire Collection
              </h2>
              <p className="text-sm  text-wrap text-muted-foreground leading-relaxed">
                Share your entire collection of notes, documents, tweets, and
                videos with others. They&apos;ll be able to see all your
                bookmarks.
              </p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {allowed && shareHash ? (
              <motion.div
                key="share-link"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="flex items-center space-x-2 w-[90vw]  rounded-lg bg-muted p-3 text-sm">
                  <Share2 className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                  <span className="text-xs text-wrap md:text-sm">{link}</span>
                </div>
                <div className="flex flex-col md:flex-row gap-3">
                  <Button
                    variant="destructive"
                    className="flex-1 font-medium "
                    onClick={handleStopSharing}
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Stop Sharing
                  </Button>
                  <Button
                    variant="secondary"
                    className="flex-1 font-medium"
                    onClick={handleCopyLink}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    {isCopied ? "Copied!" : "Copy Link"}
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="start-sharing"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {!isLoading && (
                  <Button
                    className="w-full font-medium bg-primary hover:bg-primary/90"
                    onClick={handleStartSharing}
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Start Sharing
                  </Button>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="text-center text-sm text-muted-foreground">
            {itemCount} {itemCount === 1 ? "item" : "items"} will be shared.
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
