import prisma from "@/lib/prisma";
import getUserSession from "@/util/getUserData";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const folderId = url.searchParams.get("folderId");

  if (!folderId) {
    return NextResponse.json(
      {
        message: "Folder ID is required and sharing is not allowed",
      },
      { status: 400 }
    );
  }

  const folderShare = await prisma.folderLink.findUnique({
    where: {
      folderId: parseInt(folderId, 10),
    },
  });

  if (!folderShare) {
    return NextResponse.json(
      {
        message: "No folder link found or sharing is not allowed",
      },
      { status: 404 }
    );
  }

  return NextResponse.json(
    {
      data: folderShare,
      success: true,
    },
    { status: 200 }
  );
}

export async function POST(req: NextRequest) {
  const { id, share }: { id: number; share: boolean } = await req.json();

  const session = await getUserSession();
  if (!session) {
    return NextResponse.json(
      {
        success: false,
        message: "You are not authorized",
        error: "authentication",
        data: null,
      },
      { status: 400 }
    );
  }

  if (!id || !share) {
    return NextResponse.json(
      {
        success: false,
        message: "please provide all the necessary parameters",
        error: "param",
        data: null,
      },
      { status: 403 }
    );
  }

  const folder = await prisma.folder.findUnique({
    where: {
      id: id,
      userId: session.user.id,
    },

    include: {
      folderLink: true,
    },
  });

  if (!folder) {
    return NextResponse.json(
      {
        success: false,
        message: "no folder found with the given id",
        error: "id: param",
        data: null,
      },
      { status: 404 }
    );
  }

  if (!folder.folderLink) {
    const newFolderLink = prisma.folderLink.create({
      data: {
        hash: "",
        allowed: share,
        folderId: id,
      },
    });

    return NextResponse.json({
      data: newFolderLink,
    });
  }

  const updateFolderLink = prisma.folderLink.update({
    where: {
      folderId: id,
    },
    data: {
      allowed: share,
    },
  });

  return NextResponse.json({
    data: updateFolderLink,
  });
}
