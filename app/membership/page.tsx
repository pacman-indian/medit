"use client";
import { CheckCircle, Zap, Shield, Star, ArrowRight, Lock } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { PLAN_LABELS } from "@/lib/auth";

const PLAN_ORDER = { flex: 0, pro: 1, elite: 2 };

const plans = [
  {
    key: "flex" as const,
    name: "Flex",
    price: "₹999",
    period: "/month",
    desc: "Pay-as-you-go gym access with basic features.",
    color: "from-[#374151] to-[#1F2937]",
    border: "border-[#374151]",
    badge: null,
    features: [
      "Access to 500+ gyms",
      "AI Coach (10 queries/month)",
      "Basic health tracking",
      "Medical records vault",
    ],
  },
  {
    key: "pro" as const,
    name: "Pro",
    price: "₹1,999",
    period: "/month",
    desc: "Unlimited gyms, full AI coaching, and doctor consultations.",
    color: "from-[#7C3AED] to-[#8B5CF6]",
    border: "border-[#8B5CF6]/60",
    badge: "Most Popular",
    features: [
      "Access to 2,400+ gyms (unlimited)",
      "2 free doctor consultations/month",
      "Unlimited AI Coach queries",
      "Personalized nutrition plans",
      "Lab test discounts (up to 30%)",
      "Priority support",
    ],
  },
  {
    key: "elite" as const,
    name: "Elite",
    price: "₹3,499",
    period: "/month",
    desc: "Everything in Pro plus dedicated health manager and premium labs.",
    color: "from-[#F59E0B] to-[#D97706]",
    border: "border-[#F59E0B]/40",
    badge: "Best Value",
    features: [
      "Everything in Pro",
      "Unlimited doctor consultations",
      "Dedicated health manager",
      "Free annual health check-up",
      "Priority lab booking",
      "Family add-ons available",
    ],
  },
];

export default function MembershipPage() {
  const { user } = useAuth();

  function ctaLabel(planKey: "flex" | "pro" | "elite") {
    if (!user) return "Start Free Trial";
    if (user.plan === planKey) return "Current Plan";
    return PLAN_ORDER[planKey] > PLAN_ORDER[user.plan] ? `Upgrade to ${PLAN_LABELS[planKey]}` : `Switch to ${PLAN_LABELS[planKey]}`;
  }

  function ctaStyle(planKey: "flex" | "pro" | "elite") {
    if (user?.plan === planKey) {
      return "bg-[#34D399]/15 border border-[#34D399]/40 text-[#34D399] cursor-default";
    }
    if (planKey === "pro") return "bg-[#8B5CF6] hover:bg-[#7C3AED] text-white shadow-lg shadow-[#8B5CF6]/30";
    if (planKey === "elite") return "bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:opacity-90 text-white";
    return "bg-[#374151] hover:bg-[#4B5563] text-white";
  }

  return (
    <div className="min-h-screen bg-[#111827]">
      {/* Header */}
      <div className="bg-[#0D1117] border-b border-[#374151] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 text-[#A78BFA] text-sm font-medium mb-6">
            <Zap className="w-3.5 h-3.5" />
            {user ? `You're on the ${PLAN_LABELS[user.plan]} plan` : "30-day free trial on all plans"}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            {user ? "Manage Your Plan" : "Choose Your Plan"}
          </h1>
          <p className="text-[#9CA3AF] max-w-xl mx-auto">
            {user
              ? `Logged in as ${user.name}. Upgrade anytime — changes apply immediately.`
              : "Cancel any time. No credit card required to start."}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan) => {
            const isCurrent = user?.plan === plan.key;
            return (
              <div
                key={plan.name}
                className={`relative rounded-2xl border ${isCurrent ? "border-[#34D399]/50" : plan.border} bg-[#1F2937] p-8 flex flex-col transition-all duration-300 ${!isCurrent ? "hover:-translate-y-1 hover:shadow-xl hover:shadow-[#8B5CF6]/10" : ""}`}
              >
                {/* Badge */}
                {isCurrent ? (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#34D399] text-white text-xs font-semibold flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Active Plan
                  </div>
                ) : plan.badge ? (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#8B5CF6] text-white text-xs font-semibold flex items-center gap-1">
                    <Star className="w-3 h-3 fill-white" />
                    {plan.badge}
                  </div>
                ) : null}

                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-5`}>
                  <Shield className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-xl font-bold text-[#F9FAFB] mb-1">{plan.name}</h3>
                <p className="text-sm text-[#9CA3AF] mb-4">{plan.desc}</p>

                <div className="mb-6">
                  <span className="text-4xl font-black text-[#F9FAFB]">{plan.price}</span>
                  <span className="text-[#9CA3AF] text-sm">{plan.period}</span>
                </div>

                <ul className="space-y-3 flex-1 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-[#D1D5DB]">
                      <CheckCircle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isCurrent ? "text-[#34D399]" : "text-[#34D399]"}`} />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  disabled={isCurrent}
                  className={`w-full py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${ctaStyle(plan.key)}`}
                >
                  {isCurrent ? (
                    <><Lock className="w-4 h-4" /> {ctaLabel(plan.key)}</>
                  ) : (
                    <>{ctaLabel(plan.key)} <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <div className="text-center">
          {user ? (
            <p className="text-sm text-[#6B7280]">
              Need help choosing?{" "}
              <Link href="/health-hub" className="text-[#A78BFA] hover:underline">Talk to a doctor</Link>
              {" "}or{" "}
              <Link href="/profile" className="text-[#A78BFA] hover:underline">view your profile</Link>.
            </p>
          ) : (
            <p className="text-sm text-[#6B7280]">
              Not sure yet?{" "}
              <Link href="/signin" className="text-[#A78BFA] hover:underline">Sign in</Link>
              {" "}or{" "}
              <Link href="/health-hub" className="text-[#A78BFA] hover:underline">talk to a doctor for free</Link>.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
