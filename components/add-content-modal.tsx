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
import useFoldersStore from "@/state/folderContent";
import { queryClient } from "@/util/query-client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { InstagramIcon, Loader2, TwitterIcon, YoutubeIcon } from "lucide-react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  FaDiscord,
  FaGlobe,
  FaPinterest,
  FaReddit,
  FaTelegram,
  FaLinkedin,
} from "react-icons/fa6";

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
    icon: <FaTelegram className="w-4 h-4" />,
  },
  {
    value: "reddit",
    label: "Reddit",
    icon: <FaReddit className="w-4 h-4" />,
  },
  {
    value: "discord",
    label: "Discord",
    icon: <FaDiscord className="w-4 h-4" />,
  },
  {
    value: "pinterest",
    label: "Pinterest",
    icon: <FaPinterest className="w-4 h-4" />,
  },
  {
    value: "linkedin",
    label: "LinkedIn",
    icon: <FaLinkedin className="w-4 h-4" />,
  },
  {
    value: "website",
    label: "Website",
    icon: <FaGlobe className="w-4 h-4" />,
  },
];

export function AddContentModal({ isOpen, onClose }: AddContentModalProps) {
  const [contentType, setContentType] = useState<string>("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [link, setLink] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [selectedFolder, setSelectedFolder] = useState<number | null>(null);

  const { folders } = useFoldersStore();

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
          folderId: selectedFolder,
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
    setSelectedFolder(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95%] sm:max-w-[80%] rounded-md md:max-w-[60%] lg:max-w-[50%] xl:max-w-[40%] h-[90vh] sm:h-auto overflow-hidden flex flex-col">
        <DialogHeader className="px-6 py-4 sm:px-8 sm:py-6">
          <DialogTitle className="text-xl sm:text-2xl font-bold tracking-tight">
            Add Content
          </DialogTitle>
        </DialogHeader>
        <div className="flex-grow overflow-y-auto px-6 pb-6 sm:px-8">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={contentType}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-4 sm:space-y-6"
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
                      <Label htmlFor="folder" className="text-sm font-medium">
                        Folder
                      </Label>
                      <Select
                        value={selectedFolder?.toString() || ""}
                        onValueChange={(value) =>
                          setSelectedFolder(Number(value))
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select folder" />
                        </SelectTrigger>
                        <SelectContent>
                          {folders.map((folder) => (
                            <SelectItem
                              key={folder.id}
                              value={folder.id.toString()}
                              className="font-medium"
                            >
                              {folder.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                        className="w-full placeholder:text-sm"
                      />
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 transition-colors"
              disabled={mutation.isPending || !contentType || !selectedFolder}
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
        </div>
      </DialogContent>
      <Toaster />
    </Dialog>
  );
}
