"use client";

import { AddContentModal } from "@/components/add-content-modal";
import { AddFolderModal } from "@/components/add-folder";
import { NoteCard } from "@/components/note-card";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { ShareModal } from "@/components/share-modal";
import { Button } from "@/components/ui/button";
import folderInterface from "@/interface/folder_interface";
import { authClient } from "@/lib/auth-client";
import { useBookmarkStore } from "@/state/bookmarkStore";
import useFoldersStore from "@/state/folderContent";
import useSingleFoldersStore from "@/state/singleFolderStore";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { Bookmark, FolderIcon, Plus, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Test =
  | "outline"
  | "default"
  | "link"
  | "destructive"
  | "secondary"
  | "ghost";

const BUTTONS = [
  {
    icon: <Share2 className="w-4 h-4 mr-2" />,
    label: "Share my Bookmark",
    onClick: "setIsShareModalOpen",
    variant: "outline",
  },
  {
    icon: <Plus className="w-4 h-4 mr-2" />,
    label: "Add new Bookmark",
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
  { label: "Reddit", value: "reddit" },
  { label: "Discord", value: "discord" },
  { label: "Pinterest", value: "Pinterest" },
  { label: "LinkedIn", value: "linkedin" },
  { label: "Website", value: "website" },
];

export default function Home() {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isAddContentModalOpen, setIsAddContentModalOpen] = useState(false);
  const [isAddFolderModalOpen, setIsAddFolderModalOpen] = useState(false);
  const { setFolders } = useFoldersStore();
  const router = useRouter();

  const { filteredBookmarks, refetchBookmarks, filterByType, currentFilter } =
    useBookmarkStore();
  const { setSingleFolder } = useSingleFoldersStore();

  const {
    data: folder = [],
    isLoading: isFetchingFolders,
    isError: isFolderFetchError,
  } = useQuery({
    queryKey: ["folders"],
    queryFn: async () => {
      const response = (await axios.get("/api/v1/folder", {
        withCredentials: true,
      })) as { data: { data: folderInterface[] } };

      setFolders(response.data.data);
      return response.data.data;
    },
    staleTime: 1000 * 60 * 5,
  });

  const session = authClient.useSession();

  useEffect(() => {
    refetchBookmarks();
  }, [refetchBookmarks]);

  const user = {
    name: session.data?.user ? (session.data?.user.name as string) : "",
    email: session.data?.user ? (session.data?.user.email as string) : "",
    image: session.data?.user ? (session.data?.user.image as string) : "",
  };

  const renderButtons = () =>
    BUTTONS.map(({ icon, label, onClick, variant }) => (
      <Button
        key={label}
        variant={variant as Test}
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

  const renderFolders = () =>
    folder.map((each) => (
      <motion.div
        key={each.id}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex flex-col items-start text-left cursor-pointer"
      >
        <button
          onClick={() => {
            router.push(`/folder/${each.id}`);
            setSingleFolder(each);
          }}
          className="w-64 h-40 bg-white border-primary/15 shadow-sm border-[0.5px] rounded-lg flex items-center justify-center mb-2"
        >
          <FolderIcon
            className=" h-20 w-20 text-primary/30"
            fill="rgb(9 9 11 / 0.7)"
          />
        </button>
        <span className="text-base font-medium mx-2">{each.name}</span>
      </motion.div>
    ));

  return (
    <div className="min-h-screen bg-background max-w-7xl mx-auto">
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center">
            <Bookmark className="w-8 h-8 mr-2" />
            Bookmarks
          </h1>
          <div className="flex items-center space-x-3">
            {renderButtons()}
            <ProfileDropdown user={user} />
          </div>
        </div>

        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-primary">Folders</h2>
            <Button
              className="rounded-sm"
              onClick={() => {
                setIsAddFolderModalOpen(true);
              }}
            >
              <Plus className="w-4 h-4 text-white" color="white" />
              Create Folder
            </Button>
          </div>
          {isFetchingFolders ? (
            <p>Loading folders...</p>
          ) : isFolderFetchError ? (
            <p>Error fetching folders</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {renderFolders()}
            </div>
          )}
        </div>

        <nav className="mb-8 overflow-x-auto">
          <ul className="flex flex-nowrap gap-6 pb-2">{renderFilters()}</ul>
        </nav>

        <AnimatePresence mode="wait">
          {filteredBookmarks.length === 0 ? (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center mt-16"
            >
              <p className="text-lg text-muted-foreground">
                No bookmarks found. Add some to get started!
              </p>
              <Button
                variant="default"
                className="mt-4"
                onClick={() => setIsAddContentModalOpen(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Bookmark
              </Button>
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
      <AddFolderModal
        isOpen={isAddFolderModalOpen}
        onClose={() => setIsAddFolderModalOpen(false)}
      />
    </div>
  );
}
