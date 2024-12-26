import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Share2, Trash2, TwitterIcon } from "lucide-react";
import { XEmbed, YouTubeEmbed } from "react-social-media-embed";
import TelegramEmbed from "./telegramEmbed";

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
    <Card className="group overflow-hidden h-fit w-96 transition-all duration-200 hover:shadow-lg rounded-sm shadow-none">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-3">
          <div className="text-primary/80">
            {type === "twitter" && <TwitterIcon size={16} />}
          </div>
          <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        </div>
        <div className="flex gap-1 group-hover:opacity-100 transition-opacity">
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
      <CardContent className=" h-fit">
        <div className="">
          <div className="">
            <div style={{ display: "flex", justifyContent: "center" }}>
              {type === "twitter" && (
                <div
                  className=" "
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <XEmbed url={link} className=" w-full" />
                </div>
              )}

              {type === "youtube" && (
                <div
                  className=" rounded-md"
                  style={{
                    display: "flex",
                    justifyContent: "center h-fit",
                    padding: 5,
                  }}
                >
                  <YouTubeEmbed
                    url="https://www.youtube.com/watch?v=HpVOs5imUN0"
                    className=" mx-auto rounded-md "
                    // width={325}
                    // height={220}
                  />
                </div>
              )}

              {type === "telegram" && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: 5,
                  }}
                >
                  <TelegramEmbed link={link} />
                </div>
              )}
            </div>
          </div>
          <p className="text-sm my-3 text-muted-foreground leading-relaxed">
            {description}
          </p>
          <a
            target="_blank"
            className=" my-5 text-sm text-primary bg-primary/10 hover:cursor-pointer underline"
          >
            {link}
          </a>

          <div className="flex my-5 flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center text-xs font-medium text-primary bg-primary/10 px-2.5 py-0.5 rounded-md transition-colors hover:bg-primary/20"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
