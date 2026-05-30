"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Heart, Droplets, Activity, Weight,
  Calendar, Clock, FileText, ChevronRight,
  LogOut, Plus, Shield, ExternalLink, Star, MapPin
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useAppointments } from "@/contexts/AppointmentContext";
import { DOCTORS } from "@/lib/doctors";
import { PLAN_LABELS, PLAN_COLORS } from "@/lib/auth";

const VITALS = [
  { icon: Heart,     label: "Heart Rate",      value: "72",     unit: "bpm",   color: "bg-rose-500/10 border-rose-500/20",    iconColor: "text-rose-400" },
  { icon: Droplets,  label: "Blood Pressure",  value: "120/80", unit: "mmHg",  color: "bg-blue-500/10 border-blue-500/20",    iconColor: "text-blue-400" },
  { icon: Weight,    label: "Weight",          value: "68",     unit: "kg",    color: "bg-amber-500/10 border-amber-500/20",  iconColor: "text-amber-400" },
  { icon: Activity,  label: "Glucose",         value: "95",     unit: "mg/dL", color: "bg-emerald-500/10 border-emerald-500/20", iconColor: "text-emerald-400" },
];

const LAB_REPORTS = [
  { title: "Complete Blood Count",   date: "12 May 2026" },
  { title: "Lipid Profile",          date: "02 Apr 2026" },
  { title: "Thyroid Panel (TSH)",    date: "15 Mar 2026" },
];

const HEALTH_TIP = {
  title: "Stay Hydrated",
  body: "Start your day with a glass of water to jumpstart your metabolism and flush out toxins. Aim for at least 8 glasses (2.5L) today!",
};

export default function ProfilePage() {
  const { user, signOut, loading } = useAuth();
  const { userAppointments } = useAppointments();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace("/signin");
  }, [user, loading, router]);

  async function handleSignOut() {
    await signOut();
    router.push("/");
  }

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-[#111827] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#8B5CF6] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Enrich user's appointments with doctor details, sorted by date
  const myAppointments = userAppointments
    .filter((a) => a.userId === user.id)
    .map((appt) => ({ ...appt, doctor: DOCTORS.find((d) => d.id === appt.doctorId) }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="min-h-screen bg-[#111827]">
      {/* Header */}
      <div className="bg-[#0D1117] border-b border-[#374151] py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#F9FAFB]">
                Good morning, {user.name.split(" ")[0]}!
              </h1>
              <p className="text-[#9CA3AF] text-sm mt-1">Here's your health overview for today.</p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/health-hub"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-sm font-semibold transition-all hover:shadow-lg hover:shadow-[#8B5CF6]/25">
                <Plus className="w-4 h-4" /> Book Appointment
              </Link>
              <button onClick={handleSignOut}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#374151] text-[#9CA3AF] hover:text-red-400 hover:border-red-500/30 transition-all text-sm">
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left column */}
          <div className="lg:col-span-2 space-y-8">

            {/* Health Vitals */}
            <div>
              <h2 className="text-base font-bold text-[#F9FAFB] mb-4">Health Vitals</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {VITALS.map(({ icon: Icon, label, value, unit, color, iconColor }) => (
                  <div key={label} className={`p-4 rounded-2xl border ${color} flex flex-col items-center text-center hover:scale-105 transition-transform`}>
                    <div className="w-9 h-9 rounded-full bg-[#111827] flex items-center justify-center mb-2">
                      <Icon className={`w-4 h-4 ${iconColor}`} />
                    </div>
                    <p className="text-xl font-bold text-[#F9FAFB]">{value}</p>
                    <p className="text-[10px] text-[#6B7280] font-medium">{unit}</p>
                    <p className="text-[10px] text-[#9CA3AF] uppercase tracking-widest mt-1 font-semibold">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Appointments */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-[#F9FAFB]">Upcoming Appointments</h2>
                <Link href="/health-hub" className="text-[#A78BFA] hover:underline text-xs font-semibold">
                  + Book new
                </Link>
              </div>

              <div className="space-y-4">
                {myAppointments.length > 0 ? myAppointments.map((appt) => (
                  <div key={appt.id} className="bg-[#1F2937] border border-[#374151] rounded-2xl p-5 flex flex-col sm:flex-row gap-4 hover:border-[#8B5CF6]/40 transition-all">
                    {appt.doctor && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <div className="relative flex-shrink-0">
                        <img src={appt.doctor.image} alt={appt.doctor.name}
                          className="w-14 h-14 rounded-xl object-cover bg-[#374151]" />
                        <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[#34D399] rounded-full border-2 border-[#1F2937]" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div>
                          <h3 className="font-bold text-[#F9FAFB] text-sm">{appt.doctor?.name ?? `Doctor #${appt.doctorId}`}</h3>
                          <p className="text-[#8B5CF6] text-xs font-medium">{appt.doctor?.specialty}</p>
                        </div>
                        <span className="flex-shrink-0 px-2.5 py-0.5 rounded-full bg-[#34D399]/10 border border-[#34D399]/30 text-[#34D399] text-[10px] font-bold uppercase tracking-wide">
                          {appt.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-3 mt-2 text-xs text-[#9CA3AF]">
                        <span className="flex items-center gap-1 bg-[#374151] px-2.5 py-1 rounded-lg">
                          <Calendar className="w-3 h-3" />
                          <span className="font-semibold text-[#F9FAFB]">{appt.date}</span>
                        </span>
                        <span className="flex items-center gap-1 bg-[#374151] px-2.5 py-1 rounded-lg">
                          <Clock className="w-3 h-3" />
                          <span className="font-semibold text-[#F9FAFB]">{appt.time}</span>
                        </span>
                        {appt.doctor && (
                          <span className="flex items-center gap-1 bg-[#374151] px-2.5 py-1 rounded-lg">
                            <MapPin className="w-3 h-3" />
                            {appt.doctor.location}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex sm:flex-col gap-2 justify-end sm:justify-center flex-shrink-0">
                      {appt.doctor && (
                        <Link href={`/doctors/${appt.doctor.id}`}
                          className="px-3 py-1.5 rounded-lg border border-[#374151] text-[#9CA3AF] hover:text-white hover:border-[#8B5CF6]/50 text-xs transition-all text-center">
                          View
                        </Link>
                      )}
                      <button className="px-3 py-1.5 rounded-lg text-red-400 hover:bg-red-500/10 text-xs transition-all">
                        Cancel
                      </button>
                    </div>
                  </div>
                )) : (
                  <div className="text-center py-12 bg-[#1F2937] border border-dashed border-[#374151] rounded-2xl">
                    <Calendar className="w-10 h-10 text-[#374151] mx-auto mb-3" />
                    <p className="text-[#9CA3AF] text-sm font-medium">No upcoming appointments</p>
                    <Link href="/health-hub" className="text-[#A78BFA] hover:underline text-sm mt-2 inline-block">
                      Find a doctor →
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* User card */}
            <div className="bg-[#1F2937] border border-[#374151] rounded-2xl p-5">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#34D399] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {user.avatar}
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-[#F9FAFB] truncate">{user.name}</h3>
                  <p className="text-[#6B7280] text-xs truncate">{user.email}</p>
                  <span className={`inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded border text-[10px] font-semibold ${PLAN_COLORS[user.plan]}`}>
                    <Shield className="w-2.5 h-2.5" /> {PLAN_LABELS[user.plan]} Plan
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Link href="/membership" className="flex items-center justify-center gap-1 py-2 rounded-lg border border-[#374151] text-[#9CA3AF] hover:text-white hover:border-[#8B5CF6]/50 text-xs transition-all">
                  Manage Plan <ExternalLink className="w-3 h-3" />
                </Link>
                <Link href="/records" className="flex items-center justify-center gap-1 py-2 rounded-lg border border-[#374151] text-[#9CA3AF] hover:text-white hover:border-[#8B5CF6]/50 text-xs transition-all">
                  Records
                </Link>
              </div>
            </div>

            {/* Lab reports */}
            <div className="bg-[#1F2937] border border-[#374151] rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#374151]">
                <h3 className="font-bold text-[#F9FAFB] text-sm">Recent Lab Reports</h3>
                <Link href="/records" className="text-[#A78BFA] text-xs hover:underline">See all</Link>
              </div>
              <div className="divide-y divide-[#374151]">
                {LAB_REPORTS.map((r) => (
                  <div key={r.title} className="flex items-center gap-3 px-5 py-3 hover:bg-[#374151]/40 transition-colors cursor-pointer group">
                    <div className="w-8 h-8 rounded-lg bg-[#374151] group-hover:bg-[#8B5CF6]/20 flex items-center justify-center transition-colors flex-shrink-0">
                      <FileText className="w-3.5 h-3.5 text-[#9CA3AF] group-hover:text-[#8B5CF6] transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[#F9FAFB] text-xs font-semibold truncate">{r.title}</p>
                      <p className="text-[#6B7280] text-[10px]">{r.date}</p>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-[#374151] group-hover:text-[#8B5CF6] transition-colors" />
                  </div>
                ))}
              </div>
            </div>

            {/* Doctors you've visited */}
            {myAppointments.length > 0 && (
              <div className="bg-[#1F2937] border border-[#374151] rounded-2xl overflow-hidden">
                <div className="px-5 py-4 border-b border-[#374151]">
                  <h3 className="font-bold text-[#F9FAFB] text-sm">Your Doctors</h3>
                </div>
                <div className="divide-y divide-[#374151]">
                  {[...new Map(myAppointments.filter(a => a.doctor).map(a => [a.doctorId, a])).values()].slice(0, 3).map((appt) => (
                    <Link key={appt.doctorId} href={`/doctors/${appt.doctorId}`}
                      className="flex items-center gap-3 px-5 py-3 hover:bg-[#374151]/40 transition-colors group">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={appt.doctor!.image} alt={appt.doctor!.name}
                        className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-[#F9FAFB] text-xs font-semibold truncate">{appt.doctor!.name}</p>
                        <p className="text-[#6B7280] text-[10px] flex items-center gap-1">
                          <Star className="w-2.5 h-2.5 fill-[#F59E0B] text-[#F59E0B]" />
                          {appt.doctor!.rating} · {appt.doctor!.specialty}
                        </p>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-[#374151] group-hover:text-[#8B5CF6] transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Daily health tip */}
            <div className="bg-gradient-to-br from-[#7C3AED] to-[#8B5CF6] rounded-2xl p-5 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 opacity-10">
                <Activity className="w-24 h-24" />
              </div>
              <span className="inline-block px-2.5 py-1 rounded-full bg-white/20 text-[10px] font-bold mb-3 uppercase tracking-wider backdrop-blur-sm">
                Daily Health Tip
              </span>
              <h3 className="font-bold text-base mb-1">{HEALTH_TIP.title}</h3>
              <p className="text-purple-100 text-xs leading-relaxed">{HEALTH_TIP.body}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
