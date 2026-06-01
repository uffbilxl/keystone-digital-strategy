import { NextRequest, NextResponse } from "next/server";
import { readFileSync, existsSync, writeFileSync } from "fs";
import { join } from "path";

const ADMIN_PASSWORD = "keystoneadmin1";
const FILE = join(process.cwd(), "data", "submissions.json");

function readSubmissions() {
  if (!existsSync(FILE)) return [];
  try {
    return JSON.parse(readFileSync(FILE, "utf-8"));
  } catch {
    return [];
  }
}

function writeSubmissions(data: unknown[]) {
  writeFileSync(FILE, JSON.stringify(data, null, 2));
}

export async function GET(req: NextRequest) {
  const pw = req.headers.get("x-admin-password");
  if (pw !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }
  return NextResponse.json({ submissions: readSubmissions() });
}

export async function PATCH(req: NextRequest) {
  const pw = req.headers.get("x-admin-password");
  if (pw !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }
  const { id, read } = await req.json();
  const submissions = readSubmissions() as { id: string; read: boolean }[];
  const updated = submissions.map((s) => (s.id === id ? { ...s, read } : s));
  writeSubmissions(updated);
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const pw = req.headers.get("x-admin-password");
  if (pw !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }
  const { id } = await req.json();
  const submissions = readSubmissions() as { id: string }[];
  writeSubmissions(submissions.filter((s) => s.id !== id));
  return NextResponse.json({ success: true });
}
