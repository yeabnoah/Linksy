"use client";

import { AddContentModal } from "@/components/add-content-modal";
import { AddFolderModal } from "@/components/add-folder";
import { NoteCard } from "@/components/note-card";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { ShareModal } from "@/components/share-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import folderInterface from "@/interface/folder_interface";
import { authClient } from "@/lib/auth-client";
import { useBookmarkStore } from "@/state/bookmarkStore";
import useFoldersStore from "@/state/folderContent";
import useSingleFoldersStore from "@/state/singleFolderStore";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { FolderIcon, Plus, Search, Share2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type ButtonVariant =
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
    variant: "outline" as ButtonVariant,
  },
  {
    icon: <Plus className="w-4 h-4 mr-2" />,
    label: "Add new Bookmark",
    onClick: "setIsAddContentModalOpen",
    variant: "default" as ButtonVariant,
  },
];

const FILTERS = [
  { label: "All_Types", value: "" },
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
  const [showAllFolders, setShowAllFolders] = useState(false);
  const { setFolders } = useFoldersStore();
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const {
    filteredBookmarks,
    refetchBookmarks,
    filterByType,
    currentFilter,
    setSearchQuery: setSearch,
  } = useBookmarkStore();
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
        variant={variant}
        className="font-medium flex items-center justify-center text-center transition-all duration-200 ease-in-out hover:scale-105 text-sm sm:text-base"
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

  const renderFilters = () => (
    <div className="flex md:flex-wrap overflow-x-scroll gap-2 mb-4 py-2 my-2">
      {FILTERS.map(({ label, value }) => (
        <motion.button
          key={value}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => filterByType(value)}
          className={`text-sm md:text-base transition-all duration-200 ease-in-out text-center p-1 rounded-full ${
            currentFilter === value
              ? "font-bold text-primary bg-primary/10"
              : "text-muted-foreground hover:text-primary hover:bg-primary/5"
          }`}
        >
          {label}
        </motion.button>
      ))}
    </div>
  );

  const renderFolders = () => {
    const foldersToShow = showAllFolders ? folder : folder.slice(0, 4);
    return foldersToShow.map((each) => (
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
          className=" w-full h-28 w- md:w-64 md:h-40 bg-white border-primary/15 shadow-sm border-[0.5px] rounded-lg flex items-center justify-center mb-2"
        >
          <FolderIcon
            className="h-16 w-16 sm:h-20 sm:w-20 text-primary/30"
            fill="rgb(9 9 11 / 0.7)"
          />
        </button>
        <span className="text-sm sm:text-base font-medium mx-2">
          {each.name}
        </span>
      </motion.div>
    ));
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden max-w-full md:max-w-7xl mx-auto">
      <main className="container mx-auto px-4 md:py-8 py-5">
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-6 w-6 md:h-8 md:w-8 rounded-full bg-foreground flex items-center justify-center">
              <div className="w-3 h-3 md:w-4 md:h-4 bg-background rounded-full" />
            </div>
            <span className="font-semibold text-lg md:text-xl text-foreground">
              Linksy
            </span>
          </Link>
          <div className="flex items-center space-x-3">
            {renderButtons()}
            <ProfileDropdown user={user} />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 my-5">
          <div className="relative flex-grow">
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                const value = e.target.value;
                setSearchQuery(value);
                setSearch(value);
              }}
              placeholder="Search bookmarks"
              className="pl-10 placeholder:text-sm placeholder:md:text-base"
            />
            <Search className=" h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          {renderFilters()}
        </div>

        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl md:text-2xl font-semibold text-primary">
              Folders
            </h2>
            <Button
              className="rounded-sm text-sm sm:text-base"
              size="sm"
              onClick={() => {
                setIsAddFolderModalOpen(true);
              }}
            >
              <Plus className="w-4 h-4 text-white mr-2" color="white" />
              Create Folder
            </Button>
          </div>

          {isFetchingFolders ? (
            <p className=" text-center">Loading folders...</p>
          ) : isFolderFetchError ? (
            <p>Error fetching folders</p>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {renderFolders()}
              </div>
              {folder.length > 4 && (
                <Button
                  onClick={() => setShowAllFolders(!showAllFolders)}
                  className="mt-4"
                  variant="link"
                >
                  {showAllFolders ? "Show Less" : "Show More"}
                </Button>
              )}
            </>
          )}
        </div>

        <AnimatePresence mode="wait">
          {filteredBookmarks.length === 0 ? (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center mx-auto justify-center mt-16"
            >
              <p className="text-base md:text-lg text-muted-foreground text-center">
                No bookmarks found. Add some to get started!
              </p>
              <Button
                variant="default"
                className="mt-4"
                onClick={() => setIsAddContentModalOpen(true)}
              >
                <Plus className="w-4 h-4 " />
                Add Bookmark
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="bookmarks"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid gap-4 mx-auto sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredBookmarks.map((bookmark) => (
                <motion.div
                  className="mx-auto"
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

      <AddContentModal
        isOpen={isAddContentModalOpen}
        onClose={() => setIsAddContentModalOpen(false)}
      />
      <AddFolderModal
        isOpen={isAddFolderModalOpen}
        onClose={() => setIsAddFolderModalOpen(false)}
      />
      <ShareModal
        isOpen={isShareModalOpen}
        itemCount={filteredBookmarks.length}
        onClose={() => setIsShareModalOpen(false)}
      />
    </div>
  );
}
