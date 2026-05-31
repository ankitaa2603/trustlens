import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: "Message received" });
  } catch {
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
