"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AnimatePresence, motion } from "framer-motion";
import {
  ExternalLinkIcon,
  InstagramIcon,
  MessageSquareIcon,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react";
import { useState } from "react";
import { InstagramEmbed, XEmbed, YouTubeEmbed } from "react-social-media-embed";
import TelegramPost from "./telegramEmbed";

interface NoteCardProps {
  id: number;
  title: string;
  tags: string[];
  type: string;
  description: string;
  link: string;
}

const typeIcons = {
  twitter: TwitterIcon,
  youtube: YoutubeIcon,
  telegram: MessageSquareIcon,
  instagram: InstagramIcon,
};

export function NoteCardTrash({
  title,
  link,
  tags,
  type,
  description,
}: NoteCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const TypeIcon = typeIcons[type as keyof typeof typeIcons];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="md:hoverable"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="overflow-hidden h-fit w-full max-w-sm shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl">
        <CardHeader className="flex items-center flex-row justify-between space-y-0 pb-2 bg-primary/5">
          <div className="flex items-center gap-3">
            {TypeIcon && <TypeIcon className="text-primary w-5 h-5" />}
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              {title}
            </h2>
          </div>
        </CardHeader>
        <CardContent className="p-5 space-y-4">
          <motion.div
            className={`flex justify-center border rounded-md bg-background overflow-hidden ${
              isHovered ? "md:h-[12rem]" : "h-[8rem]"
            }`}
            animate={{ height: isHovered ? "12rem" : "8rem" }}
            transition={{ duration: 0.3 }}
          >
            {type === "twitter" && (
              <XEmbed url={link} className="w-full rounded-md" />
            )}
            {type === "youtube" && (
              <YouTubeEmbed url={link} className="w-full rounded-md" />
            )}
            {type === "instagram" && (
              <InstagramEmbed url={link} className="w-full rounded-md" />
            )}
            {type === "telegram" && (
              <TelegramPost type="telegram" link={link} />
            )}
          </motion.div>
          <AnimatePresence>
            {(isHovered || !isHovered) && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="text-sm leading-relaxed text-muted-foreground"
              >
                {description}
              </motion.p>
            )}
          </AnimatePresence>
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center text-xs font-medium text-primary bg-primary/10 px-2.5 py-0.5 rounded-full transition-colors duration-200 hover:bg-primary/20"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors duration-200"
                  >
                    <ExternalLinkIcon className="w-5 h-5" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Open original link</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
