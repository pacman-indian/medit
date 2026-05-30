"use client";
import { useState, use } from "react";
import Link from "next/link";
import {
  MapPin, Star, ChevronLeft, Clock, ShieldCheck,
  Calendar, Check, AlertCircle, MessageSquare, Navigation, Map
} from "lucide-react";
import { DOCTORS } from "@/lib/doctors";
import { useAppointments } from "@/contexts/AppointmentContext";
import { useAuth } from "@/contexts/AuthContext";

function buildDates(count = 5) {
  const today = new Date();
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return {
      label: d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" }),
      iso: d.toISOString().split("T")[0],
    };
  });
}

export default function DoctorProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { user } = useAuth();
  const { getDoctorSlots, bookSlot } = useAppointments();

  const doctor = DOCTORS.find((d) => d.id === Number(id));

  const [dateIdx, setDateIdx] = useState(0);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [booked, setBooked] = useState(false);
  const [authError, setAuthError] = useState(false);

  if (!doctor) {
    return (
      <div className="min-h-screen bg-[#111827] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#9CA3AF] mb-4">Doctor not found.</p>
          <Link href="/health-hub" className="text-[#A78BFA] hover:underline text-sm">← Back to doctors</Link>
        </div>
      </div>
    );
  }

  const dates = buildDates();
  const currentDate = dates[dateIdx]?.iso ?? dates[0].iso;
  const slots = getDoctorSlots(doctor.id, currentDate);
  const availableSlots = slots.filter((s) => s.isAvailable);

  function handleBook() {
    if (!user) { setAuthError(true); return; }
    if (!selectedTime) return;
    bookSlot(doctor!.id, currentDate, selectedTime, user.id);
    setBooked(true);
    setTimeout(() => { setBooked(false); setSelectedTime(null); }, 3500);
  }

  const mapsNavUrl  = `https://www.google.com/maps/dir/?api=1&destination=${doctor.lat},${doctor.lng}`;
  const mapPageUrl  = `/gyms?layer=clinics&focus=${doctor.id}`;

  return (
    <div className="min-h-screen bg-[#111827]">

      {/* ── Hero banner (contains photo + basic info) ── */}
      <div className="bg-gradient-to-br from-[#4C1D95] via-[#7C3AED] to-[#6D28D9] relative overflow-hidden">
        {/* Subtle texture */}
        <div className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "28px 28px" }} />

        {/* Nav row */}
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-0 flex items-center justify-between">
          <Link href="/health-hub"
            className="inline-flex items-center gap-1.5 text-white/75 hover:text-white text-sm transition-colors">
            <ChevronLeft className="w-4 h-4" /> All Doctors
          </Link>
          <div className="flex items-center gap-2">
            <a href={mapsNavUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-all">
              <Navigation className="w-3.5 h-3.5" /> Navigate
            </a>
            <Link href={mapPageUrl}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-all">
              <Map className="w-3.5 h-3.5" /> View on Map
            </Link>
          </div>
        </div>

        {/* Profile hero row */}
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 sm:gap-7">
            {/* Photo */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl object-cover border-4 border-white/20 shadow-2xl flex-shrink-0"
            />

            {/* Name / specialty / badges */}
            <div className="flex-1 min-w-0 text-center sm:text-left pb-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">{doctor.name}</h1>
              <p className="text-purple-200 font-semibold text-base mt-0.5">{doctor.specialty}</p>
              <p className="text-purple-300 text-sm mt-0.5">{doctor.qualification}</p>
              <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/15 text-yellow-300 text-xs font-semibold border border-yellow-300/30">
                  <Star className="w-3 h-3 fill-yellow-300" /> {doctor.rating} ({doctor.reviews})
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/15 text-emerald-300 text-xs font-semibold border border-emerald-300/30">
                  <ShieldCheck className="w-3 h-3" /> Verified
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 text-white/80 text-xs font-semibold border border-white/20">
                  <Clock className="w-3 h-3" /> {doctor.experience}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 text-white/80 text-xs font-semibold border border-white/20">
                  <MapPin className="w-3 h-3" /> {doctor.location}
                </span>
              </div>
            </div>

            {/* Fee — right side on desktop */}
            <div className="hidden sm:block text-right flex-shrink-0 pb-1">
              <p className="text-3xl font-black text-white">{doctor.fee}</p>
              <p className="text-purple-300 text-xs mt-0.5">per consultation</p>
              {/* Mobile fee shown inline above */}
            </div>
          </div>

          {/* Mobile fee */}
          <div className="sm:hidden text-center mt-3">
            <span className="text-2xl font-black text-white">{doctor.fee}</span>
            <span className="text-purple-300 text-sm ml-1">/ consultation</span>
          </div>
        </div>
      </div>
      {/* ── End hero ── */}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Left: Info panels */}
          <div className="md:col-span-2 space-y-5 order-2 md:order-1">

            {/* About */}
            <div className="bg-[#1F2937] border border-[#374151] rounded-2xl p-6">
              <h2 className="text-sm font-bold text-[#F9FAFB] uppercase tracking-wide mb-3">About Doctor</h2>
              <p className="text-[#9CA3AF] leading-relaxed text-sm">{doctor.about}</p>
            </div>

            {/* Clinic location */}
            <div className="bg-[#1F2937] border border-[#374151] rounded-2xl p-6">
              <h2 className="text-sm font-bold text-[#F9FAFB] uppercase tracking-wide mb-4">Clinic Location</h2>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center justify-center text-[#8B5CF6] flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#F9FAFB] text-sm">{doctor.hospital}</h3>
                  <p className="text-[#9CA3AF] text-xs mt-0.5">{doctor.address}</p>
                  <div className="flex gap-3 mt-2">
                    <a href={mapsNavUrl} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#8B5CF6] hover:underline text-xs font-medium">
                      <Navigation className="w-3 h-3" /> Get Directions
                    </a>
                    <Link href={mapPageUrl}
                      className="inline-flex items-center gap-1 text-[#34D399] hover:underline text-xs font-medium">
                      <Map className="w-3 h-3" /> View on Map
                    </Link>
                  </div>
                </div>
              </div>

              {/* Map placeholder — clicking opens the map page focused on this clinic */}
              <Link href={mapPageUrl}
                className="block h-32 bg-[#374151]/50 rounded-xl border border-[#374151] overflow-hidden relative group hover:border-[#8B5CF6]/50 transition-colors">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-[#6B7280] group-hover:text-[#A78BFA] transition-colors">
                  <Map className="w-7 h-7" />
                  <span className="text-xs font-medium">Click to view on Map</span>
                </div>
              </Link>
            </div>

            {/* Availability */}
            <div className="bg-[#1F2937] border border-[#374151] rounded-2xl p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#34D399]/10 border border-[#34D399]/30 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-[#34D399]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#F9FAFB] uppercase tracking-wide">Regular Availability</p>
                <p className="text-[#9CA3AF] text-sm mt-0.5">{doctor.availability}</p>
              </div>
            </div>
          </div>

          {/* Right: Booking widget */}
          <div className="order-1 md:order-2">
            <div className="bg-[#1F2937] border border-[#374151] rounded-2xl p-5 sticky top-20">
              <h3 className="font-bold text-[#F9FAFB] text-base mb-5">Book Appointment</h3>

              {booked ? (
                <div className="flex items-center gap-2 p-4 rounded-xl bg-[#34D399]/10 border border-[#34D399]/30 text-[#34D399] font-semibold text-sm mb-4">
                  <Check className="w-5 h-5" /> Appointment booked!
                </div>
              ) : (
                <>
                  {authError && !user && (
                    <div className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs mb-4">
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      Please <Link href="/signin" className="underline font-semibold mx-0.5">sign in</Link> to book.
                    </div>
                  )}

                  {/* Date selector */}
                  <div className="mb-4">
                    <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wide mb-2">Select Date</p>
                    <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1">
                      {dates.map((d, i) => (
                        <button key={i}
                          onClick={() => { setDateIdx(i); setSelectedTime(null); }}
                          className={`flex-shrink-0 px-3 py-2 rounded-xl border text-center text-xs font-bold transition-all min-w-[72px] ${
                            dateIdx === i
                              ? "border-[#8B5CF6] bg-[#8B5CF6]/15 text-[#A78BFA]"
                              : "border-[#374151] text-[#9CA3AF] hover:border-[#8B5CF6]/40"
                          }`}
                        >
                          {d.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time slots */}
                  <div className="mb-5">
                    <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wide mb-2">Available Slots</p>
                    {availableSlots.length > 0 ? (
                      <div className="grid grid-cols-2 gap-2 max-h-44 overflow-y-auto">
                        {availableSlots.map((slot, i) => (
                          <button key={i}
                            disabled={slot.isBooked}
                            onClick={() => setSelectedTime(slot.time)}
                            className={`py-2 px-1 rounded-lg border text-xs font-bold transition-all ${
                              slot.isBooked
                                ? "bg-[#374151] text-[#4B5563] border-[#374151] cursor-not-allowed line-through"
                                : selectedTime === slot.time
                                  ? "bg-[#8B5CF6] border-[#8B5CF6] text-white"
                                  : "border-[#374151] text-[#9CA3AF] hover:border-[#8B5CF6]/50 hover:text-[#F9FAFB]"
                            }`}
                          >
                            {slot.time}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-xs text-red-400 bg-red-500/10 border border-red-500/20 py-3 rounded-xl">
                        All slots booked for this day.
                      </p>
                    )}
                  </div>
                </>
              )}

              {!booked && (
                <button onClick={handleBook} disabled={!selectedTime}
                  className="w-full py-3 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all hover:shadow-lg hover:shadow-[#8B5CF6]/25">
                  {selectedTime ? `Book for ${selectedTime}` : "Select a Slot"}
                </button>
              )}

              <div className="mt-4 pt-4 border-t border-[#374151]">
                <Link href="/chatbot"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#374151] text-[#9CA3AF] hover:text-white hover:border-[#8B5CF6]/50 text-sm transition-all">
                  <MessageSquare className="w-4 h-4" /> Chat with AI Coach
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
