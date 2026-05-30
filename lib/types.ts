export interface Gym {
  id: number;
  name: string;
  location: string;
  city: string;
  address: string;
  lat: number;
  lng: number;
  rating: number;
  reviews: number;
  amenities: string[];
  open: string;
  tags: string[];
  color: string;
  image: string;
  phone: string;
  totalCapacity: number;
}

export interface CheckIn {
  id: string;
  userId: string;
  gymId: number;
  gymName: string;
  date: string; // YYYY-MM-DD
  timestamp: string; // ISO
  method: "qr" | "geo";
  verified: boolean;
}

export interface Subscription {
  id: string;
  userId: string;
  userName: string;
  plan: "flex" | "pro" | "elite";
  amount: number;
  billingCycleStart: string; // YYYY-MM-DD
  billingCycleEnd: string;
  active: boolean;
}

export interface SettlementEntry {
  gymId: number;
  gymName: string;
  visitDays: number;
  visitShare: number; // fraction = visitDays / billingDays
  revenueEarned: number;
  activeSubscribers: number;
}

export interface Settlement {
  id: string;
  billingMonth: string; // "YYYY-MM"
  billingDays: number;
  totalRevenue: number;
  totalVisitDays: number;
  platformRetained: number;
  entries: SettlementEntry[];
  processedAt: string;
  status: "pending" | "processed" | "paid";
}

export interface QRPayload {
  code: string;
  gymId: number;
  userId: string;
  expiresAt: number; // epoch ms
}

export interface GymDashboardStats {
  gymId: number;
  totalVisits: number;
  activeSubscribers: number;
  revenueEarned: number;
  settlementHistory: Settlement[];
}
