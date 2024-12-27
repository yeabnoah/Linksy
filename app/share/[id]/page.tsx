"use client";

import { NoteCardTrash } from "@/components/note-card-public";
import axios from "axios";
import { useEffect, useState } from "react";

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

const ShareComponent = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const [dataFetched, setDataFetched] = useState<Post[]>();

  const fetchDatas = async () => {
    try {
      const response = await axios.get<ApiResponse<Post[]>>(
        `/api/v1/brain/share/${id}`
      );

      setDataFetched(response.data.data);
      console.log(response.data.data); // now typescript knows that data is an array of Post
      console.log("clicked");
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchDatas();
  }, []);

  return (
    <div className=" mx-auto w-full  min-h-screen bg-white">
      <h1 className=" text-center py-5 text-black  text-4xl font-medium">
        Bookmark
      </h1>
      <hr className=" hidden md:block" />
      <div className=" flex w-[90%] md:max-w-6xl mx-auto justify-center flex-wrap gap-5 mt-5">
        {dataFetched?.map((each) => {
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
