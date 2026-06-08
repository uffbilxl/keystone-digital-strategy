import { NextRequest, NextResponse } from "next/server";
import { readClientAccounts, writeClientAccounts, type ClientAccount } from "@/lib/client-accounts";
import { randomUUID } from "crypto";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "keystoneadmin1";

function auth(req: NextRequest) {
  return req.headers.get("x-admin-password") === ADMIN_PASSWORD;
}

export async function GET(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  return NextResponse.json({ clients: await readClientAccounts() });
}

export async function POST(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  const { clientName, email, password, notes } = await req.json();
  const newClient: ClientAccount = {
    id: randomUUID(),
    clientName,
    email,
    password,
    notes: notes ?? "",
    createdAt: new Date().toISOString(),
  };
  await writeClientAccounts([...await readClientAccounts(), newClient]);
  return NextResponse.json({ client: newClient });
}

export async function PATCH(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  const { id, ...updates } = await req.json();
  await writeClientAccounts((await readClientAccounts()).map((c) => (c.id === id ? { ...c, ...updates } : c)));
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  const { id } = await req.json();
  await writeClientAccounts((await readClientAccounts()).filter((c) => c.id !== id));
  return NextResponse.json({ success: true });
}
