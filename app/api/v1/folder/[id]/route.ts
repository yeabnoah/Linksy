import prisma from "@/lib/prisma";
import getUserSession from "@/util/getUserData";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);

    const session = await getUserSession();
    if (!session) {
      return NextResponse.json({
        success: false,
        message: "You are not authorized",
        error: "authentication",
        data: null,
      });
    }

    if (!id) {
      return NextResponse.json(
        {
          errMessage: "id not given",
        },
        { status: 410 }
      );
    }

    const updateComing = await req.json();

    const updateFolder = await prisma.folder.update({
      where: {
        userId: session.user.id,
        id: id,
      },
      data: updateComing,
    });

    return NextResponse.json(
      {
        data: updateFolder,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        errMessage: err,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);

    if (!id) {
      return NextResponse.json(
        {
          errMessage: "id not given",
        },
        { status: 410 }
      );
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

    const isDeleted = await prisma.folder.delete({
      where: {
        userId: session.user.id,
        id: id,
      },
    });

    return NextResponse.json({
      date: isDeleted,
    });
  } catch (err) {
    return NextResponse.json(
      {
        errMessage: err,
      },
      { status: 500 }
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    const session = await getUserSession();

    if (!id) {
      return NextResponse.json(
        {
          errMessage: "id not given",
        },
        { status: 410 }
      );
    }

    if (!session) {
      return NextResponse.json({
        success: false,
        message: "You are not authorized",
        error: "authentication",
        data: null,
      });
    }

    const folderInfo = await prisma.folder.findUnique({
      where: {
        userId: session?.user.id,
        id: id,
      },
      include: {
        content: true,
      },
    });

    return NextResponse.json({
      data: folderInfo,
    });
  } catch (err) {
    return NextResponse.json(
      {
        errMessage: err,
      },
      { status: 500 }
    );
  }
}
