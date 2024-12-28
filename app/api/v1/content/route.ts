import prisma from "@/lib/prisma";
import getUserSession from "@/util/getUserData";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    const session = await getUserSession();
    if (!session) {
      return NextResponse.json({
        success: false,
        message: "you are not authorized",
        error: "authentication",
        data: null,
      });
    }

    const allContents = await prisma.content.findMany({
      where: {
        userId: session.user.id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "data fetched successfully",
      error: null,
      data: allContents,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "unknown error happened",
      error: error,
      data: null,
    });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const session = await getUserSession();
    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "you are not authorized",
          error: "authentication",
          data: null,
        },
        {
          status: 400,
        }
      );
    }

    const createdContent = await prisma.content.create({
      data: {
        title: body.title,
        link: body.link,
        description: body.description,
        type: body.type,
        tags: body.tags,
        userId: session?.user?.id,
        folderId: body.folderId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "successfully created a content",
      error: null,
      data: createdContent,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "unknown error happened",
        error: error,
        data: null,
      },
      { status: 500 }
    );
  }
};
