import folderInterface from "@/interface/folder_interface";
import { create } from "zustand";

type Store = {
  folders: folderInterface[];
  setFolders: (folders: folderInterface[]) => void;
  reset: () => void;
};

const useFoldersStore = create<Store>((set) => ({
  folders: [],
  setFolders: (folders) => set({ folders }),
  reset: () => set({ folders: [] }),
}));

export default useFoldersStore;
