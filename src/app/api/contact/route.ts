import { NextRequest, NextResponse } from "next/server";
import { readSubmissions, writeSubmissions } from "@/lib/submissions";
import type { Submission } from "@/lib/submission-types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, company, email, challenge } = body;

    if (!name || !email || !challenge) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const submissions = await readSubmissions();
    const entry: Submission = {
      id: Date.now().toString(),
      name,
      company: company || "",
      email,
      challenge,
      receivedAt: new Date().toISOString(),
      read: false,
    };

    submissions.unshift(entry);
    await writeSubmissions(submissions);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] save error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
