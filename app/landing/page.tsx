"use client";

import { DashboardPreview } from "@/components/dashboard";
import { Nav } from "@/components/nav";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

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

  const session = authClient.useSession();

  if (session.data?.session) {
    router.push("/");
  }

  return (
    <div className="h-max-screen md:h-screen overflow-y-hidden bg-background">
      <Nav />

      <main className="px-4 ">
        <div className="max-w-4xl mx-auto text-center pt-20 pb-16">
          <div className="mt-8 mx-auto justify-center">
            {isLoading ? (
              <p className="text-lg text-muted-foreground mb-4">
                Loading star count...
              </p>
            ) : error ? (
              <p className="text-lg text-red-500 mb-4">
                Error fetching star count.
              </p>
            ) : (
              <a
                href="https://github.com/yeabnoah/linksy"
                target="_blank"
                rel="noopener noreferrer"
                className=" flex items-center w-fit gap-2 px-5 py-1 mx-auto  bg-black/85 text-white border rounded-3xl border-black/40"
              >
                <span className=" text-lg text-white text-center font-semibold">
                  {starCount}
                </span>
                <span className=" text-lg text-white text-center font-semibold">
                  Stars on GitHub
                </span>
              </a>
            )}
          </div>
          <h1 className=" mt-8 scroll-m-20 text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
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
        </div>

        <DashboardPreview />
      </main>
    </div>
  );
}
