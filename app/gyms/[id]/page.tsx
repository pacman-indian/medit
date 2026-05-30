"use client";
import { useState, useEffect, useCallback } from "react";
import { use } from "react";
import {
  MapPin, Star, Clock, Phone, ChevronLeft, QrCode,
  LocateFixed, CheckCircle, AlertCircle, Dumbbell, Navigation,
  Wifi, Car, Droplets, Flame, LogIn, Shield
} from "lucide-react";
import Link from "next/link";
import type { Gym, CheckIn } from "@/lib/types";
import { useAuth } from "@/contexts/AuthContext";
import { PLAN_LABELS, PLAN_COLORS } from "@/lib/auth";

const SUBSCRIPTION_PRICE = 1999;

const amenityIcons: Record<string, React.ReactNode> = {
  Wifi: <Wifi className="w-4 h-4" />,
  AC: <Flame className="w-4 h-4" />,
  Pool: <Droplets className="w-4 h-4" />,
  Parking: <Car className="w-4 h-4" />,
};

type CheckInMode = "idle" | "qr" | "geo";
type CheckInState = "idle" | "loading" | "success" | "error";

export default function GymDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { user, loading: authLoading } = useAuth();

  const [gym, setGym] = useState<Gym & { visitCount?: number } | null>(null);
  const [checkins, setCheckins] = useState<CheckIn[]>([]);
  const [mode, setMode] = useState<CheckInMode>("idle");
  const [state, setState] = useState<CheckInState>("idle");
  const [message, setMessage] = useState("");
  const [qrCode, setQrCode] = useState<{ code: string; expiresAt: number } | null>(null);
  const [qrCountdown, setQrCountdown] = useState(0);

  useEffect(() => {
    fetch(`/api/gyms/${id}`).then((r) => r.json()).then(setGym);
    if (user) {
      fetch(`/api/checkins?gymId=${id}&userId=${user.id}`)
        .then((r) => r.json())
        .then(setCheckins);
    }
  }, [id, user]);

  // QR countdown timer
  useEffect(() => {
    if (!qrCode) return;
    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.floor((qrCode.expiresAt - Date.now()) / 1000));
      setQrCountdown(remaining);
      if (remaining === 0) {
        setQrCode(null);
        setState("error");
        setMessage("QR code expired. Generate a new one.");
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [qrCode]);

  const generateQR = useCallback(async () => {
    if (!user) return;
    setState("loading");
    try {
      const res = await fetch("/api/checkins/verify-qr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "generate", gymId: Number(id), userId: user.id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setQrCode({ code: data.code, expiresAt: data.expiresAt });
      setState("idle");
    } catch (e: unknown) {
      setState("error");
      setMessage(e instanceof Error ? e.message : "Failed to generate QR");
    }
  }, [id, user]);

  const geoCheckin = useCallback(async () => {
    if (!user) return;
    setState("loading");
    setMessage("");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res = await fetch("/api/checkins", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              gymId: Number(id),
              userId: user.id,
              method: "geo",
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            }),
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error);
          setState("success");
          setMessage(`Check-in confirmed at ${gym?.name}!`);
          setCheckins((prev) => [data.checkin, ...prev]);
        } catch (e: unknown) {
          setState("error");
          setMessage(e instanceof Error ? e.message : "Check-in failed");
        }
      },
      () => {
        setState("error");
        setMessage("Could not access your location. Please allow location access.");
      }
    );
  }, [id, user, gym]);

  if (!gym) {
    return (
      <div className="min-h-screen bg-[#111827] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#8B5CF6] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const navUrl = `https://www.google.com/maps/dir/?api=1&destination=${gym.lat},${gym.lng}`;
  const recentCheckins = checkins.slice(0, 5);
  const isSubscribed = !authLoading && !!user;

  return (
    <div className="min-h-screen bg-[#111827]">
      {/* Coloured header */}
      <div className={`h-48 bg-gradient-to-br ${gym.color} relative`}>
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-6 flex items-start justify-between">
          <Link href="/gyms" className="flex items-center gap-1 text-white/80 hover:text-white text-sm transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back to map
          </Link>
          <a href={navUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm transition-all">
            <Navigation className="w-4 h-4" /> Navigate
          </a>
        </div>
        <div className="absolute bottom-6 left-0 right-0 max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 mb-1">
            {gym.tags.map((t) => (
              <span key={t} className="px-2 py-0.5 rounded-full bg-white/20 text-white text-xs font-medium">{t}</span>
            ))}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">{gym.name}</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Info row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-2 text-sm text-[#9CA3AF]">
            <MapPin className="w-4 h-4 text-[#8B5CF6]" /><span>{gym.address}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#9CA3AF]">
            <Clock className="w-4 h-4 text-[#34D399]" />{gym.open}
          </div>
          <div className="flex items-center gap-2 text-sm text-[#9CA3AF]">
            <Phone className="w-4 h-4 text-[#F59E0B]" />{gym.phone}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-[#F59E0B]">
            <Star className="w-4 h-4 fill-[#F59E0B]" />
            <span className="font-semibold text-[#F9FAFB]">{gym.rating}</span>
            <span className="text-[#6B7280] text-sm">({gym.reviews} reviews)</span>
          </div>
          {gym.visitCount !== undefined && (
            <span className="text-sm text-[#9CA3AF]">· {gym.visitCount} verified visits this month</span>
          )}
        </div>

        {/* Subscription / access banner */}
        {authLoading ? (
          <div className="h-24 rounded-2xl bg-[#1F2937] border border-[#374151] animate-pulse" />
        ) : isSubscribed ? (
          <div className="flex items-center justify-between p-5 rounded-2xl bg-[#34D399]/10 border border-[#34D399]/25">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#34D399]/20 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-[#34D399]" />
              </div>
              <div>
                <p className="font-semibold text-[#34D399] text-sm">Access Active</p>
                <p className="text-xs text-[#9CA3AF] mt-0.5">
                  {PLAN_LABELS[user.plan]} Plan · Unlimited gym visits
                </p>
                <p className="text-xs text-[#6B7280] mt-0.5">Revenue shared with this gym based on your visits</p>
              </div>
            </div>
            <span className={`text-xs font-semibold px-3 py-1.5 rounded-lg border ${PLAN_COLORS[user.plan]}`}>
              <Shield className="w-3 h-3 inline mr-1" />
              {PLAN_LABELS[user.plan]}
            </span>
          </div>
        ) : (
          <div className="flex items-center justify-between p-5 rounded-2xl bg-[#1F2937] border border-[#374151]">
            <div>
              <p className="text-sm text-[#9CA3AF] mb-0.5">Monthly subscription — unlimited access</p>
              <p className="text-2xl font-bold text-[#F9FAFB]">
                ₹{SUBSCRIPTION_PRICE.toLocaleString()}
                <span className="text-sm font-normal text-[#9CA3AF]">/month</span>
              </p>
              <p className="text-xs text-[#6B7280] mt-1">Revenue shared with gym based on your actual visits</p>
            </div>
            <div className="flex flex-col gap-2 items-end">
              <Link
                href="/membership"
                className="px-4 py-2 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-sm font-semibold transition-all"
              >
                Subscribe
              </Link>
              <Link href="/signin" className="text-xs text-[#6B7280] hover:text-[#A78BFA] transition-colors">
                Already have an account? Sign in
              </Link>
            </div>
          </div>
        )}

        {/* Amenities */}
        <div>
          <h2 className="text-base font-semibold text-[#F9FAFB] mb-3">Amenities</h2>
          <div className="flex flex-wrap gap-2">
            {gym.amenities.map((a) => (
              <span key={a} className="px-3 py-2 rounded-xl bg-[#1F2937] border border-[#374151] text-[#9CA3AF] text-sm flex items-center gap-2">
                <span className="text-[#8B5CF6]">{amenityIcons[a] ?? <Dumbbell className="w-4 h-4" />}</span>
                {a}
              </span>
            ))}
          </div>
        </div>

        {/* Check-in section */}
        <div className="p-6 rounded-2xl bg-[#1F2937] border border-[#374151] space-y-4">
          <h2 className="text-base font-semibold text-[#F9FAFB]">Secure Check-In</h2>

          {authLoading ? (
            <div className="h-20 rounded-xl bg-[#374151] animate-pulse" />
          ) : !isSubscribed ? (
            /* Not logged in — gate */
            <div className="flex flex-col items-center gap-3 py-6 text-center">
              <div className="w-12 h-12 rounded-2xl bg-[#374151] flex items-center justify-center">
                <LogIn className="w-6 h-6 text-[#9CA3AF]" />
              </div>
              <p className="text-[#9CA3AF] text-sm max-w-xs">
                Sign in to your medIt account to check in at this gym and track your visits.
              </p>
              <Link
                href="/signin"
                className="px-6 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-sm font-semibold transition-all"
              >
                Sign In to Check In
              </Link>
            </div>
          ) : (
            /* Logged in — show check-in options */
            <>
              <p className="text-sm text-[#9CA3AF]">
                Verified check-ins are used to calculate your gym&apos;s revenue share.
              </p>

              {state === "success" && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-[#34D399]/10 border border-[#34D399]/30 text-[#34D399] text-sm">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />{message}
                </div>
              )}
              {state === "error" && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />{message}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => { setMode("qr"); generateQR(); }}
                  className={`p-4 rounded-xl border transition-all text-left ${mode === "qr" ? "border-[#8B5CF6] bg-[#8B5CF6]/10" : "border-[#374151] hover:border-[#8B5CF6]/50"}`}
                >
                  <QrCode className="w-6 h-6 text-[#8B5CF6] mb-2" />
                  <p className="font-semibold text-[#F9FAFB] text-sm">QR Check-In</p>
                  <p className="text-xs text-[#9CA3AF] mt-0.5">Show code to gym staff scanner</p>
                </button>

                <button
                  onClick={() => { setMode("geo"); geoCheckin(); }}
                  disabled={state === "loading"}
                  className={`p-4 rounded-xl border transition-all text-left ${mode === "geo" ? "border-[#34D399] bg-[#34D399]/10" : "border-[#374151] hover:border-[#34D399]/50"} disabled:opacity-50`}
                >
                  <LocateFixed className={`w-6 h-6 text-[#34D399] mb-2 ${state === "loading" && mode === "geo" ? "animate-spin" : ""}`} />
                  <p className="font-semibold text-[#F9FAFB] text-sm">Geo Check-In</p>
                  <p className="text-xs text-[#9CA3AF] mt-0.5">Auto-verifies you&apos;re at the gym</p>
                </button>
              </div>

              {/* QR code display */}
              {mode === "qr" && qrCode && (
                <div className="mt-4 flex flex-col items-center gap-3">
                  <div className="w-48 h-48 bg-white rounded-2xl p-3 flex flex-col items-center justify-center gap-2 shadow-lg">
                    <div className="grid grid-cols-7 gap-0.5">
                      {Array.from({ length: 49 }).map((_, i) => {
                        const row = Math.floor(i / 7), col = i % 7;
                        const corner = (row < 3 && col < 3) || (row < 3 && col > 3) || (row > 3 && col < 3);
                        const filled = corner || Math.random() > 0.5;
                        return (
                          <div key={i} className={`w-4 h-4 rounded-[1px] ${filled ? "bg-gray-900" : "bg-white"}`} />
                        );
                      })}
                    </div>
                    <p className="font-mono text-xs font-bold text-gray-800 tracking-widest">{qrCode.code}</p>
                  </div>
                  <p className="text-xs text-[#9CA3AF]">
                    Show to gym scanner · expires in{" "}
                    <span className={`font-semibold ${qrCountdown < 60 ? "text-red-400" : "text-[#34D399]"}`}>
                      {Math.floor(qrCountdown / 60)}:{String(qrCountdown % 60).padStart(2, "0")}
                    </span>
                  </p>
                  <button onClick={generateQR} className="text-xs text-[#8B5CF6] hover:underline">Regenerate</button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Recent check-in history — only shown when logged in */}
        {isSubscribed && recentCheckins.length > 0 && (
          <div>
            <h2 className="text-base font-semibold text-[#F9FAFB] mb-3">Your Recent Check-Ins</h2>
            <div className="space-y-2">
              {recentCheckins.map((ci) => (
                <div key={ci.id} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#1F2937] border border-[#374151] text-sm">
                  <CheckCircle className="w-4 h-4 text-[#34D399] flex-shrink-0" />
                  <span className="text-[#F9FAFB]">{ci.date}</span>
                  <span className="text-[#6B7280] capitalize ml-auto">{ci.method} · {ci.verified ? "Verified" : "Pending"}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
