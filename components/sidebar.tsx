import Link from "next/link";
import { Brain, MemoryStickIcon } from "lucide-react";
import { Twitter, Video, FileText, LinkIcon, Hash } from "lucide-react";

const navItems = [
  { icon: Twitter, label: "Tweets", href: "/tweets" },
  { icon: Video, label: "Videos", href: "/videos" },
  { icon: FileText, label: "Documents", href: "/documents" },
  { icon: LinkIcon, label: "Links", href: "/links" },
  { icon: Hash, label: "Tags", href: "/tags" },
];

export function Sidebar() {
  return (
    <div className="w-80 hidden  h-screen border-r border-border bg-card fixed left-0 top-0 z-30 md:flex md:flex-col transition-all duration-300 ease-in-out">
      <div className="p-6">
        <Link
          href="/"
          className="flex items-center gap-3 transition-colors hover:opacity-80"
        >
          <MemoryStickIcon className="w-8 h-8 text-primary" />
          <span className="text-xl font-semibold tracking-tight"></span>
        </Link>
      </div>

      <nav className="flex-1 px-8">
        <div className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-5 px-3 py-2 text-base font-medium rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
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
