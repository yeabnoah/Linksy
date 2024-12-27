import prisma from "@/lib/prisma";
import getUserSession from "@/util/getUserData";
import { random } from "@/util/random-hash-generator";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const shareApproved: boolean = body?.shareApproved;

    if (typeof shareApproved !== "boolean") {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid input. 'shareApproved' must be a boolean.",
          error: "invalid_input",
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
          message: "You are not authorized.",
          error: "authentication",
          data: null,
        },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    if (shareApproved) {
      let link = await prisma.link.findUnique({ where: { userId } });

      if (link) {
        if (!link.allowed) {
          link = await prisma.link.update({
            where: { userId },
            data: {
              allowed: true,
              hash: random(20),
            },
          });
        }
      } else {
        link = await prisma.link.create({
          data: {
            hash: random(20),
            userId,
            allowed: true,
          },
        });
      }

      return NextResponse.json({
        success: true,
        message: "Link updated successfully.",
        data: link,
      });
    } else {
      await prisma.link.update({
        where: { userId },
        data: { allowed: false },
      });

      return NextResponse.json({
        success: true,
        message: "Link disabled successfully.",
      });
    }
  } catch (error) {
    console.error("Error in POST handler:", error);

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

export const GET = async () => {
  try {
    const session = await getUserSession();

    // Check for valid session
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

    const link = await prisma.link.findUnique({
      where: { userId: session.user.id },
    });

    // Handle cases where no link is found
    if (!link) {
      return NextResponse.json({
        success: true,
        message: "No link found for the user.",
        data: null,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Link retrieved successfully.",
      data: link,
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
