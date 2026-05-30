"use client";
import { useState, useEffect } from "react";
import {
  BarChart2, Users, TrendingUp, DollarSign,
  CheckCircle, Clock, ChevronRight, Building2, FileText
} from "lucide-react";
import type { Settlement } from "@/lib/types";

const DEMO_GYM_ID = 1;
const DEMO_GYM_NAME = "FitZone Premium";

interface GymReport {
  billingMonth: string;
  billingDays: number;
  status: string;
  processedAt: string;
  entry: {
    gymId: number;
    gymName: string;
    visitDays: number;
    visitShare: number;
    revenueEarned: number;
    activeSubscribers: number;
  } | null;
}

const VISIT_BARS = [
  { day: "Mon", visits: 38 },
  { day: "Tue", visits: 52 },
  { day: "Wed", visits: 47 },
  { day: "Thu", visits: 61 },
  { day: "Fri", visits: 55 },
  { day: "Sat", visits: 74 },
  { day: "Sun", visits: 29 },
];

const MAX_VISITS = Math.max(...VISIT_BARS.map((b) => b.visits));

const MONTHS = ["2026-05", "2026-04"];

export default function GymDashboardPage() {
  const [selectedMonth, setSelectedMonth] = useState("2026-05");
  const [currentReport, setCurrentReport] = useState<GymReport | null>(null);
  const [settlements, setSettlements] = useState<Settlement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`/api/settlements/report?month=${selectedMonth}&gymId=${DEMO_GYM_ID}`).then((r) => r.json()),
      fetch("/api/settlements").then((r) => r.json()),
    ]).then(([report, history]) => {
      setCurrentReport(report);
      setSettlements(history);
      setLoading(false);
    });
  }, [selectedMonth]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#111827] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#8B5CF6] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const entry = currentReport?.entry;
  const stats = [
    {
      label: "Total Visit Days",
      value: entry?.visitDays ?? 0,
      sub: `${((entry?.visitShare ?? 0) * 100).toFixed(1)}% of billing cycle`,
      icon: BarChart2,
      color: "text-[#8B5CF6]",
    },
    {
      label: "Active Subscribers",
      value: entry?.activeSubscribers ?? 0,
      sub: "visited this month",
      icon: Users,
      color: "text-[#34D399]",
    },
    {
      label: "Revenue Earned",
      value: `₹${(entry?.revenueEarned ?? 0).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`,
      sub: `for ${currentReport?.billingMonth}`,
      icon: DollarSign,
      color: "text-[#F59E0B]",
    },
    {
      label: "Settlement Status",
      value: currentReport?.status === "paid" ? "Paid" : currentReport?.status === "processed" ? "Processing" : "Pending",
      sub: currentReport?.processedAt ? `as of ${currentReport.processedAt.slice(0, 10)}` : "—",
      icon: CheckCircle,
      color: currentReport?.status === "paid" ? "text-[#34D399]" : "text-[#F59E0B]",
    },
  ];

  return (
    <div className="min-h-screen bg-[#111827]">
      {/* Header */}
      <div className="bg-[#0D1117] border-b border-[#374151] py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 text-[#8B5CF6] text-sm font-medium mb-2">
              <Building2 className="w-4 h-4" />
              Gym Owner Portal
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#F9FAFB]">{DEMO_GYM_NAME}</h1>
            <p className="text-[#9CA3AF] text-sm mt-1">Revenue & attendance dashboard</p>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-[#9CA3AF]">Billing period:</label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-3 py-2 rounded-lg bg-[#1F2937] border border-[#374151] text-[#F9FAFB] text-sm focus:outline-none focus:border-[#8B5CF6]"
            >
              {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* KPI cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s) => (
            <div key={s.label} className="p-5 rounded-2xl bg-[#1F2937] border border-[#374151]">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-[#9CA3AF] font-medium uppercase tracking-wide">{s.label}</p>
                <s.icon className={`w-4 h-4 ${s.color}`} />
              </div>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-[#6B7280] mt-1">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Revenue formula */}
        <div className="p-5 rounded-2xl bg-[#1F2937] border border-[#374151]">
          <h2 className="text-sm font-semibold text-[#F9FAFB] mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#34D399]" />
            Revenue Calculation — {currentReport?.billingMonth}
          </h2>
          <div className="font-mono text-sm text-[#9CA3AF] space-y-1">
            <div>
              Revenue = (Visit Days ÷ Billing Days) × Subscription Pool
            </div>
            <div className="text-[#F9FAFB] mt-2">
              = ({entry?.visitDays ?? 0} ÷ {currentReport?.billingDays ?? 30}) × total subscriber payments
            </div>
            <div className="text-[#34D399] font-semibold">
              = ₹{(entry?.revenueEarned ?? 0).toLocaleString("en-IN", { maximumFractionDigits: 0 })} earned
            </div>
          </div>
        </div>

        {/* Visits bar chart */}
        <div className="p-6 rounded-2xl bg-[#1F2937] border border-[#374151]">
          <h2 className="text-base font-semibold text-[#F9FAFB] mb-6 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-[#8B5CF6]" />
            Weekly Visit Pattern (this month)
          </h2>
          <div className="flex items-end justify-between gap-2 h-32">
            {VISIT_BARS.map(({ day, visits }) => (
              <div key={day} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs text-[#9CA3AF]">{visits}</span>
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-[#7C3AED] to-[#8B5CF6] transition-all"
                  style={{ height: `${(visits / MAX_VISITS) * 100}%` }}
                />
                <span className="text-xs text-[#6B7280]">{day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Settlement history */}
        <div>
          <h2 className="text-base font-semibold text-[#F9FAFB] mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#F59E0B]" />
            Settlement History
          </h2>
          <div className="space-y-3">
            {settlements.map((s) => {
              const gymEntry = s.entries.find((e) => e.gymId === DEMO_GYM_ID);
              if (!gymEntry) return null;
              return (
                <div key={s.id} className="flex items-center gap-4 p-5 rounded-2xl bg-[#1F2937] border border-[#374151]">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-[#F9FAFB] text-sm">{s.billingMonth}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        s.status === "paid" ? "bg-[#34D399]/10 text-[#34D399] border border-[#34D399]/30" : "bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/30"
                      }`}>
                        {s.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-[#9CA3AF]">
                      <span><Clock className="w-3 h-3 inline mr-1" />{gymEntry.visitDays} visit days</span>
                      <span><Users className="w-3 h-3 inline mr-1" />{gymEntry.activeSubscribers} subscribers</span>
                      <span>Share: {(gymEntry.visitShare * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#34D399] text-lg">
                      ₹{gymEntry.revenueEarned.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                    </p>
                    <p className="text-xs text-[#6B7280]">processed {s.processedAt.slice(0, 10)}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#6B7280]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
