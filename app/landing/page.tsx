"use client";

import { Nav } from "@/components/nav";
import { DashboardPreview } from "@/components/dashboard";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

const fetchStarCount = async () => {
  const response = await fetch("https://api.github.com/repos/yeabnoah/linksy");
  const data = await response.json();
  return data.stargazers_count;
};

export default function Homer() {
  const router = useRouter();

  const {
    data: starCount,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["githubStarCount"],
    queryFn: fetchStarCount,
  });

  return (
    <div className="h-max-screen md:h-screen overflow-y-hidden bg-background">
      <Nav />

      <main className="px-4 ">
        <div className="max-w-4xl mx-auto text-center pt-20 pb-16">
          <h1 className="scroll-m-20 text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
            Save and Manage
            <br />
            bookmarks <span className="text-xl font-thin"> (posts).</span>
          </h1>
          <p className="text-sm md:text-xl text-muted-foreground mb-8 max-w-[85%] mx-auto">
            Copy and paste your favorite post from any social media, label it,
            and access it at any time. No more dumping on Google Docs or
            personal chats.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={() => {
                router.push("/sign-in");
              }}
              className="font-medium"
            >
              Get Started
            </Button>
          </div>

          {/* GitHub Star Count and Button */}
          <div className="mt-8">
            {isLoading ? (
              <p className="text-lg text-muted-foreground mb-4">
                Loading star count...
              </p>
            ) : error ? (
              <p className="text-lg text-red-500 mb-4">
                Error fetching star count.
              </p>
            ) : (
              <p className="text-lg text-muted-foreground mb-4">
                This project has {starCount} stars on GitHub.
              </p>
            )}

            <a
              href="https://github.com/your-username/your-repo-name"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="font-medium">
                ⭐ Star on GitHub
              </Button>
            </a>
          </div>
        </div>

        <DashboardPreview />
      </main>
    </div>
  );
}
