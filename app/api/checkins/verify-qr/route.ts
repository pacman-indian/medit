import { GYMS } from "@/lib/data";
import { NextRequest } from "next/server";
import type { QRPayload } from "@/lib/types";

// Shared in-memory QR registry (keyed by code)
const qrRegistry = new Map<string, QRPayload>();

export async function POST(req: NextRequest) {
  const body = await req.json() as { action: "generate" | "verify"; gymId?: number; userId?: string; code?: string };

  if (body.action === "generate") {
    const { gymId, userId } = body;
    if (!gymId || !userId) return Response.json({ error: "gymId and userId required" }, { status: 400 });

    const gym = GYMS.find((g) => g.id === gymId);
    if (!gym) return Response.json({ error: "Gym not found" }, { status: 404 });

    // Code expires in 5 minutes
    const code = generateCode(userId, gymId);
    const payload: QRPayload = { code, gymId, userId, expiresAt: Date.now() + 5 * 60 * 1000 };
    qrRegistry.set(code, payload);

    return Response.json({ code, expiresAt: payload.expiresAt, gymName: gym.name });
  }

  if (body.action === "verify") {
    const { code } = body;
    if (!code) return Response.json({ error: "code required" }, { status: 400 });

    const payload = qrRegistry.get(code);
    if (!payload) return Response.json({ error: "Invalid QR code" }, { status: 404 });
    if (Date.now() > payload.expiresAt) {
      qrRegistry.delete(code);
      return Response.json({ error: "QR code expired" }, { status: 410 });
    }

    qrRegistry.delete(code); // single-use
    return Response.json({ success: true, gymId: payload.gymId, userId: payload.userId });
  }

  return Response.json({ error: "Invalid action" }, { status: 400 });
}

function generateCode(userId: string, gymId: number): string {
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `MED-${gymId}-${rand}`;
}
