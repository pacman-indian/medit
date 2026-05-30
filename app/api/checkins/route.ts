import { CHECKINS, GYMS } from "@/lib/data";
import type { CheckIn } from "@/lib/types";
import { NextRequest } from "next/server";

// In-memory store for new check-ins during the session
const sessionCheckins: CheckIn[] = [];

export async function GET(req: NextRequest) {
  const gymId = req.nextUrl.searchParams.get("gymId");
  const userId = req.nextUrl.searchParams.get("userId");

  let results = [...CHECKINS, ...sessionCheckins];
  if (gymId) results = results.filter((c) => c.gymId === Number(gymId));
  if (userId) results = results.filter((c) => c.userId === userId);

  return Response.json(results.sort((a, b) => b.timestamp.localeCompare(a.timestamp)));
}

export async function POST(req: NextRequest) {
  const body = await req.json() as { gymId: number; userId: string; method: "qr" | "geo"; lat?: number; lng?: number };
  const { gymId, userId, method, lat, lng } = body;

  const gym = GYMS.find((g) => g.id === gymId);
  if (!gym) return Response.json({ error: "Gym not found" }, { status: 404 });

  // Geo verification: must be within 200 metres of gym
  if (method === "geo") {
    if (lat === undefined || lng === undefined) {
      return Response.json({ error: "Location required for geo check-in" }, { status: 400 });
    }
    const dist = haversineMetres(lat, lng, gym.lat, gym.lng);
    if (dist > 200) {
      return Response.json(
        { error: `You are ${Math.round(dist)}m away. Must be within 200m of the gym.` },
        { status: 403 }
      );
    }
  }

  const today = new Date().toISOString().split("T")[0];
  const alreadyCheckedIn = [...CHECKINS, ...sessionCheckins].some(
    (c) => c.userId === userId && c.gymId === gymId && c.date === today && c.verified
  );
  if (alreadyCheckedIn) {
    return Response.json({ error: "Already checked in at this gym today" }, { status: 409 });
  }

  const checkin: CheckIn = {
    id: `ci-${Date.now()}`,
    userId,
    gymId,
    gymName: gym.name,
    date: today,
    timestamp: new Date().toISOString(),
    method,
    verified: true,
  };

  sessionCheckins.push(checkin);
  return Response.json({ success: true, checkin }, { status: 201 });
}

function haversineMetres(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371000;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function toRad(deg: number) { return (deg * Math.PI) / 180; }
