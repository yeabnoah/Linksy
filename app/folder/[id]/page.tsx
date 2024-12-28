"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios"; // Ensure axios is imported
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { NoteCard } from "@/components/note-card";
import { AddContentModal } from "@/components/add-content-modal";
import { AddFolderModal } from "@/components/add-folder";
import { motion, AnimatePresence } from "framer-motion";
import folderInterface from "@/interface/folder_interface";
import useSingleFoldersStore from "@/state/singleFolderStore";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { authClient } from "@/lib/auth-client";
import { Bookmark } from "lucide-react";

export default function Folder({ params }: { params: { id: string } }) {
  const id = params.id;
  const [isAddContentModalOpen, setIsAddContentModalOpen] = useState(false);
  const { singleFolder, setSingleFolder } = useSingleFoldersStore();
  const session = authClient.useSession();

  const user = {
    name: session.data?.user ? (session.data?.user.name as string) : "",
    email: session.data?.user ? (session.data?.user.email as string) : "",
    image: session.data?.user ? (session.data?.user.image as string) : "",
  };

  const { isLoading, isError } = useQuery({
    queryKey: ["repoData"],
    queryFn: async () => {
      const response = (await axios.get(`/api/v1/folder/${id}`, {
        withCredentials: true,
      })) as {
        data: { data: folderInterface };
      };
      setSingleFolder(response.data.data);
      return response.data.data;
    },
    staleTime: 1000 * 60 * 5,
    enabled: true,
  });

  const renderContent = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (isError || !singleFolder?.content) {
      return <div>Error loading data or empty folder</div>;
    }

    if (singleFolder.content.length === 0) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="empty-state"
        >
          <p>No bookmarks found. Add some to get started!</p>
        </motion.div>
      );
    }

    return (
      <motion.div
        key="bookmarks"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="bookmarks-list"
      >
        {singleFolder.content.map((bookmark) => (
          <NoteCard
            id={bookmark.id}
            key={bookmark.id}
            title={bookmark.title}
            description={(bookmark.description as string) || ""}
            link={bookmark.link}
            tags={bookmark.tags}
            type={bookmark.type}
          />
        ))}
      </motion.div>
    );
  };

  return (
    <div className=" max-w-7xl mx-auto mt-5">
      <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center">
          <Bookmark className="w-8 h-8 mr-2" />
          Bookmarks
        </h1>

        <div className="flex items-center space-x-3">
          <ProfileDropdown user={user} />
        </div>
      </div>

      <h1>{singleFolder.name} Folder</h1>
      <div>{renderContent()}</div>
      <AddContentModal
        isOpen={isAddContentModalOpen}
        onClose={() => setIsAddContentModalOpen(false)}
      />
      <AddFolderModal
        isOpen={false} // For now, you may want to toggle this similarly
        onClose={() => {}}
      />
    </div>
  );
}
