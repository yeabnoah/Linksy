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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import {
  DockIcon,
  InstagramIcon,
  TelescopeIcon,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

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
    label: "Youtube",
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
];

export function AddContentModal({ isOpen, onClose }: AddContentModalProps) {
  const [contentType, setContentType] = useState<string>("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [link, setLink] = useState("");
  const [tagsInput, setTagsInput] = useState("");

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
      // toast("Content added successfully!");
      toast.success("Content added successfully!");
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-none">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold tracking-tight">
            Add Content
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2.5">
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

          <div className="space-y-2.5">
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

          <div className="space-y-2.5">
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

          <div className="space-y-2.5">
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

          <div className="space-y-2.5">
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

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 transition-colors"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Adding..." : "Add Content"}
          </Button>
        </form>
      </DialogContent>
      <Toaster />
    </Dialog>
  );
}
