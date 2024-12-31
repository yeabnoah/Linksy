"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { queryClient } from "@/util/query-client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import {
  DockIcon,
  InstagramIcon,
  TelescopeIcon,
  TwitterIcon,
  YoutubeIcon,
  Loader2,
  PodcastIcon,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import useSingleFoldersStore from "@/state/singleFolderStore";

interface AddContentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const contentTypes = [
  {
    value: "twitter",
    label: "Tweet",
    icon: <TwitterIcon className="w-4 h-4" />,
  },
  {
    value: "youtube",
    label: "YouTube",
    icon: <YoutubeIcon className="w-4 h-4" />,
  },
  {
    value: "instagram",
    label: "Instagram",
    icon: <InstagramIcon className="w-4 h-4" />,
  },
  {
    value: "telegram",
    label: "Telegram",
    icon: <TelescopeIcon className="w-4 h-4" />,
  },
  {
    value: "article",
    label: "Article",
    icon: <DockIcon className="w-4 h-4" />,
  },
  {
    value: "reddit",
    label: "Reddit",
    icon: <PodcastIcon className="w-4 h-4" />,
  },
];

export function AddContentFolderModal({
  isOpen,
  onClose,
}: AddContentModalProps) {
  const [contentType, setContentType] = useState<string>("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [link, setLink] = useState("");
  const [tagsInput, setTagsInput] = useState("");

  const { singleFolder } = useSingleFoldersStore();

  const mutation = useMutation({
    mutationFn: async () => {
      const tags = tagsInput.split(",").map((tag) => tag.trim());
      const response = await axios.post(
        "/api/v1/content",
        {
          title,
          link,
          type: contentType,
          tags,
          description: content,
          folderId: singleFolder.id,
        },
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
    onMutate: () => {
      toast.loading("Adding content...");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Content added successfully!");
      queryClient.invalidateQueries();
      resetForm();
      onClose();
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(
        error instanceof Error
          ? error.message
          : "An error occurred while adding content."
      );
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  const resetForm = () => {
    setContentType("");
    setTitle("");
    setContent("");
    setLink("");
    setTagsInput("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="md:max-w-xl max-w-[95%] rounded-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold tracking-tight">
            Add Content
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={contentType}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <Label htmlFor="type" className="text-sm font-medium">
                  Content Type
                </Label>
                <Select value={contentType} onValueChange={setContentType}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select content type" />
                  </SelectTrigger>
                  <SelectContent>
                    {contentTypes.map((type) => (
                      <SelectItem
                        key={type.value}
                        value={type.value}
                        className="font-medium"
                      >
                        <div className="flex items-center gap-2">
                          {type.icon}
                          {type.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {contentType && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-sm font-medium">
                      Title
                    </Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter title"
                      className="w-full"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content" className="text-sm font-medium">
                      Content
                    </Label>
                    <Textarea
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Enter content"
                      className="min-h-[100px] resize-none"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="link" className="text-sm font-medium">
                      Link
                    </Label>
                    <Input
                      id="link"
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                      placeholder="https://"
                      type="url"
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tags" className="text-sm font-medium">
                      Tags
                    </Label>
                    <Input
                      id="tags"
                      value={tagsInput}
                      onChange={(e) => setTagsInput(e.target.value)}
                      placeholder="Enter tags separated by commas"
                      className="w-full"
                    />
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 transition-colors"
            disabled={mutation.isPending || !contentType}
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              "Add Content"
            )}
          </Button>
        </form>
      </DialogContent>
      <Toaster />
    </Dialog>
  );
}
