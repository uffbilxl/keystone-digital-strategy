import type { Submission } from "./submission-types";

const KV_KEY = "ks-submissions";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getKV(): Promise<any> {
  const { kv } = await import("@vercel/kv");
  return kv;
}

export async function readSubmissions(): Promise<Submission[]> {
  try {
    const kv = await getKV();
    return ((await kv.get(KV_KEY)) as Submission[] | null) ?? [];
  } catch {
    return [];
  }
}

export async function writeSubmissions(data: Submission[]): Promise<void> {
  const kv = await getKV();
  await kv.set(KV_KEY, data);
}
