import type { CheckIn, Subscription, Settlement, SettlementEntry } from "./types";
import { GYMS } from "./data";

export function calculateSettlement(
  billingMonth: string, // "YYYY-MM"
  checkins: CheckIn[],
  subscriptions: Subscription[]
): Settlement {
  const [year, month] = billingMonth.split("-").map(Number);
  const billingDays = new Date(year, month, 0).getDate(); // days in month

  const activeSubscriptions = subscriptions.filter((s) => s.active);
  const totalRevenue = activeSubscriptions.reduce((sum, s) => sum + s.amount, 0);

  // Group check-ins by userId → unique visit-days per gym
  const userGymDays: Record<string, Record<number, Set<string>>> = {};
  for (const ci of checkins) {
    if (!ci.verified) continue;
    if (!userGymDays[ci.userId]) userGymDays[ci.userId] = {};
    if (!userGymDays[ci.userId][ci.gymId]) userGymDays[ci.userId][ci.gymId] = new Set();
    userGymDays[ci.userId][ci.gymId].add(ci.date);
  }

  // For each subscription, calculate how much goes to each gym
  const gymRevenue: Record<number, number> = {};
  const gymVisitDays: Record<number, number> = {};
  const gymSubscribers: Record<number, Set<string>> = {};

  for (const sub of activeSubscriptions) {
    const gymDays = userGymDays[sub.userId] ?? {};

    for (const [gymIdStr, daysSet] of Object.entries(gymDays)) {
      const gymId = Number(gymIdStr);
      const days = daysSet.size;
      const share = days / billingDays;
      const earned = share * sub.amount;

      gymRevenue[gymId] = (gymRevenue[gymId] ?? 0) + earned;
      gymVisitDays[gymId] = (gymVisitDays[gymId] ?? 0) + days;
      if (!gymSubscribers[gymId]) gymSubscribers[gymId] = new Set();
      gymSubscribers[gymId].add(sub.userId);
    }
  }

  const entries: SettlementEntry[] = Object.entries(gymRevenue).map(([gymIdStr, rev]) => {
    const gymId = Number(gymIdStr);
    const gym = GYMS.find((g) => g.id === gymId);
    const visitDays = gymVisitDays[gymId] ?? 0;
    return {
      gymId,
      gymName: gym?.name ?? `Gym #${gymId}`,
      visitDays,
      visitShare: parseFloat((visitDays / billingDays).toFixed(4)),
      revenueEarned: parseFloat(rev.toFixed(2)),
      activeSubscribers: gymSubscribers[gymId]?.size ?? 0,
    };
  }).sort((a, b) => b.revenueEarned - a.revenueEarned);

  const distributed = entries.reduce((sum, e) => sum + e.revenueEarned, 0);
  const totalVisitDays = entries.reduce((sum, e) => sum + e.visitDays, 0);

  return {
    id: `stl-${billingMonth}`,
    billingMonth,
    billingDays,
    totalRevenue,
    totalVisitDays,
    platformRetained: parseFloat((totalRevenue - distributed).toFixed(2)),
    entries,
    processedAt: new Date().toISOString(),
    status: "processed",
  };
}
