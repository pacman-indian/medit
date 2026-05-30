export interface AuthUser {
  id: string;
  name: string;
  email: string;
  plan: "flex" | "pro" | "elite";
  joinedAt: string;
  city: string;
  phone: string;
  avatar: string; // initials
}

// Mock user store — keyed by email
export const MOCK_USERS: Record<string, { password: string; user: AuthUser }> = {
  "demo@medit.in": {
    password: "Demo@1234",
    user: {
      id: "u-001",
      name: "Rishi Sharma",
      email: "demo@medit.in",
      plan: "pro",
      joinedAt: "2026-01-10",
      city: "Pune",
      phone: "+91 98220 00001",
      avatar: "RS",
    },
  },
  "priya@medit.in": {
    password: "Priya@5678",
    user: {
      id: "u-002",
      name: "Priya Mehta",
      email: "priya@medit.in",
      plan: "elite",
      joinedAt: "2026-02-14",
      city: "Mumbai",
      phone: "+91 98220 00002",
      avatar: "PM",
    },
  },
};

export const PLAN_LABELS: Record<AuthUser["plan"], string> = {
  flex: "Flex",
  pro: "Pro",
  elite: "Elite",
};

export const PLAN_COLORS: Record<AuthUser["plan"], string> = {
  flex:  "bg-[#374151] text-[#9CA3AF] border-[#4B5563]",
  pro:   "bg-[#8B5CF6]/15 text-[#A78BFA] border-[#8B5CF6]/40",
  elite: "bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/40",
};
