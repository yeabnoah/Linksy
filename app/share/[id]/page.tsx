"use client";

import { NoteCardTrash } from "@/components/note-card-public";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Bookmark, Search } from "lucide-react";
import Link from "next/link";
import { Spinner } from "@/components/spinner";

interface Post {
  id: number;
  title: string;
  link: string;
  description: string;
  type: "youtube" | "telegram";
  tags: string[];
  userId: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

const fetchPosts = async (id: string) => {
  const response = await axios.get<ApiResponse<Post[]>>(
    `/api/v1/bookmark/share/${id}`
  );
  return response.data.data;
};

const fetchUser = async (userId: string) => {
  const response = await axios.get<ApiResponse<User>>(
    `/api/v1/user?userId=${userId}`
  );
  return response.data.data;
};

const ShareComponent = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");

  const {
    data: posts,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["sharePosts", id],
    queryFn: () => fetchPosts(id),
    enabled: !!id,
  });

  const userId = posts?.[0]?.userId;
  const {
    data: user,
    error: userError,
    isLoading: userLoading,
  } = useQuery({
    queryKey: ["userDetails", userId],
    queryFn: () => fetchUser(userId!),
    enabled: !!userId,
  });

  const filteredData = posts?.filter((post) => {
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

  if (isLoading || userLoading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <Spinner className="w-8 h-8 text-primary" />
      </div>
    );
  }

  if (error instanceof Error || userError instanceof Error) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Error</h1>
          <p className="text-gray-600">
            Permission Disabled or Wrong Access Link
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl min-h-screen bg-white px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row items-center justify-between py-6">
        <Link
          href="#"
          className="text-2xl font-medium tracking-tight text-primary flex items-center mb-4 sm:mb-0"
        >
          <Bookmark className="w-7 h-6 mr-2" />
          Bookmarks
        </Link>
        {user && (
          <div className="flex items-center gap-2">
            <p className="text-sm sm:text-base font-semibold">
              shared from{" "}
              <span className="font-medium">{user.name.split(" ")[0]}</span>
            </p>
            <img
              src={user.image}
              alt={user.name}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
            />
          </div>
        )}
      </div>

      <hr className="mb-6" />

      <div className="flex flex-col sm:flex-row gap-4 sm:items-center mb-8">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search bookmarks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className=" md:max-w-3xl w-full outline-none p-2 pl-10 border rounded-md focus:outline-none "
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>
        <select
          className="p-2 border rounded-md focus:outline-none"
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
            description={each.description}
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

const FILTERS = [
  { label: "All Types", value: "" },
  { label: "Telegram", value: "telegram" },
  { label: "Youtube", value: "youtube" },
  { label: "Twitter", value: "twitter" },
  { label: "Instagram", value: "instagram" },
  { label: "Reddit", value: "reddit" },
  { label: "Discord", value: "discord" },
  { label: "Pinterest", value: "pinterest" },
  { label: "LinkedIn", value: "linkedin" },
  { label: "Website", value: "website" },
];
