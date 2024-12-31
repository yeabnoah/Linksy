"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function Nav() {
  const router = useRouter();
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-foreground flex items-center justify-center">
              <div className="w-4 h-4 bg-background rounded-full" />
            </div>
            <span className="font-semibold text-xl text-foreground">
              Linksy
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Button
            onClick={() => {
              router.push("/sign-in");
            }}
            variant="ghost"
          >
            Login
          </Button>
          <Button
            onClick={() => {
              router.push("/sign-up");
            }}
          >
            Sign up
          </Button>
        </div>
      </div>
    </header>
  );
}
