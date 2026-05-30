"use client";
import { useState, useMemo } from "react";
import { Search, MapPin, Star, Filter, ArrowUpDown, Calendar, SlidersHorizontal, X, Stethoscope } from "lucide-react";
import Link from "next/link";
import { DOCTORS } from "@/lib/doctors";
import { useAppointments } from "@/contexts/AppointmentContext";

const SPECIALTIES = [
  "All", "Cardiologist", "Dermatologist", "General Physician",
  "Neurologist", "Orthopedic", "Pediatrician", "Psychiatrist",
  "Dentist", "ENT Specialist",
];

const SORT_OPTIONS = [
  "Recommended", "Rating", "Experience",
  "Price: Low to High", "Price: High to Low",
];

const LOCATIONS = ["All", "Delhi", "Mumbai", "Bangalore", "Hyderabad", "Gurugram", "Kochi", "Kolkata", "Guwahati", "Pune"];

export default function HealthHubPage() {
  const { isDayFullyBooked } = useAppointments();

  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("All");
  const [specialty, setSpecialty] = useState("All");
  const [sortBy, setSortBy] = useState("Recommended");
  const [selectedDate, setSelectedDate] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    return DOCTORS.filter((doc) => {
      const q = search.toLowerCase();
      const matchSearch = doc.name.toLowerCase().includes(q) || doc.specialty.toLowerCase().includes(q) || doc.hospital.toLowerCase().includes(q);
      const matchLocation = locationFilter === "All" || doc.location === locationFilter;
      const matchSpecialty = specialty === "All" || doc.specialty === specialty;
      const matchDate = !selectedDate || !isDayFullyBooked(doc.id, selectedDate);
      return matchSearch && matchLocation && matchSpecialty && matchDate;
    }).sort((a, b) => {
      if (sortBy === "Price: Low to High") return a.feeAmount - b.feeAmount;
      if (sortBy === "Price: High to Low") return b.feeAmount - a.feeAmount;
      if (sortBy === "Rating") return b.rating - a.rating;
      if (sortBy === "Experience") return b.experienceYears - a.experienceYears;
      return 0;
    });
  }, [search, locationFilter, specialty, sortBy, selectedDate, isDayFullyBooked]);

  const clearAll = () => { setSearch(""); setLocationFilter("All"); setSpecialty("All"); setSelectedDate(""); };
  const hasFilters = search || locationFilter !== "All" || specialty !== "All" || selectedDate;

  return (
    <div className="min-h-screen bg-[#111827]">
      {/* Page header */}
      <div className="bg-[#0D1117] border-b border-[#374151] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-[#34D399] text-sm font-medium mb-2">
            <Stethoscope className="w-4 h-4" /> Find a Specialist
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-1">Browse Doctors</h1>
          <p className="text-[#9CA3AF]">Book appointments with verified specialists across India.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Sticky search panel */}
        <div className="sticky top-16 z-20 bg-[#1F2937] border border-[#374151] rounded-2xl p-4 sm:p-5 mb-8 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-[#9CA3AF]">
              <span className="font-semibold text-[#F9FAFB]">{filtered.length}</span> doctors available
            </span>
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className={`md:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm transition-all ${filtersOpen ? "border-[#8B5CF6] bg-[#8B5CF6]/10 text-[#A78BFA]" : "border-[#374151] text-[#9CA3AF]"}`}
            >
              {filtersOpen ? <X className="w-4 h-4" /> : <SlidersHorizontal className="w-4 h-4" />}
              Filters
            </button>
          </div>

          {/* Search */}
          <div className="flex gap-2 mb-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
              <input
                type="text"
                placeholder="Search doctors, specialties, hospitals…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#111827] border border-[#374151] text-[#F9FAFB] placeholder-[#4B5563] focus:outline-none focus:border-[#8B5CF6] text-sm"
              />
            </div>
          </div>

          {/* Secondary filters */}
          <div className={`${filtersOpen ? "grid" : "hidden"} md:grid grid-cols-1 md:grid-cols-4 gap-3`}>
            {/* Date */}
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
              <input
                type="date"
                value={selectedDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#111827] border border-[#374151] text-[#9CA3AF] focus:outline-none focus:border-[#8B5CF6] text-sm"
              />
            </div>
            {/* Location */}
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
              <select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-[#111827] border border-[#374151] text-[#9CA3AF] focus:outline-none focus:border-[#8B5CF6] text-sm appearance-none">
                {LOCATIONS.map((l) => <option key={l}>{l}</option>)}
              </select>
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-[#6B7280] pointer-events-none" />
            </div>
            {/* Specialty */}
            <div className="relative">
              <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
              <select value={specialty} onChange={(e) => setSpecialty(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-[#111827] border border-[#374151] text-[#9CA3AF] focus:outline-none focus:border-[#8B5CF6] text-sm appearance-none">
                {SPECIALTIES.map((s) => <option key={s}>{s}</option>)}
              </select>
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-[#6B7280] pointer-events-none" />
            </div>
            {/* Sort */}
            <div className="relative">
              <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-[#111827] border border-[#374151] text-[#9CA3AF] focus:outline-none focus:border-[#8B5CF6] text-sm appearance-none">
                {SORT_OPTIONS.map((s) => <option key={s}>{s}</option>)}
              </select>
              <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-[#6B7280] pointer-events-none" />
            </div>
          </div>

          {/* Active filter tags */}
          {hasFilters && (
            <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-[#374151]">
              {specialty !== "All" && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 text-[#A78BFA] text-xs font-medium">
                  {specialty}
                  <button onClick={() => setSpecialty("All")} className="hover:text-white ml-0.5">×</button>
                </span>
              )}
              {locationFilter !== "All" && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#34D399]/10 border border-[#34D399]/30 text-[#34D399] text-xs font-medium">
                  {locationFilter}
                  <button onClick={() => setLocationFilter("All")} className="hover:text-white ml-0.5">×</button>
                </span>
              )}
              {search && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#374151] text-[#9CA3AF] text-xs font-medium">
                  &ldquo;{search}&rdquo;
                  <button onClick={() => setSearch("")} className="hover:text-white ml-0.5">×</button>
                </span>
              )}
              {selectedDate && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#374151] text-[#9CA3AF] text-xs font-medium">
                  {selectedDate}
                  <button onClick={() => setSelectedDate("")} className="hover:text-white ml-0.5">×</button>
                </span>
              )}
              <button onClick={clearAll} className="text-red-400 hover:text-red-300 text-xs font-medium px-2">Clear All</button>
            </div>
          )}
        </div>

        {/* Doctor grid */}
        {filtered.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((doc) => (
              <div key={doc.id} className="group bg-[#1F2937] border border-[#374151] rounded-2xl overflow-hidden hover:border-[#8B5CF6]/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#8B5CF6]/10 transition-all duration-300 flex flex-col">
                <div className="p-5 flex gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={doc.image} alt={doc.name} className="w-20 h-20 rounded-xl object-cover flex-shrink-0 bg-[#374151]" />
                  <div className="min-w-0">
                    <Link href={`/doctors/${doc.id}`}>
                      <h3 className="font-bold text-[#F9FAFB] text-base group-hover:text-[#A78BFA] transition-colors line-clamp-1">{doc.name}</h3>
                    </Link>
                    <p className="text-[#8B5CF6] font-semibold text-sm">{doc.specialty}</p>
                    <p className="text-[#6B7280] text-xs mt-0.5 line-clamp-1">{doc.qualification}</p>
                    <span className="inline-flex items-center mt-2 px-2 py-0.5 rounded bg-[#374151] text-[#9CA3AF] text-xs font-medium">
                      {doc.experience} Exp.
                    </span>
                  </div>
                </div>

                <div className="px-5 flex-1">
                  <div className="flex items-center gap-4 text-xs text-[#9CA3AF] mb-3">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{doc.location}</span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-[#F59E0B] text-[#F59E0B]" />
                      <span className="font-semibold text-[#F9FAFB]">{doc.rating}</span>
                      <span>({doc.reviews})</span>
                    </span>
                  </div>
                  <div className="h-px bg-[#374151] mb-3" />
                  <p className="text-[#9CA3AF] text-xs leading-relaxed line-clamp-2 mb-4">{doc.about}</p>
                </div>

                <div className="px-5 py-4 bg-[#111827] border-t border-[#374151] flex items-center justify-between mt-auto">
                  <div>
                    <p className="text-[10px] text-[#6B7280] uppercase font-bold tracking-wider">Fee</p>
                    <p className="text-[#F9FAFB] font-bold text-lg">{doc.fee}</p>
                  </div>
                  <Link href={`/doctors/${doc.id}`}
                    className="px-4 py-2 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-sm font-semibold transition-all hover:shadow-lg hover:shadow-[#8B5CF6]/25">
                    Book Visit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#1F2937] border border-dashed border-[#374151] rounded-2xl">
            <Search className="w-12 h-12 text-[#374151] mx-auto mb-4" />
            <h3 className="font-bold text-[#F9FAFB] mb-2">No doctors found</h3>
            <p className="text-[#9CA3AF] text-sm mb-6 max-w-xs mx-auto">Try adjusting your filters or clearing the search.</p>
            <button onClick={clearAll} className="px-5 py-2 rounded-xl border border-[#374151] text-[#9CA3AF] hover:text-white hover:border-[#8B5CF6] text-sm transition-all">
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
