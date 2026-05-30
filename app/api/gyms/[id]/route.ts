import { GYMS, CHECKINS } from "@/lib/data";
import { NextRequest } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const gym = GYMS.find((g) => g.id === Number(id));
  if (!gym) return Response.json({ error: "Gym not found" }, { status: 404 });

  const visitCount = CHECKINS.filter((c) => c.gymId === gym.id && c.verified).length;
  return Response.json({ ...gym, visitCount });
}
