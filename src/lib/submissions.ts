// Submission store — zero configuration required.
//
// • Vercel production: writes to /tmp/ks-submissions.json
//   /tmp is writable on every serverless function instance.
//   Persists while the function is warm (typically hours/days).
//
// • Local dev: writes to data/submissions.json in the project root.

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import type { Submission } from "./submission-types";

// /tmp is writable on Vercel; use local data/ in dev
const DIR  = process.env.VERCEL ? "/tmp" : join(process.cwd(), "data");
const FILE = join(DIR, "ks-submissions.json");

export function readSubmissions(): Submission[] {
  if (!existsSync(FILE)) return [];
  try {
    return JSON.parse(readFileSync(FILE, "utf-8"));
  } catch {
    return [];
  }
}

export function writeSubmissions(data: Submission[]): void {
  if (!process.env.VERCEL) {
    mkdirSync(DIR, { recursive: true });
  }
  writeFileSync(FILE, JSON.stringify(data, null, 2));
}
