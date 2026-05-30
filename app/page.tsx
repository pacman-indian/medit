import Link from "next/link";
import {
  Activity, Dumbbell, Brain, Heart, FlaskConical, Pill,
  Star, ArrowRight, Shield, Zap, Users, TrendingUp,
  CheckCircle, ChevronRight, Stethoscope, Apple
} from "lucide-react";

const stats = [
  { label: "Partner Gyms", value: "2,400+", icon: Dumbbell },
  { label: "Active Users", value: "180K+", icon: Users },
  { label: "Doctors On-Call", value: "850+", icon: Stethoscope },
  { label: "Cities Covered", value: "42", icon: TrendingUp },
];

const features = [
  {
    icon: Dumbbell,
    title: "Gym Discovery",
    description: "Access 2,400+ partner gyms across India. Pay only for the days you attend — no long-term contracts.",
    color: "from-[#8B5CF6] to-[#7C3AED]",
    href: "/gyms",
    badge: "Uber for Gym",
  },
  {
    icon: Brain,
    title: "AI Fitness Coach",
    description: "Personalized workout plans, real-time guidance, and progress tracking powered by AI. Gets smarter over time.",
    color: "from-[#34D399] to-[#10B981]",
    href: "/chatbot",
    badge: "AI-Powered",
  },
  {
    icon: Heart,
    title: "Health Hub",
    description: "Consult doctors, dietitians, and specialists online. Book appointments, get prescriptions — all in-app.",
    color: "from-[#F59E0B] to-[#D97706]",
    href: "/health-hub",
    badge: "24/7 Care",
  },
  {
    icon: Apple,
    title: "Personalized Nutrition",
    description: "Upload your blood reports and get AI-driven supplement and diet recommendations tailored to your body.",
    color: "from-[#EC4899] to-[#BE185D]",
    href: "/nutrition",
    badge: "Lab-Synced",
  },
  {
    icon: FlaskConical,
    title: "Diagnostics & Labs",
    description: "Book blood tests, urine tests, X-rays, and more. Get results digitally and share with your doctors instantly.",
    color: "from-[#06B6D4] to-[#0891B2]",
    href: "/health-hub",
    badge: "Home Collection",
  },
  {
    icon: Shield,
    title: "Medical Records",
    description: "Your complete health history in one secure place. Share with any doctor, anytime — no paperwork.",
    color: "from-[#8B5CF6] to-[#34D399]",
    href: "/records",
    badge: "HIPAA Secure",
  },
];

const howItWorks = [
  { step: "01", title: "Create Your Profile", desc: "Sign up and build your health profile with goals, fitness level, and medical history." },
  { step: "02", title: "Connect Your Apps", desc: "Sync Strava, NRC, and fitness devices to auto-import your activity history." },
  { step: "03", title: "Access Everything", desc: "Browse gyms, consult doctors, chat with AI coach, and order supplements — all from one app." },
  { step: "04", title: "Track & Improve", desc: "Monitor progress, get personalized recommendations, and let your health data work for you." },
];

const testimonials = [
  { name: "Arjun Mehta", role: "Software Engineer, Mumbai", text: "medIt replaced 4 different apps for me. Gym, doctor, diet tracker — all in one. The AI coach is genuinely impressive.", rating: 5 },
  { name: "Priya Sharma", role: "Marketing Lead, Delhi", text: "The flex gym membership is a game-changer. I travel a lot and being able to walk into any partner gym is incredible.", rating: 5 },
  { name: "Rahul Verma", role: "Entrepreneur, Bangalore", text: "Got my blood reports analyzed, got personalized supplements, booked a dietitian — all within the same day. Wild.", rating: 5 },
];

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#8B5CF6] opacity-10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#34D399] opacity-8 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8B5CF6] opacity-5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 text-[#A78BFA] text-sm font-medium mb-8">
            <Zap className="w-3.5 h-3.5" />
            India&apos;s First Health & Fitness Super-App
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
            Your Health.{" "}
            <span className="gradient-text">All in One</span>
            <br />
            Place.
          </h1>

          <p className="text-lg sm:text-xl text-[#9CA3AF] max-w-2xl mx-auto mb-10 leading-relaxed">
            Gym access, AI coaching, doctor consultations, diagnostic labs, personalized
            nutrition, and medical records — unified in a single powerful app.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/membership"
              className="px-8 py-4 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold text-lg transition-all duration-200 hover:shadow-xl hover:shadow-[#8B5CF6]/30 hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/gyms"
              className="px-8 py-4 rounded-xl bg-[#1F2937] hover:bg-[#374151] text-[#F9FAFB] font-semibold text-lg transition-all duration-200 border border-[#374151] hover:border-[#4B5563] flex items-center justify-center gap-2"
            >
              <Dumbbell className="w-5 h-5 text-[#8B5CF6]" />
              Browse Gyms
            </Link>
          </div>

          {/* App integrations */}
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <span className="text-sm text-[#6B7280]">Syncs with</span>
            {["Strava", "Nike Run Club", "Apple Health", "Google Fit"].map((app) => (
              <span
                key={app}
                className="px-3 py-1.5 rounded-lg bg-[#1F2937] border border-[#374151] text-sm text-[#9CA3AF]"
              >
                {app}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-[#374151] bg-[#1F2937]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Icon className="w-4 h-4 text-[#8B5CF6]" />
                  <span className="text-2xl sm:text-3xl font-bold text-[#F9FAFB]">{value}</span>
                </div>
                <p className="text-sm text-[#9CA3AF]">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Everything you need,{" "}
            <span className="gradient-text">nothing you don&apos;t</span>
          </h2>
          <p className="text-[#9CA3AF] text-lg max-w-xl mx-auto">
            Six powerful modules working together to give you a complete health ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Link
              key={feature.title}
              href={feature.href}
              className="group relative p-6 rounded-2xl bg-[#1F2937] border border-[#374151] hover:border-[#8B5CF6]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#8B5CF6]/10"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#374151] text-[#9CA3AF] text-xs font-medium">
                  {feature.badge}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-[#F9FAFB] mb-2">{feature.title}</h3>
              <p className="text-sm text-[#9CA3AF] leading-relaxed mb-4">{feature.description}</p>
              <div className="flex items-center gap-1 text-[#8B5CF6] text-sm font-medium group-hover:gap-2 transition-all">
                Explore
                <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-[#0D1117]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How medIt Works</h2>
            <p className="text-[#9CA3AF] text-lg">From sign-up to a healthier you in four steps.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item, i) => (
              <div key={item.step} className="relative">
                {i < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-px bg-gradient-to-r from-[#374151] to-transparent z-0" />
                )}
                <div className="relative z-10 text-center">
                  <div className="w-20 h-20 rounded-2xl bg-[#1F2937] border border-[#374151] flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-black gradient-text">{item.step}</span>
                  </div>
                  <h3 className="text-base font-semibold text-[#F9FAFB] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#9CA3AF] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Loved by <span className="gradient-text">180,000+ users</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="p-6 rounded-2xl bg-[#1F2937] border border-[#374151]">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
                ))}
              </div>
              <p className="text-[#D1D5DB] text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
              <div>
                <p className="font-semibold text-[#F9FAFB] text-sm">{t.name}</p>
                <p className="text-xs text-[#9CA3AF]">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#0D1117]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-10 sm:p-16 rounded-3xl bg-gradient-to-br from-[#1E1B4B] to-[#1F2937] border border-[#8B5CF6]/30 glow-violet">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Start your health journey{" "}
              <span className="gradient-text">today</span>
            </h2>
            <p className="text-[#9CA3AF] text-lg mb-8 max-w-xl mx-auto">
              Join 180,000+ users who have transformed their health with medIt.
              First 30 days free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/membership"
                className="px-8 py-4 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-semibold text-lg transition-all hover:shadow-xl hover:shadow-[#8B5CF6]/30 hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/health-hub"
                className="px-8 py-4 rounded-xl bg-transparent border border-[#4B5563] hover:border-[#8B5CF6]/50 text-[#F9FAFB] font-semibold text-lg transition-all flex items-center justify-center gap-2"
              >
                <Stethoscope className="w-5 h-5 text-[#34D399]" />
                Talk to a Doctor
              </Link>
            </div>
            <div className="mt-8 flex items-center justify-center gap-6 flex-wrap text-sm text-[#9CA3AF]">
              {["No credit card required", "Cancel anytime", "HIPAA compliant"].map((item) => (
                <div key={item} className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-[#34D399]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
