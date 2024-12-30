import prisma from "@/lib/prisma";
import getUserSession from "@/util/getUserData";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const folderId = url.searchParams.get("folderId");

    if (!folderId || isNaN(parseInt(folderId, 10))) {
      return NextResponse.json(
        { message: "Valid folder ID is required" },
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
        { message: "No folder link found or sharing is not allowed" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { data: folderShare, success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error: error },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { id, share }: { id: number; share: boolean } = await req.json();

    if (!id || typeof share !== "boolean") {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid ID and sharing status",
          error: "param",
          data: null,
        },
        { status: 400 }
      );
    }

    const session = await getUserSession();
    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
          error: "authentication",
          data: null,
        },
        { status: 401 }
      );
    }

    const folder = await prisma.folder.findUnique({
      where: {
        id,
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
          message: "Folder not found",
          error: "id: param",
          data: null,
        },
        { status: 404 }
      );
    }

    if (!folder.folderLink) {
      const newFolderLink = await prisma.folderLink.create({
        data: {
          hash: crypto.randomUUID(),
          allowed: share,
          folderId: id,
        },
      });

      return NextResponse.json({ data: newFolderLink });
    }

    const updatedFolderLink = await prisma.folderLink.update({
      where: { folderId: id },
      data: { allowed: share },
    });

    return NextResponse.json({ data: updatedFolderLink });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Something went wrong", error: error },
      { status: 500 }
    );
  }
}
