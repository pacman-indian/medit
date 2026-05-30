"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Activity, Eye, EyeOff, AlertCircle, Zap, Copy, CheckCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const DEMO_EMAIL = "demo@medit.in";
const DEMO_PASSWORD = "Demo@1234";

export default function SignInPage() {
  const { user, signIn } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState<"email" | "pass" | null>(null);

  useEffect(() => {
    if (user) router.replace("/profile");
  }, [user, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await signIn(email.trim(), password);
    setLoading(false);
    if (result.error) { setError(result.error); return; }
    router.push("/profile");
  }

  function fillDemo() {
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
    setError("");
  }

  async function copyToClipboard(text: string, type: "email" | "pass") {
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <div className="min-h-screen bg-[#111827] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#34D399] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight">
              med<span className="text-[#8B5CF6]">It</span>
            </span>
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#F9FAFB] mb-1">Welcome back</h1>
          <p className="text-[#9CA3AF] text-sm">Sign in to your medIt account</p>
        </div>

        {/* Demo account card */}
        <div className="mb-6 p-4 rounded-2xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/30">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-[#A78BFA]" />
            <span className="text-sm font-semibold text-[#A78BFA]">Demo Account — Pro Plan</span>
          </div>
          <div className="space-y-2 mb-3">
            <div className="flex items-center justify-between bg-[#111827]/60 rounded-lg px-3 py-2">
              <div>
                <p className="text-[10px] text-[#6B7280] uppercase tracking-wide">Email</p>
                <p className="text-sm font-mono text-[#F9FAFB]">{DEMO_EMAIL}</p>
              </div>
              <button onClick={() => copyToClipboard(DEMO_EMAIL, "email")} className="p-1 rounded text-[#6B7280] hover:text-[#A78BFA] transition-colors">
                {copied === "email" ? <CheckCircle className="w-4 h-4 text-[#34D399]" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <div className="flex items-center justify-between bg-[#111827]/60 rounded-lg px-3 py-2">
              <div>
                <p className="text-[10px] text-[#6B7280] uppercase tracking-wide">Password</p>
                <p className="text-sm font-mono text-[#F9FAFB]">{DEMO_PASSWORD}</p>
              </div>
              <button onClick={() => copyToClipboard(DEMO_PASSWORD, "pass")} className="p-1 rounded text-[#6B7280] hover:text-[#A78BFA] transition-colors">
                {copied === "pass" ? <CheckCircle className="w-4 h-4 text-[#34D399]" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <button
            type="button"
            onClick={fillDemo}
            className="w-full py-2 rounded-lg bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-sm font-medium transition-all"
          >
            Fill demo credentials
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#D1D5DB] mb-1.5">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl bg-[#1F2937] border border-[#374151] text-[#F9FAFB] placeholder-[#4B5563] focus:outline-none focus:border-[#8B5CF6] transition-colors text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#D1D5DB] mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 pr-11 rounded-xl bg-[#1F2937] border border-[#374151] text-[#F9FAFB] placeholder-[#4B5563] focus:outline-none focus:border-[#8B5CF6] transition-colors text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#9CA3AF] transition-colors"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all hover:shadow-lg hover:shadow-[#8B5CF6]/25 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Signing in…
              </>
            ) : "Sign In"}
          </button>
        </form>

        <p className="text-center text-sm text-[#6B7280] mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/membership" className="text-[#A78BFA] hover:underline">
            Get started free
          </Link>
        </p>
      </div>
    </div>
  );
}
