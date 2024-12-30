import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (req: NextRequest) => {
  const query = req.nextUrl.searchParams.get("query");

  if (!query || typeof query !== "string") {
    return NextResponse.json(
      { message: "Query parameter is required." },
      { status: 400 }
    );
  }

  try {
    const content = await prisma.content.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            tags: {
              has: query,
            },
          },
        ],
      },
      include: {
        folder: true,
      },
    });

    return NextResponse.json(content, { status: 200 });
  } catch (error) {
    console.error("Error searching content:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
