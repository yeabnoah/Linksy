"use client";

import { AddContentFolderModal } from "@/components/add-content-folder";
import { NoteCard } from "@/components/note-card";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import folderInterface from "@/interface/folder_interface";
import { authClient } from "@/lib/auth-client";
import useSingleFoldersStore from "@/state/singleFolderStore";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { Bookmark, Loader, MoveLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Folder({ params }: { params: { id: string } }) {
  const id = params.id;
  const [isAddContentModalOpen, setIsAddContentModalOpen] = useState(false);
  const { singleFolder, setSingleFolder } = useSingleFoldersStore();
  const session = authClient.useSession();
  const router = useRouter();

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
      return <Loader />;
    }

    if (isError || !singleFolder?.content) {
      return (
        <Card className="p-4">
          <p>Error loading data or empty folder</p>
        </Card>
      );
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
        className="bookmarks-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
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
    <div className="max-w-7xl mx-auto mt-5">
      <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center">
          <Bookmark className="w-8 h-8 mr-2" />
          Bookmarks
        </h1>

        <div className="flex items-center space-x-3">
          <ProfileDropdown user={user} />
        </div>
      </div>

      <div className=" flex justify-between items-center my-5">
        <div className=" flex items-center gap-5">
          <Button
            onClick={() => {
              router.back();
            }}
            className=" bg-transparent shadow-none hover:bg-transparent"
          >
            {
              <MoveLeftIcon className=" text-black text-xl font-bold hover:bg-transparent  p-0 bg-transparent" />
            }
          </Button>
          <h2 className="text-xl font-semibold">{singleFolder.name} Folder</h2>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Button onClick={() => setIsAddContentModalOpen(true)}>
            Add Content
          </Button>
        </div>
      </div>

      <div>{renderContent()}</div>

      <AddContentFolderModal
        isOpen={isAddContentModalOpen}
        onClose={() => setIsAddContentModalOpen(false)}
      />
    </div>
  );
}
