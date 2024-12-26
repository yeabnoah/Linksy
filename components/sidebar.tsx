import Link from "next/link";
import { Brain } from "lucide-react";
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
    <div className="w-64 hidden  h-screen border-r border-border bg-card fixed left-0 top-0 z-30 md:flex md:flex-col transition-all duration-300 ease-in-out">
      <div className="p-6">
        <Link
          href="/"
          className="flex items-center gap-3 transition-colors hover:opacity-80"
        >
          <Brain className="w-8 h-8 text-primary" />
          <span className="text-xl font-semibold tracking-tight">
            Second Brain
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-4">
        <div className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
