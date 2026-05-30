import { Apple, FlaskConical, Pill, TrendingUp, Upload, CheckCircle } from "lucide-react";

const supplements = [
  { name: "Vitamin D3 + K2", reason: "Low serum vitamin D detected", dosage: "2000 IU / day", tag: "Deficiency" },
  { name: "Omega-3 Fish Oil", reason: "Supports cardiovascular health", dosage: "1g / day", tag: "Heart" },
  { name: "Magnesium Glycinate", reason: "Improved sleep & muscle recovery", dosage: "400mg / night", tag: "Recovery" },
  { name: "Whey Protein Isolate", reason: "Meet daily protein targets", dosage: "25g post-workout", tag: "Performance" },
];

const macros = [
  { label: "Calories", value: "2,150", unit: "kcal", pct: 72 },
  { label: "Protein", value: "148", unit: "g", pct: 85 },
  { label: "Carbs", value: "210", unit: "g", pct: 60 },
  { label: "Fats", value: "68", unit: "g", pct: 78 },
];

export default function NutritionPage() {
  return (
    <div className="min-h-screen bg-[#111827]">
      {/* Header */}
      <div className="bg-[#0D1117] border-b border-[#374151] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-2 flex items-center gap-2 text-[#EC4899] text-sm font-medium">
            <Apple className="w-4 h-4" />
            Personalized Nutrition
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Nutrition Built Around Your Biology</h1>
          <p className="text-[#9CA3AF]">
            Upload blood reports and get AI-driven supplement and diet recommendations tailored to your body.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Upload CTA */}
        <div className="p-8 rounded-2xl bg-[#1F2937] border border-dashed border-[#4B5563] hover:border-[#8B5CF6] transition-colors text-center cursor-pointer group">
          <div className="w-14 h-14 rounded-2xl bg-[#374151] group-hover:bg-[#8B5CF6]/20 flex items-center justify-center mx-auto mb-4 transition-colors">
            <Upload className="w-7 h-7 text-[#9CA3AF] group-hover:text-[#8B5CF6] transition-colors" />
          </div>
          <h3 className="font-semibold text-[#F9FAFB] mb-1">Upload Blood Report</h3>
          <p className="text-sm text-[#9CA3AF] mb-4">PDF or image — our AI reads and analyses it instantly.</p>
          <button className="px-6 py-2 rounded-lg bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-sm font-medium transition-all">
            <span className="flex items-center gap-2">
              <FlaskConical className="w-4 h-4" />
              Upload Report
            </span>
          </button>
        </div>

        {/* Today's Macros */}
        <div>
          <h2 className="text-xl font-bold text-[#F9FAFB] mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#34D399]" />
            Today&apos;s Macros
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {macros.map((m) => (
              <div key={m.label} className="p-5 rounded-2xl bg-[#1F2937] border border-[#374151]">
                <p className="text-sm text-[#9CA3AF] mb-1">{m.label}</p>
                <p className="text-2xl font-bold text-[#F9FAFB]">
                  {m.value}
                  <span className="text-sm font-normal text-[#9CA3AF] ml-1">{m.unit}</span>
                </p>
                <div className="mt-3 h-1.5 rounded-full bg-[#374151]">
                  <div
                    className="h-1.5 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#34D399]"
                    style={{ width: `${m.pct}%` }}
                  />
                </div>
                <p className="text-xs text-[#6B7280] mt-1">{m.pct}% of goal</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Supplements */}
        <div>
          <h2 className="text-xl font-bold text-[#F9FAFB] mb-4 flex items-center gap-2">
            <Pill className="w-5 h-5 text-[#EC4899]" />
            Recommended Supplements
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {supplements.map((s) => (
              <div key={s.name} className="p-5 rounded-2xl bg-[#1F2937] border border-[#374151] flex items-start gap-4">
                <CheckCircle className="w-5 h-5 text-[#34D399] flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h4 className="font-semibold text-[#F9FAFB] text-sm">{s.name}</h4>
                    <span className="px-2 py-0.5 rounded-full bg-[#374151] text-[#9CA3AF] text-xs">{s.tag}</span>
                  </div>
                  <p className="text-xs text-[#9CA3AF] mb-1">{s.reason}</p>
                  <p className="text-xs text-[#8B5CF6] font-medium">{s.dosage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
