import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ completed: false, authenticated: false });
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("onboarding_completed")
      .eq("id", user.id)
      .single();

    return NextResponse.json({
      completed: profile?.onboarding_completed ?? false,
      authenticated: true,
    });
  } catch {
    return NextResponse.json({ completed: false, authenticated: false });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { completed } = await request.json();
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ success: true, stored: "local" });
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        onboarding_completed: completed,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, stored: "database" });
  } catch {
    return NextResponse.json({ success: true, stored: "local" });
  }
}
