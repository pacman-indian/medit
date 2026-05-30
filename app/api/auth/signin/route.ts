import { MOCK_USERS } from "@/lib/auth";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json() as { email: string; password: string };

  const entry = MOCK_USERS[email?.toLowerCase()?.trim()];
  if (!entry || entry.password !== password) {
    return Response.json({ error: "Invalid email or password." }, { status: 401 });
  }

  return Response.json({ user: entry.user });
}
