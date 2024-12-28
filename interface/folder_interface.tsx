import { ContentInterface } from "@/validation/contentSchema";

interface folderInterface {
  id: number;
  name: string;
  userId: string;
  content: ContentInterface[];
}

export default folderInterface;
