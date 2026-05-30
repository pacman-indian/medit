import Link from "next/link";
import { Activity, X, Camera, Briefcase, GitBranch } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Gym Discovery", href: "/gyms" },
    { label: "Health Hub", href: "/health-hub" },
    { label: "AI Coach", href: "/chatbot" },
    { label: "Nutrition", href: "/nutrition" },
    { label: "Medical Records", href: "/records" },
  ],
  Company: [
    { label: "About Us", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Press", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "HIPAA Compliance", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-[#374151] bg-[#0D1117] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#34D399] flex items-center justify-center">
                <Activity className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold">
                med<span className="text-[#8B5CF6]">It</span>
              </span>
            </Link>
            <p className="text-[#9CA3AF] text-sm leading-relaxed max-w-xs mb-6">
              Your all-in-one health & fitness super-app. Gym access, AI coaching,
              doctor consultations, and personalized nutrition — all in one place.
            </p>
            <div className="flex items-center gap-3">
              {[X, Camera, Briefcase, GitBranch].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-[#1F2937] hover:bg-[#374151] flex items-center justify-center text-[#9CA3AF] hover:text-white transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-[#F9FAFB] mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#9CA3AF] hover:text-[#A78BFA] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-[#374151] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#9CA3AF]">
            © {new Date().getFullYear()} medIt Technologies Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-[#9CA3AF]">
            <span className="w-2 h-2 rounded-full bg-[#34D399] inline-block"></span>
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}
