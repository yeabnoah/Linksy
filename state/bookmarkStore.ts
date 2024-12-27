import { ContentInterface } from "@/validation/contentSchema";
import { create } from "zustand";
import axios from "axios";

interface BookmarkStore {
  bookmarks: ContentInterface[];
  filteredBookmarks: ContentInterface[];
  currentFilter: string; // Tracks the current filter
  fetchBookmarks: () => Promise<void>;
  filterByType: (type: string) => void;
  refetchBookmarks: () => Promise<void>;
  setCurrentFilter: (filter: string) => void; // Sets the current filter
}

export const useBookmarkStore = create<BookmarkStore>((set) => ({
  bookmarks: [],
  filteredBookmarks: [],
  currentFilter: "", // Initially no filter applied (all items)

  fetchBookmarks: async () => {
    try {
      const response = await axios.get<{ data: ContentInterface[] }>(
        "/api/v1/content",
        { withCredentials: true }
      );
      const bookmarks = response.data.data;
      set({ bookmarks, filteredBookmarks: bookmarks });
    } catch (error) {
      console.error("Failed to fetch bookmarks:", error);
    }
  },

  refetchBookmarks: async () => {
    try {
      const response = await axios.get<{ data: ContentInterface[] }>(
        "/api/v1/content",
        { withCredentials: true }
      );
      const bookmarks = response.data.data;
      set({ bookmarks, filteredBookmarks: bookmarks });
    } catch (error) {
      console.error("Failed to refetch bookmarks:", error);
    }
  },

  filterByType: (type) =>
    set((state) => ({
      filteredBookmarks: type
        ? state.bookmarks.filter((bookmark) => bookmark.type === type)
        : state.bookmarks,
    })),

  setCurrentFilter: (filter) => set({ currentFilter: filter }), // Set current filter
}));
