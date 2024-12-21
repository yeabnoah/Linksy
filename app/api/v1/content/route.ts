import { NextRequest, NextResponse } from "next/server";

export const GET = () => {
  return NextResponse.json({
    message: "hello backend server",
  });
};

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  return NextResponse.json(body);
};
