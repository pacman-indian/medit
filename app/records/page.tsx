import { Shield, FileText, FlaskConical, Pill, Upload, Lock, Share2 } from "lucide-react";

const records = [
  {
    icon: FlaskConical,
    type: "Lab Report",
    name: "Complete Blood Count",
    date: "12 May 2026",
    doctor: "Dr. Anita Rao",
    color: "from-[#06B6D4] to-[#0891B2]",
  },
  {
    icon: FileText,
    type: "Prescription",
    name: "Vitamin D & Omega-3",
    date: "08 May 2026",
    doctor: "Dr. Suresh Kumar",
    color: "from-[#8B5CF6] to-[#7C3AED]",
  },
  {
    icon: Pill,
    type: "Vaccination",
    name: "COVID-19 Booster",
    date: "02 Apr 2026",
    doctor: "City Health Clinic",
    color: "from-[#34D399] to-[#10B981]",
  },
  {
    icon: FileText,
    type: "Imaging",
    name: "Chest X-Ray",
    date: "15 Mar 2026",
    doctor: "Dr. Meera Pillai",
    color: "from-[#F59E0B] to-[#D97706]",
  },
];

export default function RecordsPage() {
  return (
    <div className="min-h-screen bg-[#111827]">
      {/* Header */}
      <div className="bg-[#0D1117] border-b border-[#374151] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-2 flex items-center gap-2 text-[#8B5CF6] text-sm font-medium">
            <Shield className="w-4 h-4" />
            Medical Records
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Your Health History, Secured</h1>
          <p className="text-[#9CA3AF]">
            All your prescriptions, lab reports, and imaging in one HIPAA-compliant vault.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* Security badge */}
        <div className="flex items-center gap-3 p-4 rounded-xl bg-[#1F2937] border border-[#374151] w-fit">
          <Lock className="w-5 h-5 text-[#34D399]" />
          <span className="text-sm text-[#9CA3AF]">
            End-to-end encrypted · <span className="text-[#F9FAFB]">HIPAA Compliant</span>
          </span>
        </div>

        {/* Upload */}
        <div className="p-6 rounded-2xl bg-[#1F2937] border border-dashed border-[#4B5563] hover:border-[#8B5CF6] transition-colors cursor-pointer group flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#374151] group-hover:bg-[#8B5CF6]/20 flex items-center justify-center transition-colors flex-shrink-0">
            <Upload className="w-5 h-5 text-[#9CA3AF] group-hover:text-[#8B5CF6] transition-colors" />
          </div>
          <div>
            <h3 className="font-semibold text-[#F9FAFB] text-sm">Upload a Document</h3>
            <p className="text-xs text-[#9CA3AF]">PDF, JPG, PNG — lab reports, prescriptions, discharge summaries</p>
          </div>
        </div>

        {/* Records list */}
        <div>
          <h2 className="text-lg font-bold text-[#F9FAFB] mb-4">Recent Records</h2>
          <div className="space-y-3">
            {records.map((r) => (
              <div
                key={r.name}
                className="flex items-center gap-4 p-5 rounded-2xl bg-[#1F2937] border border-[#374151] hover:border-[#8B5CF6]/50 transition-all group"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${r.color} flex items-center justify-center flex-shrink-0`}>
                  <r.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs text-[#9CA3AF]">{r.type}</span>
                  </div>
                  <h4 className="font-semibold text-[#F9FAFB] text-sm">{r.name}</h4>
                  <p className="text-xs text-[#6B7280]">{r.doctor} · {r.date}</p>
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg hover:bg-[#374151] text-[#9CA3AF] hover:text-white">
                  <Share2 className="w-4 h-4" />
                </button>
                <button className="px-3 py-1.5 rounded-lg bg-[#374151] hover:bg-[#4B5563] text-[#F9FAFB] text-xs font-medium transition-all">
                  View
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
