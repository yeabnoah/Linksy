"use client";

import { NoteCardTrash } from "@/components/note-card-public";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface Post {
  id: number;
  title: string;
  link: string;
  description: string;
  type: "youtube" | "telegram";
  tags: string[];
  userId: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

const fetchPosts = async (id: string) => {
  const response = await axios.get<ApiResponse<Post[]>>(
    `/api/v1/brain/share/${id}`
  );
  return response.data.data;
};

const ShareComponent = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const { data, error, isLoading } = useQuery({
    queryKey: ["sharePosts", id],
    queryFn: () => fetchPosts(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className=" bg-white min-h-screen flex items-center w-full justify-center">
        Loading...
      </div>
    );
  }

  if (error instanceof Error) {
    return (
      <div className=" bg-white min-h-screen flex items-center w-full justify-center">
        <h1 className=" text-2xl font-bold">
          permission Disabled or wrong access link
        </h1>
      </div>
    );
  }

  return (
    <div className=" mx-auto w-full min-h-screen bg-white">
      <h1 className=" text-center py-5 text-black text-4xl font-medium">
        Bookmark
      </h1>
      <hr className=" hidden md:block" />
      <div className=" flex w-[90%] md:max-w-6xl mx-auto justify-center flex-wrap gap-5 mt-5">
        {data?.map((each) => {
          return (
            <NoteCardTrash
              type={each.type}
              id={each.id}
              key={each.id}
              description={each.description}
              tags={each.tags}
              title={each.title}
              link={each.link}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ShareComponent;
