import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import { AppointmentProvider } from "@/contexts/AppointmentContext";
import ChatWidget from "@/components/ChatWidget";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: "medIt — Your Health & Fitness Super-App",
  description: "Gym discovery, AI coaching, health consultations, medical records & personalized nutrition — all in one place.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#111827] text-[#F9FAFB] antialiased">
        <AuthProvider><AppointmentProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <ChatWidget />
        </AppointmentProvider></AuthProvider>
      </body>
    </html>
  );
}
