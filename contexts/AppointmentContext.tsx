"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export interface Slot {
  time: string;
  isBooked: boolean;
  isAvailable: boolean;
}

export interface Appointment {
  id: string | number;
  doctorId: number;
  userId: string;
  date: string;
  time: string;
  status: "confirmed" | "pending";
}

type SlotsMap = Record<number, Record<string, Slot[]>>;

const SLOT_TIMES = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"];

function generateSlots(): SlotsMap {
  const slots: SlotsMap = {};
  const today = new Date();
  for (let d = 0; d < 7; d++) {
    const date = new Date(today);
    date.setDate(today.getDate() + d);
    const dateStr = date.toISOString().split("T")[0];
    for (let docId = 1; docId <= 12; docId++) {
      if (!slots[docId]) slots[docId] = {};
      slots[docId][dateStr] = SLOT_TIMES.map((time) => ({
        time,
        isBooked: Math.random() < 0.25,
        isAvailable: true,
      }));
    }
  }
  return slots;
}

interface AppointmentContextValue {
  slots: SlotsMap;
  userAppointments: Appointment[];
  getDoctorSlots: (doctorId: number, date: string) => Slot[];
  bookSlot: (doctorId: number, date: string, time: string, userId: string) => void;
  isDayFullyBooked: (doctorId: number, date: string) => boolean;
}

const AppointmentContext = createContext<AppointmentContextValue | null>(null);

export function AppointmentProvider({ children }: { children: ReactNode }) {
  const [slots, setSlots] = useState<SlotsMap>(generateSlots);
  const [userAppointments, setUserAppointments] = useState<Appointment[]>([
    // seed one appointment for the demo user
    { id: "seed-1", doctorId: 2, userId: "u-001", date: new Date().toISOString().split("T")[0], time: "10:00 AM", status: "confirmed" },
  ]);

  function getDoctorSlots(doctorId: number, date: string): Slot[] {
    return slots[doctorId]?.[date] ?? [];
  }

  function bookSlot(doctorId: number, date: string, time: string, userId: string) {
    setSlots((prev) => {
      const next = { ...prev };
      const day = next[doctorId]?.[date];
      if (!day) return next;
      const idx = day.findIndex((s) => s.time === time);
      if (idx !== -1) day[idx] = { ...day[idx], isBooked: true };
      return next;
    });
    setUserAppointments((prev) => [
      ...prev,
      { id: Date.now(), doctorId, userId, date, time, status: "confirmed" },
    ]);
  }

  function isDayFullyBooked(doctorId: number, date: string): boolean {
    const day = getDoctorSlots(doctorId, date);
    const available = day.filter((s) => s.isAvailable);
    return available.length > 0 && available.every((s) => s.isBooked);
  }

  return (
    <AppointmentContext.Provider value={{ slots, userAppointments, getDoctorSlots, bookSlot, isDayFullyBooked }}>
      {children}
    </AppointmentContext.Provider>
  );
}

export function useAppointments() {
  const ctx = useContext(AppointmentContext);
  if (!ctx) throw new Error("useAppointments must be used inside AppointmentProvider");
  return ctx;
}
