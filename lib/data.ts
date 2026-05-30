import type { Gym, CheckIn, Subscription, Settlement } from "./types";

export const GYMS: Gym[] = [
  {
    id: 1, name: "FitZone Premium", city: "Mumbai",
    location: "Bandra West, Mumbai", address: "14, Linking Road, Bandra West, Mumbai 400050",
    lat: 19.0596, lng: 72.8295,
    rating: 4.8, reviews: 312, totalCapacity: 120,
    amenities: ["AC", "Pool", "Parking", "Sauna"], open: "5:00 AM – 11:00 PM",
    tags: ["Premium", "CrossFit"], color: "from-[#8B5CF6] to-[#7C3AED]",
    image: "FZ", phone: "+91 22 2645 0000",
  },
  {
    id: 2, name: "Iron Republic", city: "Bangalore",
    location: "Koramangala, Bangalore", address: "80 Feet Road, 4th Block, Koramangala, Bangalore 560034",
    lat: 12.9352, lng: 77.6245,
    rating: 4.6, reviews: 187, totalCapacity: 90,
    amenities: ["AC", "Parking", "Cardio Zone"], open: "6:00 AM – 10:00 PM",
    tags: ["Powerlifting"], color: "from-[#34D399] to-[#10B981]",
    image: "IR", phone: "+91 80 4123 5678",
  },
  {
    id: 3, name: "Elevate Fitness Studio", city: "Delhi",
    location: "Hauz Khas, Delhi", address: "Village Hauz Khas, South Delhi 110016",
    lat: 28.5494, lng: 77.2001,
    rating: 4.9, reviews: 425, totalCapacity: 150,
    amenities: ["AC", "Pool", "Sauna", "Spa"], open: "24 Hours",
    tags: ["Luxury", "Yoga"], color: "from-[#F59E0B] to-[#D97706]",
    image: "EF", phone: "+91 11 4567 8901",
  },
  {
    id: 4, name: "Muscle Hive", city: "Mumbai",
    location: "Andheri East, Mumbai", address: "Chakala Industrial Area, Andheri East, Mumbai 400093",
    lat: 19.1136, lng: 72.8697,
    rating: 4.4, reviews: 98, totalCapacity: 70,
    amenities: ["AC", "Cardio Zone"], open: "5:30 AM – 10:30 PM",
    tags: ["Budget"], color: "from-[#EC4899] to-[#BE185D]",
    image: "MH", phone: "+91 22 2834 6789",
  },
  {
    id: 5, name: "PureStrength Arena", city: "Bangalore",
    location: "Indiranagar, Bangalore", address: "100 Feet Road, Indiranagar, Bangalore 560038",
    lat: 12.9784, lng: 77.6408,
    rating: 4.7, reviews: 241, totalCapacity: 110,
    amenities: ["AC", "Parking", "Pool", "Nutrition Bar"], open: "6:00 AM – 11:00 PM",
    tags: ["CrossFit", "Boxing"], color: "from-[#06B6D4] to-[#0891B2]",
    image: "PS", phone: "+91 80 4011 2233",
  },
  {
    id: 6, name: "Zen Wellness Hub", city: "Hyderabad",
    location: "Jubilee Hills, Hyderabad", address: "Road No. 36, Jubilee Hills, Hyderabad 500033",
    lat: 17.4237, lng: 78.4072,
    rating: 4.5, reviews: 163, totalCapacity: 80,
    amenities: ["AC", "Yoga Studio", "Meditation Room", "Sauna"], open: "6:00 AM – 9:00 PM",
    tags: ["Yoga", "Wellness"], color: "from-[#8B5CF6] to-[#34D399]",
    image: "ZW", phone: "+91 40 2355 4400",
  },

  // Dighi, Pune
  {
    id: 7, name: "PowerHouse Gym Dighi", city: "Pune",
    location: "Dighi, Pune", address: "Shop 4, Dighi Alandi Road, Dighi, Pune 411015",
    lat: 18.6051, lng: 73.8724,
    rating: 4.3, reviews: 74, totalCapacity: 60,
    amenities: ["AC", "Parking", "Cardio Zone"], open: "5:30 AM – 10:00 PM",
    tags: ["Powerlifting", "Budget"], color: "from-[#F59E0B] to-[#D97706]",
    image: "PH", phone: "+91 98220 11234",
  },
  {
    id: 8, name: "StriveX Fitness Dighi", city: "Pune",
    location: "Dighi, Pune", address: "Plot 12, Sector C, Dighi, Pune 411015",
    lat: 18.6008, lng: 73.8698,
    rating: 4.5, reviews: 112, totalCapacity: 80,
    amenities: ["AC", "Cardio Zone", "Parking", "Nutrition Bar"], open: "6:00 AM – 10:30 PM",
    tags: ["CrossFit", "Boxing"], color: "from-[#06B6D4] to-[#0891B2]",
    image: "SX", phone: "+91 98221 56789",
  },

  // Dhanori, Pune
  {
    id: 9, name: "GainZone Dhanori", city: "Pune",
    location: "Dhanori, Pune", address: "Near Dhanori Chowk, Dhanori, Pune 411015",
    lat: 18.5940, lng: 73.9108,
    rating: 4.2, reviews: 59, totalCapacity: 55,
    amenities: ["AC", "Cardio Zone"], open: "6:00 AM – 9:30 PM",
    tags: ["Budget"], color: "from-[#EC4899] to-[#BE185D]",
    image: "GZ", phone: "+91 98601 44321",
  },
  {
    id: 10, name: "Apex Fitness Studio", city: "Pune",
    location: "Dhanori, Pune", address: "Opp. Dhanori Lake, Dhanori Road, Pune 411015",
    lat: 18.5978, lng: 73.9145,
    rating: 4.6, reviews: 138, totalCapacity: 90,
    amenities: ["AC", "Yoga Studio", "Parking", "Sauna"], open: "5:00 AM – 11:00 PM",
    tags: ["Yoga", "Premium"], color: "from-[#8B5CF6] to-[#7C3AED]",
    image: "AF", phone: "+91 97650 78900",
  },

  // Lohegaon, Pune
  {
    id: 11, name: "Iron Will Lohegaon", city: "Pune",
    location: "Lohegaon, Pune", address: "Lohegaon Main Road, Near Airport, Pune 411047",
    lat: 18.5819, lng: 73.9132,
    rating: 4.4, reviews: 91, totalCapacity: 70,
    amenities: ["AC", "Parking", "Cardio Zone"], open: "5:30 AM – 10:00 PM",
    tags: ["Powerlifting", "CrossFit"], color: "from-[#34D399] to-[#10B981]",
    image: "IW", phone: "+91 98504 33210",
  },
  {
    id: 12, name: "FlexCore Lohegaon", city: "Pune",
    location: "Lohegaon, Pune", address: "Gat No. 211, Lohegaon, Pune 411047",
    lat: 18.5857, lng: 73.9175,
    rating: 4.7, reviews: 203, totalCapacity: 100,
    amenities: ["AC", "Pool", "Parking", "Nutrition Bar", "Sauna"], open: "24 Hours",
    tags: ["Premium", "Wellness"], color: "from-[#F59E0B] to-[#EC4899]",
    image: "FC", phone: "+91 97300 22456",
  },
];

// Simulated check-in records for the current billing cycle (May 2026)
export const CHECKINS: CheckIn[] = [
  { id: "ci-001", userId: "u-001", gymId: 1, gymName: "FitZone Premium", date: "2026-05-01", timestamp: "2026-05-01T09:12:00Z", method: "qr", verified: true },
  { id: "ci-002", userId: "u-001", gymId: 1, gymName: "FitZone Premium", date: "2026-05-03", timestamp: "2026-05-03T08:55:00Z", method: "geo", verified: true },
  { id: "ci-003", userId: "u-001", gymId: 2, gymName: "Iron Republic",   date: "2026-05-06", timestamp: "2026-05-06T07:30:00Z", method: "qr", verified: true },
  { id: "ci-004", userId: "u-001", gymId: 1, gymName: "FitZone Premium", date: "2026-05-08", timestamp: "2026-05-08T10:00:00Z", method: "geo", verified: true },
  { id: "ci-005", userId: "u-001", gymId: 2, gymName: "Iron Republic",   date: "2026-05-10", timestamp: "2026-05-10T08:15:00Z", method: "qr", verified: true },
  { id: "ci-006", userId: "u-001", gymId: 1, gymName: "FitZone Premium", date: "2026-05-13", timestamp: "2026-05-13T09:00:00Z", method: "geo", verified: true },
  { id: "ci-007", userId: "u-002", gymId: 3, gymName: "Elevate Fitness Studio", date: "2026-05-02", timestamp: "2026-05-02T07:00:00Z", method: "qr", verified: true },
  { id: "ci-008", userId: "u-002", gymId: 3, gymName: "Elevate Fitness Studio", date: "2026-05-05", timestamp: "2026-05-05T07:30:00Z", method: "qr", verified: true },
  { id: "ci-009", userId: "u-002", gymId: 5, gymName: "PureStrength Arena", date: "2026-05-09", timestamp: "2026-05-09T06:45:00Z", method: "geo", verified: true },
  { id: "ci-010", userId: "u-003", gymId: 4, gymName: "Muscle Hive",     date: "2026-05-04", timestamp: "2026-05-04T08:20:00Z", method: "qr", verified: true },
  { id: "ci-011", userId: "u-003", gymId: 4, gymName: "Muscle Hive",     date: "2026-05-07", timestamp: "2026-05-07T09:10:00Z", method: "geo", verified: true },
  { id: "ci-012", userId: "u-003", gymId: 6, gymName: "Zen Wellness Hub", date: "2026-05-11", timestamp: "2026-05-11T08:00:00Z", method: "qr", verified: true },
];

export const SUBSCRIPTIONS: Subscription[] = [
  { id: "sub-001", userId: "u-001", userName: "Rishi Sharma", plan: "pro", amount: 1999, billingCycleStart: "2026-05-01", billingCycleEnd: "2026-05-31", active: true },
  { id: "sub-002", userId: "u-002", userName: "Priya Mehta",  plan: "elite", amount: 3499, billingCycleStart: "2026-05-01", billingCycleEnd: "2026-05-31", active: true },
  { id: "sub-003", userId: "u-003", userName: "Arjun Verma",  plan: "flex",  amount: 999,  billingCycleStart: "2026-05-01", billingCycleEnd: "2026-05-31", active: true },
];

// Pre-computed past settlement for April 2026 (for dashboard history)
export const PAST_SETTLEMENT: Settlement = {
  id: "stl-apr-2026",
  billingMonth: "2026-04",
  billingDays: 30,
  totalRevenue: 184800,
  totalVisitDays: 312,
  platformRetained: 122400,
  processedAt: "2026-05-01T00:00:00Z",
  status: "paid",
  entries: [
    { gymId: 1, gymName: "FitZone Premium",       visitDays: 92, visitShare: 0.295, revenueEarned: 54464, activeSubscribers: 87 },
    { gymId: 2, gymName: "Iron Republic",          visitDays: 68, visitShare: 0.218, revenueEarned: 40278, activeSubscribers: 62 },
    { gymId: 3, gymName: "Elevate Fitness Studio", visitDays: 55, visitShare: 0.176, revenueEarned: 32525, activeSubscribers: 71 },
    { gymId: 4, gymName: "Muscle Hive",            visitDays: 44, visitShare: 0.141, revenueEarned: 26057, activeSubscribers: 34 },
    { gymId: 5, gymName: "PureStrength Arena",     visitDays: 35, visitShare: 0.112, revenueEarned: 20698, activeSubscribers: 48 },
    { gymId: 6, gymName: "Zen Wellness Hub",       visitDays: 18, visitShare: 0.058, revenueEarned: 10778, activeSubscribers: 21 },
  ],
};
