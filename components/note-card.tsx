import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  MessageSquareIcon,
  Share2,
  Trash2,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react";
import { XEmbed, YouTubeEmbed } from "react-social-media-embed";
import TelegramPost from "./telegramEmbed";

interface NoteCardProps {
  title: string;
  tags: string[];
  type: string;
  description: string;
  link: string;
}

export function NoteCard({
  title,
  link,
  tags,
  type,
  description,
}: NoteCardProps) {
  return (
    <Card className="  group overflow-hidden h-fit w-96 rounded-md shadow-sm transition-transform duration-200 hover:shadow-md hover:-translate-y-1">
      <div className="relative h-full w-full bg-slate-950"></div>
      {type === "twitter" && (
        <div className=" flex flex-row items-center p-3 gap-3  border-b text-black  border-b-black/10">
          <TwitterIcon className="text-black w-5 h-5" />
          <p>Twitter</p>
        </div>
      )}
      {type === "youtube" && (
        <div className=" flex flex-row items-center p-3 gap-3  border-b text-black  border-b-black/10">
          <YoutubeIcon className="text-black w-5 h-5" />
          <p>Youtube</p>
        </div>
      )}
      {type === "telegram" && (
        <div className=" flex flex-row items-center p-3 gap-3  border-b text-black  border-b-black/10">
          <MessageSquareIcon className="text-black w-5 h-5" />
          <p>Telegram</p>
        </div>
      )}
      <CardHeader
        className={`flex  shadow-none items-center flex-row justify-between space-y-0 pb-2 border-b`}
      >
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            {title}
          </h2>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-primary/10 hover:text-primary"
          >
            <Share2 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-5 space-y-4">
        <div className="flex justify-center border rounded-md bg-background">
          {type === "twitter" && (
            <XEmbed url={link} className="w-full h-32 rounded-md" />
          )}
          {type === "youtube" && (
            <YouTubeEmbed url={link} className="h-32 w-full rounded-md" />
          )}
          {type === "telegram" && <TelegramPost type="telegram" link={link} />}
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-primary underline hover:opacity-80"
        >
          {link}
        </a>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center text-xs font-medium text-primary bg-primary/10 px-2.5 py-0.5 rounded-md hover:bg-primary/20"
            >
              #{tag}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
