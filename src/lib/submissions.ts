import { Redis } from "@upstash/redis";
import type { Submission } from "./submission-types";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const KEY = "ks-submissions";

export async function readSubmissions(): Promise<Submission[]> {
  try {
    return ((await redis.get(KEY)) as Submission[] | null) ?? [];
  } catch {
    return [];
  }
}

export async function writeSubmissions(data: Submission[]): Promise<void> {
  await redis.set(KEY, data);
}
