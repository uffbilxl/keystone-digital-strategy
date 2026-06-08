import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

export interface ClientAccount {
  id: string;
  clientName: string;
  email: string;
  password: string;
  notes: string;
  createdAt: string;
}

const DIR  = process.env.VERCEL ? "/tmp" : join(process.cwd(), "data");
const FILE = join(DIR, "ks-clients.json");

export function readClientAccounts(): ClientAccount[] {
  if (!existsSync(FILE)) return [];
  try {
    return JSON.parse(readFileSync(FILE, "utf-8"));
  } catch {
    return [];
  }
}

export function writeClientAccounts(data: ClientAccount[]): void {
  if (!process.env.VERCEL) {
    mkdirSync(DIR, { recursive: true });
  }
  writeFileSync(FILE, JSON.stringify(data, null, 2));
}
