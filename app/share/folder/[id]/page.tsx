"use client";

import { NoteCardTrash } from "@/components/note-card-public";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import folderInterface from "@/interface/folder_interface";
import { Bookmark, Search } from "lucide-react";
import Link from "next/link";
import { Spinner } from "@/components/spinner";

interface FolderResponse {
  data: folderInterface & { userId: string };
}

interface UserResponse {
  data: {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string;
    createdAt: string;
    updatedAt: string;
  };
}

const FILTERS = [
  { label: "All Types", value: "" },
  { label: "Telegram", value: "telegram" },
  { label: "YouTube", value: "youtube" },
  { label: "Twitter", value: "twitter" },
  { label: "Instagram", value: "instagram" },
  { label: "Reddit", value: "reddit" },
  { label: "Discord", value: "discord" },
  { label: "Pinterest", value: "pinterest" },
  { label: "LinkedIn", value: "linkedin" },
  { label: "Website", value: "website" },
];

const ShareComponent = ({ params }: { params: { id: string } }) => {
  const folderId = params.id;

  const fetchFolderData = async (id: string) => {
    const response = await axios.get<FolderResponse>(
      `/api/v1/folder/share/${id}`
    );
    return response.data.data;
  };

  const fetchUserData = async (userId: string) => {
    const response = await axios.get<UserResponse>(
      `/api/v1/user?userId=${userId}`
    );
    return response.data.data;
  };

  const {
    data: folderData,
    error: folderError,
    isLoading: folderLoading,
  } = useQuery({
    queryKey: ["shareFolder", folderId],
    queryFn: () => fetchFolderData(folderId),
    enabled: !!folderId,
  });

  const {
    data: userData,
    error: userError,
    isLoading: userLoading,
  } = useQuery({
    queryKey: ["shareUser", folderData?.userId],
    queryFn: () => fetchUserData(folderData!.userId),
    enabled: !!folderData?.userId,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");

  const filteredData = folderData?.content.filter((post) => {
    const matchesSearch =
      post.tags
        .toLocaleString()
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.description &&
        post.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = selectedFilter ? post.type === selectedFilter : true;
    return matchesSearch && matchesFilter;
  });

  if (folderLoading || userLoading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <Spinner className="w-8 h-8 text-primary" />
      </div>
    );
  }

  if (folderError instanceof Error || userError instanceof Error) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Error</h1>
          <p className="text-gray-600">
            Permission Disabled or Wrong Access Link
            <br />
            {folderError?.message || userError?.message}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl min-h-screen bg-white px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-center py-5">
        <Link
          href="#"
          className="text-xl sm:text-2xl font-medium tracking-tight text-primary flex items-center mb-4 sm:mb-0"
        >
          <Bookmark className="w-6 h-5 sm:w-7 sm:h-6 mr-2" />
          Bookmarks-shared-folder
        </Link>

        {userData && (
          <div className="flex items-center gap-2">
            <p className="text-sm sm:text-lg font-semibold">
              shared from{" "}
              <span className="font-medium">{userData.name.split(" ")[0]}</span>
            </p>
            <img
              src={userData.image}
              alt={userData.name}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
            />
          </div>
        )}
      </div>
      <hr className="mb-5" />

      <span className=" font-semibold text-lg0">{folderData?.name} Folder</span>

      <div className="flex flex-col sm:flex-row gap-4 sm:items-center mb-8 mt-3">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className=" md:max-w-3xl w-full p-2 pl-10 border rounded-md focus:outline-none "
          />
          <Search className="absolute left-3 h-5 w-5 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <select
          className="p-2 border rounded-md focus:outline-none "
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
        >
          {FILTERS.map((filter) => (
            <option key={filter.value} value={filter.value}>
              {filter.label}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData?.map((each) => (
          <NoteCardTrash
            type={each.type}
            id={each.id}
            key={each.id}
            description={each?.description || ""}
            tags={each.tags}
            title={each.title}
            link={each.link}
          />
        ))}
      </div>
    </div>
  );
};

export default ShareComponent;
