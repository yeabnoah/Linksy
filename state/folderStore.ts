import { create } from "zustand";
import { ContentInterface } from "@/validation/contentSchema";
import folderInterface from "@/interface/folder_interface";

interface FolderStore {
  folders: folderInterface[];
  addFolder: (folder: folderInterface) => void;
  updateFolder: (
    folderId: number,
    updatedFolder: Partial<folderInterface>
  ) => void;
  deleteFolder: (folderId: number) => void;
  addContentToFolder: (folderId: number, content: ContentInterface) => void;
  removeContentFromFolder: (folderId: number, contentId: number) => void;
}

const useFolderStore = create<FolderStore>((set) => ({
  folders: [],

  addFolder: (folder) =>
    set((state) => ({
      folders: [...state.folders, folder],
    })),

  updateFolder: (folderId, updatedFolder) =>
    set((state) => ({
      folders: state.folders.map((folder) =>
        folder.id === folderId ? { ...folder, ...updatedFolder } : folder
      ),
    })),

  deleteFolder: (folderId) =>
    set((state) => ({
      folders: state.folders.filter((folder) => folder.id !== folderId),
    })),

  addContentToFolder: (folderId, content) =>
    set((state) => ({
      folders: state.folders.map((folder) =>
        folder.id === folderId
          ? { ...folder, content: [...folder.content, content] }
          : folder
      ),
    })),

  removeContentFromFolder: (folderId, contentId) =>
    set((state) => ({
      folders: state.folders.map((folder) =>
        folder.id === folderId
          ? {
              ...folder,
              content: folder.content.filter(
                (content) => content.id !== contentId
              ),
            }
          : folder
      ),
    })),
}));

export default useFolderStore;
