import prisma from "@/lib/prisma";
import getUserSession from "@/util/getUserData";
import { NextResponse } from "next/server";

export const GET = async ({ params }: { params: { id: string } }) => {
  const hash_param = params?.id;
  if (!hash_param) {
    return NextResponse.json({
      success: false,
      message: "Please provide the hash",
    });
  }

  const session = await getUserSession();
  if (!session) {
    return NextResponse.json({
      success: false,
      message: "You are not authorized",
      error: "authentication",
      data: null,
    });
  }

  const link = await prisma.link.findFirst({
    where: { hash: hash_param as string },
    include: {
      user: true,
    },
  });

  if (!link) {
    return NextResponse.json({
      success: false,
      message: "Link not found or incorrect hash",
    });
  }

  const content = await prisma.content.findMany({
    where: { userId: link.userId },
  });

  if (!content || content.length === 0) {
    return NextResponse.json({
      success: false,
      message: "No content found for this user",
    });
  }

  return NextResponse.json({
    success: true,
    username: link.user.name,
    content,
  });
};
