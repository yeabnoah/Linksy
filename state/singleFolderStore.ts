import folderInterface from "@/interface/folder_interface";
import { create } from "zustand";

type Store = {
  singleFolder: folderInterface;
  setSingleFolder: (folder: folderInterface) => void;
  reset: () => void;
};

const useSingleFoldersStore = create<Store>((set) => ({
  singleFolder: {
    id: 0,
    name: "",
    userId: "",
    content: [],
  },
  setSingleFolder: (singleFolder) => set({ singleFolder }),
  reset: () =>
    set({
      singleFolder: {
        id: 0,
        name: "",
        userId: "",
        content: [],
      },
    }),
}));

export default useSingleFoldersStore;
