import prisma from "@/lib/prisma";
import getUserSession from "@/util/getUserData";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
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

    const content = await prisma.content.findUnique({
      where: { id: id, userId: session.user.id },
    });

    if (!content) {
      return NextResponse.json({
        success: false,
        message: "Content not found",
        error: "not_found",
        data: null,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Content fetched successfully",
      error: null,
      data: content,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "An error occurred while fetching content",
      error: error,
      data: null,
    });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getUserSession();
    const id = Number(params.id);
    const body = await req.json();

    if (!session) {
      return NextResponse.json({
        success: false,
        message: "You are not authorized",
        error: "authentication",
        data: null,
      });
    }

    const updatedContent = await prisma.content.update({
      where: { id: id, userId: session.user.id },
      data: body,
    });

    return NextResponse.json({
      success: true,
      message: "Content updated successfully",
      error: null,
      data: updatedContent,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "An error occurred while updating content",
      error: error,
      data: null,
    });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getUserSession();
    const id = Number(params.id);

    if (!session) {
      return NextResponse.json({
        success: false,
        message: "You are not authorized",
        error: "authentication",
        data: null,
      });
    }

    const deletedContent = await prisma.content.delete({
      where: {
        id,
        userId: session.user.id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Content deleted successfully",
      error: null,
      data: deletedContent,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "An error occurred while deleting content",
      error: error,
      data: null,
    });
  }
}
