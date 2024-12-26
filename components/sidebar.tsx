import Link from "next/link";
import { Brain, DockIcon, MemoryStickIcon } from "lucide-react";
import {
  Twitter,
  Video,
  FileText,
  LinkIcon,
  Hash,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
  MessagesSquareIcon,
} from "lucide-react";

const navItems = [
  { icon: Twitter, label: "Tweets", href: "/" },
  { icon: YoutubeIcon, label: "Youtube", href: "/" },
  { icon: MessagesSquareIcon, label: "Telegram", href: "/" },
  { icon: InstagramIcon, label: "Instagram", href: "/" },
  { icon: LinkedinIcon, label: "Linkedin", href: "/" },
  // { icon: , label: "Linkedin", href: "/" },
];

export function Sidebar() {
  return (
    <div className="w-72 hidden  h-screen border-r border-border bg-card fixed left-0 top-0 z-30 md:flex md:flex-col transition-all duration-300 ease-in-out">
      <div className="p-6 mx-5">
        <Link
          href="/"
          className="flex items-center gap-3 transition-colors hover:opacity-80"
        >
          <span className="text-xl  font-bold tracking-tight ">Bookmark</span>
        </Link>
      </div>

      <nav className="flex-1 px-8 mt-4">
        <div className="space-y-1 w-full">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center border border-primary/15 rounded-none gap-5 px-3 py-2 text-base font-medium w-full text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            >
              <item.icon className="w-5 h-5" />
              <span className=" text-base">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
