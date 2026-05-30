"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Activity, Menu, X, ChevronDown, LogOut, User, LayoutDashboard, Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { PLAN_LABELS, PLAN_COLORS } from "@/lib/auth";

const navLinks = [
  { href: "/gyms",       label: "Map" },
  { href: "/health-hub", label: "Doctors" },
  { href: "/nutrition",  label: "Nutrition" },
  { href: "/records",    label: "Records" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut, loading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  async function handleSignOut() {
    setDropdownOpen(false);
    setMenuOpen(false);
    await signOut();
    router.push("/");
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-[#374151] bg-[#111827]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#34D399] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              med<span className="text-[#8B5CF6]">It</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? "bg-[#8B5CF6]/20 text-[#A78BFA]"
                    : "text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-[#1F2937]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-[#1F2937] animate-pulse" />
            ) : user ? (
              /* User dropdown */
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-[#1F2937] transition-all"
                >
                  {/* Avatar */}
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#34D399] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {user.avatar}
                  </div>
                  <div className="text-left hidden lg:block">
                    <p className="text-sm font-medium text-[#F9FAFB] leading-tight">{user.name.split(" ")[0]}</p>
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${PLAN_COLORS[user.plan]}`}>
                      {PLAN_LABELS[user.plan]}
                    </span>
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-[#6B7280] transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#1F2937] border border-[#374151] shadow-2xl shadow-black/40 overflow-hidden z-50">
                    {/* User info */}
                    <div className="px-4 py-3 border-b border-[#374151]">
                      <p className="text-sm font-semibold text-[#F9FAFB]">{user.name}</p>
                      <p className="text-xs text-[#6B7280] truncate">{user.email}</p>
                      <span className={`inline-flex items-center gap-1 mt-1.5 text-[10px] font-semibold px-2 py-0.5 rounded border ${PLAN_COLORS[user.plan]}`}>
                        <Shield className="w-2.5 h-2.5" />
                        {PLAN_LABELS[user.plan]} Plan
                      </span>
                    </div>

                    {/* Links */}
                    <div className="py-1">
                      <Link
                        href="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-[#374151] transition-colors"
                      >
                        <User className="w-4 h-4" />
                        My Profile
                      </Link>
                      <Link
                        href="/gyms/dashboard"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-[#374151] transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Gym Dashboard
                      </Link>
                    </div>

                    <div className="border-t border-[#374151] py-1">
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-[#374151] transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="text-sm text-[#9CA3AF] hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/membership"
                  className="px-4 py-2 rounded-lg bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-sm font-medium transition-all duration-200 hover:shadow-lg hover:shadow-[#8B5CF6]/25"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-[#9CA3AF] hover:text-white hover:bg-[#1F2937] transition-all"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#374151] bg-[#111827] px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                pathname === link.href
                  ? "bg-[#8B5CF6]/20 text-[#A78BFA]"
                  : "text-[#9CA3AF] hover:text-white hover:bg-[#1F2937]"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-2 border-t border-[#374151] flex flex-col gap-2">
            {user ? (
              <>
                {/* Mobile user info */}
                <div className="flex items-center gap-3 px-4 py-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#34D399] flex items-center justify-center text-white text-xs font-bold">
                    {user.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#F9FAFB]">{user.name}</p>
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${PLAN_COLORS[user.plan]}`}>
                      {PLAN_LABELS[user.plan]} Plan
                    </span>
                  </div>
                </div>
                <Link href="/profile" onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm text-[#9CA3AF] hover:text-white hover:bg-[#1F2937] transition-all">
                  <User className="w-4 h-4" /> My Profile
                </Link>
                <Link href="/gyms/dashboard" onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm text-[#9CA3AF] hover:text-white hover:bg-[#1F2937] transition-all">
                  <LayoutDashboard className="w-4 h-4" /> Gym Dashboard
                </Link>
                <button onClick={handleSignOut}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm text-red-400 hover:bg-[#1F2937] transition-all">
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/signin" onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 rounded-lg text-sm text-[#9CA3AF] hover:text-white hover:bg-[#1F2937] transition-all">
                  Sign In
                </Link>
                <Link href="/membership" onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 rounded-lg bg-[#8B5CF6] text-white text-sm font-medium text-center transition-all hover:bg-[#7C3AED]">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
