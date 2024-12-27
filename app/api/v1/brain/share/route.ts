import prisma from "@/lib/prisma";
import getUserSession from "@/util/getUserData";
import { random } from "@/util/random-hash-generator";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const shareApproved: boolean = await req.json();
  const session = await getUserSession();

  if (!session) {
    return NextResponse.json({
      success: false,
      message: "you are not authorized",
      error: "authentication",
      data: null,
    });
  }

  if (shareApproved) {
    const existingLink = await prisma.link.findUnique({
      where: {
        userId: session?.user.id,
      },
    });

    if (existingLink) {
      return NextResponse.json({
        hash: existingLink.hash,
      });
    }

    const hash = random(20);
    const newLink = await prisma.link.create({
      data: {
        userId: session?.user.id,
        hash: hash,
      },
    });

    return NextResponse.json({
      hash: newLink,
    });
  } else {
    const deleteLink = await prisma.link.delete({
      where: {
        userId: session?.user.id,
      },
    });

    return NextResponse.json({
      message: "Removed link",
      data: deleteLink,
    });
  }
};

export const GET = async () => {
  const session = await getUserSession();

  if (!session) {
    return NextResponse.json({
      success: false,
      message: "you are not authorized",
      error: "authentication",
      data: null,
    });
  }

  const link = await prisma.link.findFirst({
    where: {
      userId: session.user.id,
    },
  });

  if (!link?.allowed) {
    return NextResponse.json({
      data: link,
      allowed: false,
    });
  }

  return NextResponse.json({
    data: link,
    allowed: true,
  });
};
