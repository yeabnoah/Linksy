import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const hash = params.id;

  if (!hash) {
    return NextResponse.json(
      {
        errorMessage: "Invalid or missing hash",
      },
      { status: 400 }
    );
  }

  try {
    const folderHash = await prisma.folderLink.findFirst({
      where: {
        hash: hash,
      },
    });

    if (!folderHash || null) {
      return NextResponse.json(
        {
          errorMessage: "Invalid hash or user didn't allow sharing",
        },
        { status: 404 }
      );
    }

    if (folderHash) {
      const isAllowed = folderHash.allowed;

      if (!isAllowed) {
        return NextResponse.json(
          {
            errorMessage: "Invalid hash or user didn't allow sharing",
          },
          { status: 404 }
        );
      }

      const folder = await prisma.folder.findUnique({
        where: {
          id: folderHash.folderId,
        },
        include: {
          content: true,
        },
      });

      return NextResponse.json(
        {
          data: folder,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error fetching folder:", error);
    return NextResponse.json(
      {
        errorMessage: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
