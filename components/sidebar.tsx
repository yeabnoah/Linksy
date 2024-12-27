import {
  InstagramIcon,
  LinkedinIcon,
  MessagesSquareIcon,
  Twitter,
  YoutubeIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useBookmarkStore } from "@/state/bookmarkStore";

const navItems = [
  { icon: Twitter, label: "Tweets", type: "twitter" },
  { icon: YoutubeIcon, label: "Youtube", type: "youtube" },
  { icon: MessagesSquareIcon, label: "Telegram", type: "telegram" },
  { icon: InstagramIcon, label: "Instagram", type: "instagram" },
  { icon: LinkedinIcon, label: "Linkedin", type: "linkedin" },
];

export function Sidebar() {
  const { filterByType, refetchBookmarks, setCurrentFilter } =
    useBookmarkStore();

  const clickHandler = async (type: string) => {
    await refetchBookmarks(); // Refetch bookmarks when applying the filter
    filterByType(type); // Apply filter after refetching the data
    setCurrentFilter(type); // Set the current filter state
  };

  return (
    <div className="w-72 hidden h-screen border-r border-border bg-card fixed left-0 top-0 z-30 md:flex md:flex-col transition-all duration-300 ease-in-out">
      <div className="p-6 mx-5">
        <Link
          href="/"
          className="flex items-center gap-3 transition-colors hover:opacity-80"
          onClick={async () => {
            await refetchBookmarks(); // Reset the feed to the latest data
            filterByType(""); // Reset the filter
            setCurrentFilter(""); // Reset the current filter state
          }}
        >
          <span className="text-xl font-bold tracking-tight">Bookmark</span>
        </Link>
      </div>

      <nav className="flex-1 px-8 mt-4">
        <div className="space-y-1 w-full">
          <Button
            className="border bg-transparent shadow-none rounded-none gap-5 flex justify-center items-center px-3 text-base font-medium w-full text-muted-foreground hover:text-foreground hover:bg-accent py-5 transition-colors"
            onClick={async () => {
              await refetchBookmarks(); // Refetch all bookmarks
              filterByType(""); // Reset filter
              setCurrentFilter(""); // Reset current filter state
            }}
          >
            <span className="text-base">All</span>
          </Button>

          {navItems.map((item) => (
            <Button
              key={item.type}
              className="border bg-transparent shadow-none rounded-none gap-5 flex justify-center items-center px-3 text-base font-medium w-full text-muted-foreground hover:text-foreground hover:bg-accent py-5 transition-colors"
              onClick={() => clickHandler(item.type)} // Refetch and filter
            >
              <item.icon className="w-5 h-5" />
              <span className="text-base">{item.label}</span>
            </Button>
          ))}
        </div>
      </nav>
    </div>
  );
}
