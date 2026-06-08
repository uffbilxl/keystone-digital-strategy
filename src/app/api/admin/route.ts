import { NextRequest, NextResponse } from "next/server";
import { readSubmissions, writeSubmissions } from "@/lib/submissions";
import type { Submission } from "@/lib/submission-types";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "keystoneadmin1";

function auth(req: NextRequest) {
  return req.headers.get("x-admin-password") === ADMIN_PASSWORD;
}

export async function GET(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  return NextResponse.json({ submissions: await readSubmissions() });
}

export async function PATCH(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  const { id, read } = await req.json();
  const submissions = await readSubmissions() as Submission[];
  await writeSubmissions(submissions.map((s) => (s.id === id ? { ...s, read } : s)));
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  const { id } = await req.json();
  await writeSubmissions((await readSubmissions() as Submission[]).filter((s) => s.id !== id));
  return NextResponse.json({ success: true });
}
