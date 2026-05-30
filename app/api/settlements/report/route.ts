import { CHECKINS, SUBSCRIPTIONS, PAST_SETTLEMENT } from "@/lib/data";
import { calculateSettlement } from "@/lib/settlement";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const month = req.nextUrl.searchParams.get("month") ?? new Date().toISOString().slice(0, 7);
  const gymId = req.nextUrl.searchParams.get("gymId");

  // Current month — calculate live; past months return stored data
  let settlement = month === "2026-04" ? PAST_SETTLEMENT : calculateSettlement(month, CHECKINS, SUBSCRIPTIONS);

  if (gymId) {
    const entry = settlement.entries.find((e) => e.gymId === Number(gymId));
    return Response.json({
      billingMonth: settlement.billingMonth,
      billingDays: settlement.billingDays,
      status: settlement.status,
      processedAt: settlement.processedAt,
      entry: entry ?? null,
    });
  }

  return Response.json(settlement);
}
