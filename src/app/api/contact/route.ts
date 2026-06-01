import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const DATA_DIR = join(process.cwd(), "data");
const FILE = join(DATA_DIR, "submissions.json");

function readSubmissions() {
  if (!existsSync(FILE)) {
    mkdirSync(DATA_DIR, { recursive: true });
    writeFileSync(FILE, "[]");
    return [];
  }
  try {
    return JSON.parse(readFileSync(FILE, "utf-8"));
  } catch {
    return [];
  }
}

function writeSubmissions(data: unknown[]) {
  mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(FILE, JSON.stringify(data, null, 2));
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, company, email, challenge } = body;

    if (!name || !email || !challenge) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const submissions = readSubmissions();
    const entry = {
      id: Date.now().toString(),
      name,
      company: company || "",
      email,
      challenge,
      receivedAt: new Date().toISOString(),
      read: false,
    };

    submissions.unshift(entry);
    writeSubmissions(submissions);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
