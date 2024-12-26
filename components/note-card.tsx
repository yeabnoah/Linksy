import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Share2, Trash2, TwitterIcon } from "lucide-react";
import { Tweet } from "react-tweet";

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
    <Card className="group overflow-hidden w-96 transition-all duration-200 hover:shadow-lg rounded-sm shadow-none">
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
      <CardContent>
        <div className="space-y-4">
          <div className="">
            <div
              style={{ display: "flex", justifyContent: "center" }}
              className=" h-80"
            >
              {}
              <Tweet id="1356633038717923333" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {link}
          </p>

          <div className="flex flex-wrap gap-2">
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
