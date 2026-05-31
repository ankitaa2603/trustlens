import { NextRequest, NextResponse } from "next/server";
import { chatWithLexi, getGeminiApiKey } from "@/lib/gemini";

export async function POST(request: NextRequest) {
  try {
    const { message, context } = await request.json();

    if (!message?.trim()) {
      return NextResponse.json({ error: "Message required" }, { status: 400 });
    }

    const hasKey = Boolean(getGeminiApiKey());
    if (!hasKey) {
      console.error("[Lexi API] GEMINI_API_KEY is not set in .env.local");
      return NextResponse.json(
        {
          response:
            "Lexi is not connected to Gemini yet. Add GEMINI_API_KEY to your .env.local file and restart `npm run dev`.",
          source: "fallback",
        },
        { status: 200 }
      );
    }

    const response = await chatWithLexi(message.trim(), context || "default");
    console.log("[Lexi API] Gemini response OK, length:", response.length);

    return NextResponse.json({ response, source: "gemini" });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : "Unknown error";
    console.error("[Lexi API] Error:", errMsg, error);

    return NextResponse.json(
      {
        error: errMsg,
        response: `I couldn't reach Gemini right now (${errMsg}). Please check your API key in .env.local and restart the server.`,
        source: "error",
      },
      { status: 500 }
    );
  }
}
