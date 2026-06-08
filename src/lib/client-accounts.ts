export interface ClientAccount {
  id: string;
  clientName: string;
  email: string;
  password: string;
  notes: string;
  createdAt: string;
}

const KV_KEY = "ks-clients";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getKV(): Promise<any> {
  const { kv } = await import("@vercel/kv");
  return kv;
}

export async function readClientAccounts(): Promise<ClientAccount[]> {
  try {
    const kv = await getKV();
    return ((await kv.get(KV_KEY)) as ClientAccount[] | null) ?? [];
  } catch {
    return [];
  }
}

export async function writeClientAccounts(data: ClientAccount[]): Promise<void> {
  const kv = await getKV();
  await kv.set(KV_KEY, data);
}
