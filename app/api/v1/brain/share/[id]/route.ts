import prisma from "@/lib/prisma";
import getUserSession from "@/util/getUserData";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const hash_param = params?.id;

    if (!hash_param) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide the hash.",
        },
        { status: 400 }
      );
    }

    const session = await getUserSession();

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "You are not authorized.",
          error: "authentication",
          data: null,
        },
        { status: 401 }
      );
    }

    const link = await prisma.link.findFirst({
      where: { hash: hash_param, userId: session.user.id },
    });

    if (!link || !link.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: "Link not found, incorrect hash, or the link is disabled.",
        },
        { status: 404 }
      );
    }

    const content = await prisma.content.findMany({
      where: { userId: link.userId },
    });

    if (!content || content.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No content found for this user.",
          data: [],
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Content retrieved successfully.",
      data: content,
    });
  } catch (error) {
    console.error("Error in GET handler:", error);

    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred.",
        error: error instanceof Error ? error.message : "unknown_error",
        data: null,
      },
      { status: 500 }
    );
  }
};
