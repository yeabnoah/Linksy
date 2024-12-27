"use client";

import { NoteCard } from "@/components/note-card";
import { NoteCardSkeleton } from "@/components/note-card-skeleton";
import { ShareModal } from "@/components/share-modal";
import { AddContentModal } from "@/components/add-content-modal";
import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { useBookmarkStore } from "@/state/bookmarkStore";
import { useState, useEffect } from "react";
import { Plus, Share2 } from "lucide-react";

export default function Home() {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isAddContentModalOpen, setIsAddContentModalOpen] = useState(false);
  const { filteredBookmarks, currentFilter, refetchBookmarks } =
    useBookmarkStore();

  const pageTitle = currentFilter
    ? currentFilter.charAt(0).toUpperCase() + currentFilter.slice(1)
    : "All Bookmarks";

  useEffect(() => {
    refetchBookmarks();
  }, [refetchBookmarks]);

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="relative h-full w-full">
        <main className="flex-1 md:ml-72">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-xl font-md tracking-sidebar dark:text-white">
                {pageTitle}
              </h1>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  className="font-medium flex items-center justify-center text-center text-primary hover:text-primary hover:bg-primary/10 border-primary/20"
                  onClick={() => setIsShareModalOpen(true)}
                >
                  <Share2 className="w-4 h-4 md:mr-2" />
                  <span className="hidden md:block">Share Memory</span>
                </Button>
                <Button
                  className="font-medium flex justify-center items-center text-center bg-primary hover:bg-primary/90 transition-colors"
                  onClick={() => setIsAddContentModalOpen(true)}
                >
                  <Plus className="w-4 h-4 md:mr-2" />
                  <span className="hidden md:block">Add Memory</span>
                </Button>
              </div>
            </div>

            {filteredBookmarks.length === 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <NoteCardSkeleton />
                <NoteCardSkeleton />
                <NoteCardSkeleton />
                <NoteCardSkeleton />
                <NoteCardSkeleton />
                <NoteCardSkeleton />
              </div>
            ) : (
              <div className=" flex flex-row gap-5 flex-wrap">
                {filteredBookmarks.map((each) => (
                  <NoteCard
                    id={each.id}
                    description={(each?.description as string) || ""}
                    key={each.id}
                    title={each.title}
                    link={each.link}
                    tags={each.tags}
                    type={each.type}
                  />
                ))}
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
