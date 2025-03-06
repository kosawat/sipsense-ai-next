import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    const correctPassword = process.env.APP_PASSWORD;

    if (password === correctPassword) {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ success: false }, { status: 401 });
  } catch (error) {
    console.log("Authentication Error", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
