"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { queryClient } from "@/util/query-client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, FolderPlus } from "lucide-react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface AddContentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddFolderModal({ isOpen, onClose }: AddContentModalProps) {
  const [name, setName] = useState("");

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        "/api/v1/folder",
        {
          name: name,
        },
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
    onMutate: () => {
      toast.loading("📁 Creating Folder...");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("🎉 Folder Created successfully!");
      queryClient.invalidateQueries();
      resetForm();
      onClose();
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(
        error instanceof Error
          ? `❌ ${error.message}`
          : "❌ An error occurred while creating folder."
      );
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  const resetForm = () => {
    setName("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="md:max-w-md max-w-[95%] rounded-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold tracking-tight">
            📁 Add Folder
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <Label htmlFor="type" className="text-sm font-medium">
                  📝 Folder Name
                </Label>

                <Input
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  placeholder="Enter folder name..."
                />
              </div>
            </motion.div>
          </AnimatePresence>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 transition-colors"
            disabled={mutation.isPending || !name.trim()}
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              <>
                <FolderPlus className="mr-2 h-4 w-4" />
                Add Folder
              </>
            )}
          </Button>
        </form>
      </DialogContent>
      <Toaster />
    </Dialog>
  );
}
