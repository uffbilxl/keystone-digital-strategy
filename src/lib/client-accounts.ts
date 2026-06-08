import { Redis } from "@upstash/redis";

export interface ClientAccount {
  id: string;
  clientName: string;
  email: string;
  password: string;
  notes: string;
  createdAt: string;
}

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const KEY = "ks-clients";

export async function readClientAccounts(): Promise<ClientAccount[]> {
  try {
    return ((await redis.get(KEY)) as ClientAccount[] | null) ?? [];
  } catch {
    return [];
  }
}

export async function writeClientAccounts(data: ClientAccount[]): Promise<void> {
  await redis.set(KEY, data);
}
