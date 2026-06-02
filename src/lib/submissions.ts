// Unified submission store.
// • Production (Vercel KV env vars present): stores in Redis KV — persists forever.
// • Development / no KV vars: falls back to data/submissions.json on disk.

import type { Submission } from "./submission-types";

const KV_KEY = "ks:submissions";
const isKV = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

// ─── KV helpers ───────────────────────────────────────────────────────────────
async function kvRead(): Promise<Submission[]> {
  const { kv } = await import("@vercel/kv");
  const data = await kv.get<Submission[]>(KV_KEY);
  return data ?? [];
}

async function kvWrite(data: Submission[]): Promise<void> {
  const { kv } = await import("@vercel/kv");
  await kv.set(KV_KEY, data);
}

// ─── File helpers (dev / no-KV fallback) ──────────────────────────────────────
function fileRead(): Submission[] {
  const { readFileSync, existsSync, mkdirSync, writeFileSync } = require("fs") as typeof import("fs");
  const { join } = require("path") as typeof import("path");
  const dir = join(process.cwd(), "data");
  const file = join(dir, "submissions.json");
  if (!existsSync(file)) {
    mkdirSync(dir, { recursive: true });
    writeFileSync(file, "[]");
    return [];
  }
  try { return JSON.parse(readFileSync(file, "utf-8")); } catch { return []; }
}

function fileWrite(data: Submission[]): void {
  const { writeFileSync, mkdirSync } = require("fs") as typeof import("fs");
  const { join } = require("path") as typeof import("path");
  const dir = join(process.cwd(), "data");
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "submissions.json"), JSON.stringify(data, null, 2));
}

// ─── Public API ───────────────────────────────────────────────────────────────
export async function readSubmissions(): Promise<Submission[]> {
  if (isKV) return kvRead();
  return fileRead();
}

export async function writeSubmissions(data: Submission[]): Promise<void> {
  if (isKV) return kvWrite(data);
  fileWrite(data);
}
