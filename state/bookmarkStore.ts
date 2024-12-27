import { queryClient } from "@/util/query-client";
import { ContentInterface } from "@/validation/contentSchema";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const fetchBookmarksData = async (): Promise<ContentInterface[]> => {
  const response = await axios.get<{ data: ContentInterface[] }>(
    "/api/v1/content",
    { withCredentials: true }
  );
  return response.data.data;
};

export const useBookmarkStore = () => {
  const [currentFilter, setCurrentFilter] = useState<string>("");

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

  const { mutate: refetchBookmarks } = useMutation({
    mutationFn: fetchBookmarksData,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const filterByType = (type: string) => {
    setCurrentFilter(type);
  };

  return {
    bookmarks,
    filteredBookmarks,
    currentFilter,
    isLoading,
    isError,
    fetchBookmarks: refetch,
    refetchBookmarks,
    filterByType,
    setCurrentFilter,
  };
};
