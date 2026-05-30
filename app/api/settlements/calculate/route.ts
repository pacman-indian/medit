import { CHECKINS, SUBSCRIPTIONS } from "@/lib/data";
import { calculateSettlement } from "@/lib/settlement";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json() as { billingMonth?: string };
  const billingMonth = body.billingMonth ?? new Date().toISOString().slice(0, 7);

  const result = calculateSettlement(billingMonth, CHECKINS, SUBSCRIPTIONS);
  return Response.json(result);
}
