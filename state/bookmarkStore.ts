import { queryClient } from "@/util/query-client";
import { ContentInterface } from "@/validation/contentSchema";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState, useEffect } from "react";

const fetchBookmarksData = async (): Promise<ContentInterface[]> => {
  const response = await axios.get<{ data: ContentInterface[] }>(
    "/api/v1/content",
    { withCredentials: true }
  );
  return response.data.data;
};

export const useBookmarkStore = () => {
  const [currentFilter, setCurrentFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const {
    data: bookmarks = [],
    refetch,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: fetchBookmarksData,
  });

  const filteredBookmarks = currentFilter
    ? bookmarks.filter((bookmark) => bookmark.type === currentFilter)
    : bookmarks;

  const searchFilteredBookmarks = searchQuery
    ? filteredBookmarks.filter(
        (bookmark) =>
          bookmark.tags
            .toLocaleString()
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (bookmark.description &&
            bookmark?.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase()))
      )
    : filteredBookmarks;

  const { mutate: refetchBookmarks } = useMutation({
    mutationFn: fetchBookmarksData,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const filterByType = (type: string) => {
    setCurrentFilter(type);
  };

  useEffect(() => {
    const timer = setTimeout(() => {}, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, filteredBookmarks]);

  return {
    bookmarks,
    filteredBookmarks: searchFilteredBookmarks,
    currentFilter,
    isLoading,
    isError,
    fetchBookmarks: refetch,
    refetchBookmarks,
    filterByType,
    setCurrentFilter,
    searchQuery,
    setSearchQuery,
  };
};
