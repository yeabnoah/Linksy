"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Share2, Bookmark } from "lucide-react";
import { useBookmarkStore } from "@/state/bookmarkStore";
import { NoteCard } from "@/components/note-card";
import { NoteCardSkeleton } from "@/components/note-card-skeleton";
import { ShareModal } from "@/components/share-modal";
import { AddContentModal } from "@/components/add-content-modal";
import { Button } from "@/components/ui/button";

const BUTTONS = [
  {
    icon: <Share2 className="w-4 h-4 mr-2" />,
    label: "Share Memory",
    onClick: "setIsShareModalOpen",
    variant: "outline",
  },
  {
    icon: <Plus className="w-4 h-4 mr-2" />,
    label: "Add Memory",
    onClick: "setIsAddContentModalOpen",
    variant: "default",
  },
];

const FILTERS = [
  { label: "All Types", value: "" },
  { label: "Telegram", value: "telegram" },
  { label: "Twitter", value: "twitter" },
  { label: "Instagram", value: "instagram" },
  { label: "Youtube", value: "youtube" },
];

export default function Home() {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isAddContentModalOpen, setIsAddContentModalOpen] = useState(false);
  const { filteredBookmarks, refetchBookmarks, filterByType, currentFilter } =
    useBookmarkStore();

  useEffect(() => {
    refetchBookmarks();
  }, [refetchBookmarks]);

  const renderButtons = () =>
    BUTTONS.map(({ icon, label, onClick, variant }) => (
      <Button
        key={label}
        variant={variant}
        className="font-medium flex items-center justify-center text-center transition-all duration-200 ease-in-out hover:scale-105"
        onClick={() => {
          if (onClick === "setIsShareModalOpen") {
            setIsShareModalOpen(true);
          } else {
            setIsAddContentModalOpen(true);
          }
        }}
      >
        {icon}
        <span className="hidden sm:inline">{label}</span>
      </Button>
    ));

  const renderFilters = () =>
    FILTERS.map(({ label, value }) => (
      <motion.li
        key={value}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <button
          onClick={() => filterByType(value)}
          className={`text-lg transition-all duration-200 ease-in-out ${
            currentFilter === value
              ? "font-bold text-primary"
              : "text-muted-foreground hover:text-primary"
          }`}
        >
          {label}
        </button>
      </motion.li>
    ));

  return (
    <div className="min-h-screen bg-background max-w-7xl mx-auto">
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
          <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center">
            <Bookmark className="w-8 h-8 mr-2" />
            My Bookmarks
          </h1>
          <div className="flex items-center space-x-3">{renderButtons()}</div>
        </div>

        <nav className="mb-8">
          <ul className="flex flex-wrap gap-6 justify-center sm:justify-start">
            {renderFilters()}
          </ul>
        </nav>

        <AnimatePresence mode="wait">
          {filteredBookmarks.length === 0 ? (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {[...Array(6)].map((_, index) => (
                <NoteCardSkeleton key={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="bookmarks"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredBookmarks.map((bookmark) => (
                <motion.div
                  key={bookmark.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <NoteCard
                    id={bookmark.id}
                    description={(bookmark?.description as string) || ""}
                    title={bookmark.title}
                    link={bookmark.link}
                    tags={bookmark.tags}
                    type={bookmark.type}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        itemCount={filteredBookmarks.length}
      />
      <AddContentModal
        isOpen={isAddContentModalOpen}
        onClose={() => setIsAddContentModalOpen(false)}
      />
    </div>
  );
}
