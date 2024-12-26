"use client";

import { AddContentModal } from "@/components/add-content-modal";
import { NoteCard } from "@/components/note-card";
import { NoteCardSkeleton } from "@/components/note-card-skeleton";
import { ShareModal } from "@/components/share-modal";
import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { ContentInterface } from "@/validation/contentSchema";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Plus, Share2 } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isAddContentModalOpen, setIsAddContentModalOpen] = useState(false);

  const {
    data: contents,
    isLoading,
    // isError,
  } = useQuery({
    queryKey: ["contents"],
    queryFn: async () => {
      const response: { data: { data: ContentInterface[] } } = await axios.get(
        "/api/v1/content",
        {
          withCredentials: true,
        }
      );
      console.log(response.data.data);
      return response.data.data;
    },
  });

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="relative h-full w-full">
        <main className="flex-1 md:ml-72">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-xl font-md tracking-sidebar dark:text-white">
                My Bookmark
              </h1>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  className="font-medium flex items-center justify-center text-center text-primary hover:text-primary hover:bg-primary/10 border-primary/20"
                  onClick={() => setIsShareModalOpen(true)}
                >
                  <Share2 className="w-4 h-4 md:mr-2" />
                  <span className=" hidden md:block">Share Memory</span>
                </Button>
                <Button
                  className="font-medium flex justify-center items-center text-center bg-primary hover:bg-primary/90 transition-colors"
                  onClick={() => setIsAddContentModalOpen(true)}
                >
                  <Plus className="w-4 h-4 md:mr-2" />
                  <span className=" hidden md:block">Add Memory</span>
                </Button>
              </div>
            </div>

            {isLoading ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <NoteCardSkeleton />
                <NoteCardSkeleton />
                <NoteCardSkeleton />
                <NoteCardSkeleton />
                <NoteCardSkeleton />
                <NoteCardSkeleton />
              </div>
            ) : (
              <div className="grid gap-3 grid-cols-3">
                {contents?.map((each) => {
                  return (
                    <NoteCard
                      id={each.id}
                      description={(each?.description as string) || ""}
                      key={each.id}
                      title={each.title}
                      link={each.link}
                      tags={each.tags}
                      type={each.type}
                    />
                  );
                })}
              </div>
            )}
          </div>

          <ShareModal
            isOpen={isShareModalOpen}
            onClose={() => setIsShareModalOpen(false)}
            itemCount={3}
          />
          <AddContentModal
            isOpen={isAddContentModalOpen}
            onClose={() => setIsAddContentModalOpen(false)}
          />
        </main>
      </div>
    </div>
  );
}
