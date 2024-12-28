import prisma from "@/lib/prisma";
import getUserSession from "@/util/getUserData";
import folderSchema from "@/validation/folder-schema";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
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

    const allFolders = await prisma.folder.findMany({
      where: {
        userId: session.user.id,
      },
    });

    return NextResponse.json(
      {
        data: allFolders,
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    return NextResponse.json(
      {
        errMessage: `${err}`,
      },
      {
        status: 500,
      }
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const session = await getUserSession();
    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "you are not authorized",
          error: "authentication",
          data: null,
        },
        { status: 400 }
      );
    }
    const body = await req.json();

    const isValidated = folderSchema.safeParse(body);

    if (!isValidated.success) {
      return NextResponse.json(
        {
          errMessage: isValidated.error.message,
        },
        { status: 411 }
      );
    }

    const newFolder = await prisma.folder.create({
      data: {
        name: body.name as string,
        userId: session.user.id,
      },
    });

    return NextResponse.json(
      {
        data: newFolder,
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    return NextResponse.json(
      {
        errorMessage: err,
      },
      { status: 500 }
    );
  }
};
