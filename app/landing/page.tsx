"use client";

import { Nav } from "@/components/nav";
import { DashboardPreview } from "@/components/dashboard";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Homer() {
  const router = useRouter();
  return (
    <div className="h-screen overflow-hidden bg-background">
      <Nav />

      <main className="px-4">
        <div className="max-w-4xl mx-auto text-center pt-20 pb-16">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Save and Manage
            <br />
            bookmarks <span className=" text-xl font-thin"> (posts).</span>
          </h1>
          <p className="text-base md:text-xl text-muted-foreground mb-8 max-w-[85%] mx-auto">
            copy and paste your favorite post from any social media label it and
            access it at anytime. no more dumping on Google docs or personal
            chats.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button
              onClick={() => {
                router.push("/sign-in");
              }}
              size="lg"
              className="font-medium"
            >
              Get started
            </Button>
            <Button
              onClick={() => {
                router.push("/sign-up");
              }}
              size="lg"
              variant="outline"
              className="font-medium"
            >
              Create an Account
            </Button>
          </div>
        </div>

        <DashboardPreview />
      </main>
    </div>
  );
}
