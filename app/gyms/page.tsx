"use client";
import dynamic from "next/dynamic";
import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Search, Star, MapPin, Clock, Navigation, X,
  LocateFixed, ChevronRight, Wifi, Car, Droplets, Flame,
  CheckCircle, LogIn, Phone
} from "lucide-react";
import Link from "next/link";
import type { PlaceMarker, LayerType } from "@/lib/map-data";
import { LAYER_META, getMarkersForLayer } from "@/lib/map-data";
import { GYMS } from "@/lib/data";
import { useAuth } from "@/contexts/AuthContext";
import { PLAN_LABELS, PLAN_COLORS } from "@/lib/auth";

const MapView = dynamic(() => import("@/components/MapView"), { ssr: false });

const SUBSCRIPTION_PRICE = 1999;

const LAYER_ORDER: LayerType[] = ["gyms", "hospitals", "clinics", "labs", "pharmacies"];

const amenityIcons: Record<string, React.ReactNode> = {
  Wifi:    <Wifi    className="w-3 h-3" />,
  AC:      <Flame   className="w-3 h-3" />,
  Pool:    <Droplets className="w-3 h-3" />,
  Parking: <Car     className="w-3 h-3" />,
};

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Convert Gym data to PlaceMarker shape
const GYM_PLACE_MARKERS: PlaceMarker[] = GYMS.map((g) => ({
  id: g.id, name: g.name, lat: g.lat, lng: g.lng,
  address: g.address, city: g.city, sublabel: g.open,
  layerType: "gyms", phone: g.phone, rating: g.rating, image: g.image,
}));

function MapPageInner() {
  const searchParams = useSearchParams();
  const { user, loading: authLoading } = useAuth();

  const [layer, setLayer] = useState<LayerType>((searchParams.get("layer") as LayerType) ?? "gyms");
  const [search, setSearch] = useState("");
  const [selectedMarker, setSelectedMarker] = useState<PlaceMarker | null>(null);
  const [flyTo, setFlyTo] = useState<{ lat: number; lng: number } | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locating, setLocating] = useState(false);

  // Handle ?focus=<id> from "View on Map" links on doctor/gym pages
  useEffect(() => {
    const focusId = searchParams.get("focus");
    const paramLayer = searchParams.get("layer") as LayerType | null;
    if (paramLayer) setLayer(paramLayer);
    if (focusId) {
      const allMarkers = getMarkersForLayer(paramLayer ?? layer, GYM_PLACE_MARKERS);
      const target = allMarkers.find((m) => m.id === Number(focusId));
      if (target) {
        setSelectedMarker(target);
        setFlyTo({ lat: target.lat, lng: target.lng });
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const allMarkers = getMarkersForLayer(layer, GYM_PLACE_MARKERS);
  const filtered = allMarkers.filter((m) => {
    const q = search.toLowerCase();
    return m.name.toLowerCase().includes(q) || m.city.toLowerCase().includes(q) || m.sublabel.toLowerCase().includes(q);
  });

  const locateUser = useCallback(() => {
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserLocation(loc);
        setFlyTo(loc);
        setLocating(false);
      },
      () => setLocating(false)
    );
  }, []);

  function selectMarker(m: PlaceMarker) {
    setSelectedMarker(m);
    setFlyTo({ lat: m.lat, lng: m.lng });
  }

  function changeLayer(l: LayerType) {
    setLayer(l);
    setSelectedMarker(null);
    setSearch("");
  }

  const getNavUrl = (m: PlaceMarker) =>
    `https://www.google.com/maps/dir/?api=1&destination=${m.lat},${m.lng}`;

  const distanceLabel = (m: PlaceMarker) =>
    userLocation
      ? `${haversineKm(userLocation.lat, userLocation.lng, m.lat, m.lng).toFixed(1)} km away`
      : m.city;

  const isSubscribed = !authLoading && !!user;

  // Gym data for the selected gym overlay (amenities, tags, etc.)
  const selectedGym = selectedMarker?.layerType === "gyms"
    ? GYMS.find((g) => g.id === selectedMarker.id)
    : null;

  const meta = LAYER_META[layer];

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col">
      {/* Top bar */}
      <div className="bg-[#0D1117] border-b border-[#374151] px-4 sm:px-6 py-3 flex-shrink-0 space-y-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          {/* Title */}
          <span className="font-bold text-[#F9FAFB] text-lg flex-shrink-0">Map</span>

          {/* Layer selector — radio pills */}
          <div className="flex gap-1.5 overflow-x-auto scrollbar-none flex-1">
            {LAYER_ORDER.map((l) => {
              const m = LAYER_META[l];
              const active = layer === l;
              return (
                <button
                  key={l}
                  onClick={() => changeLayer(l)}
                  style={active ? { borderColor: m.pinColor, background: `${m.pinColor}20`, color: m.accentColor } : {}}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-medium transition-all ${
                    active ? "shadow-sm" : "border-[#374151] text-[#9CA3AF] hover:border-[#4B5563] hover:text-[#F9FAFB]"
                  }`}
                >
                  <span>{m.emoji}</span>
                  {m.label}
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="relative flex-shrink-0 w-full sm:w-52">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
            <input
              type="text"
              placeholder={`Search ${meta.label.toLowerCase()}…`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#1F2937] border border-[#374151] text-[#F9FAFB] placeholder-[#6B7280] focus:outline-none focus:border-[#8B5CF6] text-sm"
            />
          </div>

          {/* My Location */}
          <button
            onClick={locateUser}
            disabled={locating}
            className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#1F2937] border border-[#374151] text-[#9CA3AF] hover:text-white hover:border-[#8B5CF6] transition-all text-sm disabled:opacity-50"
          >
            <LocateFixed className={`w-4 h-4 ${locating ? "animate-spin" : ""}`} />
            {locating ? "Locating…" : "My Location"}
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-72 flex-shrink-0 bg-[#111827] border-r border-[#374151] overflow-y-auto flex flex-col">
          <div className="px-4 py-2.5 text-xs text-[#6B7280] border-b border-[#374151] flex items-center gap-1.5">
            <span>{meta.emoji}</span>
            <span><span className="text-[#F9FAFB] font-medium">{filtered.length}</span> {meta.label.toLowerCase()}</span>
            {user && layer === "gyms" && (
              <span className={`ml-auto text-[10px] font-semibold px-2 py-0.5 rounded border ${PLAN_COLORS[user.plan]}`}>
                {PLAN_LABELS[user.plan]}
              </span>
            )}
          </div>

          <div className="flex-1 divide-y divide-[#1F2937]">
            {filtered.map((m) => (
              <button
                key={`${m.layerType}-${m.id}`}
                onClick={() => selectMarker(m)}
                className={`w-full text-left px-4 py-3 transition-all hover:bg-[#1F2937] ${selectedMarker?.id === m.id && selectedMarker?.layerType === m.layerType ? "bg-[#1F2937] border-l-2" : ""}`}
                style={selectedMarker?.id === m.id && selectedMarker?.layerType === m.layerType ? { borderLeftColor: meta.pinColor } : {}}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-white text-[10px] font-black"
                    style={{ background: meta.pinColor + "33", border: `1px solid ${meta.pinColor}55`, color: meta.accentColor }}
                  >
                    {m.image}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[#F9FAFB] text-sm truncate">{m.name}</h3>
                    <p className="text-[10px] text-[#9CA3AF] mt-0.5 truncate">{m.sublabel}</p>
                    <div className="flex items-center gap-1 text-[10px] text-[#6B7280] mt-0.5">
                      <MapPin className="w-2.5 h-2.5" />
                      <span className="truncate">{distanceLabel(m)}</span>
                      {m.rating && (
                        <span className="ml-auto flex items-center gap-0.5 text-[#F59E0B]">
                          <Star className="w-2.5 h-2.5 fill-[#F59E0B]" />{m.rating}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
            {filtered.length === 0 && (
              <div className="p-6 text-center text-[#6B7280] text-sm">No results. Clear the search.</div>
            )}
          </div>
        </div>

        {/* Map */}
        <div className="flex-1 relative">
          <MapView
            markers={filtered}
            selectedId={selectedMarker?.id ?? null}
            userLocation={userLocation}
            flyTo={flyTo}
            onSelectMarker={selectMarker}
          />

          {/* Detail overlay card */}
          {selectedMarker && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000] w-[min(440px,calc(100%-2rem))]">
              <div className="bg-[#111827] border border-[#374151] rounded-2xl shadow-2xl overflow-hidden">
                {/* colour strip */}
                <div className="h-1.5" style={{ background: `linear-gradient(to right, ${meta.pinColor}, ${meta.accentColor})` }} />

                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-base">{meta.emoji}</span>
                        <h3 className="font-bold text-[#F9FAFB] text-sm">{selectedMarker.name}</h3>
                      </div>
                      <p className="text-[#9CA3AF] text-xs flex items-center gap-1">
                        <MapPin className="w-3 h-3" />{selectedMarker.address}
                      </p>
                    </div>
                    <button onClick={() => setSelectedMarker(null)}
                      className="p-1 rounded-lg text-[#6B7280] hover:text-white hover:bg-[#374151] transition-all ml-2 flex-shrink-0">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Metadata row */}
                  <div className="flex items-center flex-wrap gap-3 text-xs mb-3">
                    {selectedMarker.rating && (
                      <span className="flex items-center gap-1 text-[#F59E0B]">
                        <Star className="w-3 h-3 fill-[#F59E0B]" />
                        <span className="font-semibold">{selectedMarker.rating}</span>
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-[#9CA3AF]">
                      <Clock className="w-3 h-3" />{selectedMarker.sublabel}
                    </span>
                    {selectedMarker.phone && (
                      <span className="flex items-center gap-1 text-[#9CA3AF]">
                        <Phone className="w-3 h-3" />{selectedMarker.phone}
                      </span>
                    )}
                    {userLocation && (
                      <span style={{ color: meta.accentColor }} className="font-medium">
                        {haversineKm(userLocation.lat, userLocation.lng, selectedMarker.lat, selectedMarker.lng).toFixed(1)} km
                      </span>
                    )}
                  </div>

                  {/* Gym-specific: amenities + subscription */}
                  {selectedMarker.layerType === "gyms" && selectedGym && (
                    <>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {selectedGym.amenities.slice(0, 4).map((a) => (
                          <span key={a} className="px-2 py-1 rounded-md bg-[#1F2937] border border-[#374151] text-[#9CA3AF] text-xs flex items-center gap-1">
                            {amenityIcons[a] ?? null} {a}
                          </span>
                        ))}
                      </div>

                      {authLoading ? (
                        <div className="h-14 rounded-xl bg-[#1F2937] animate-pulse mb-4" />
                      ) : isSubscribed ? (
                        <div className="flex items-center gap-3 bg-[#34D399]/10 border border-[#34D399]/25 rounded-xl px-4 py-2.5 mb-4">
                          <CheckCircle className="w-4 h-4 text-[#34D399] flex-shrink-0" />
                          <div>
                            <p className="text-xs font-semibold text-[#34D399]">Access Active</p>
                            <p className="text-[10px] text-[#9CA3AF]">{PLAN_LABELS[user!.plan]} Plan · Unlimited visits</p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between bg-[#1F2937] rounded-xl px-4 py-2.5 mb-4">
                          <div>
                            <p className="text-[10px] text-[#9CA3AF]">Access via subscription</p>
                            <p className="font-bold text-[#F9FAFB] text-sm">₹{SUBSCRIPTION_PRICE.toLocaleString()}<span className="text-[#9CA3AF] font-normal text-xs">/mo</span></p>
                          </div>
                          <span className="px-2 py-1 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 text-[#A78BFA] text-[10px] font-medium">
                            Unlimited
                          </span>
                        </div>
                      )}
                    </>
                  )}

                  {/* Action buttons */}
                  <div className="flex gap-2">
                    {selectedMarker.layerType === "gyms" ? (
                      isSubscribed ? (
                        <Link href={`/gyms/${selectedMarker.id}`}
                          className="flex-1 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-sm font-semibold text-center transition-all flex items-center justify-center gap-1.5">
                          Check In <ChevronRight className="w-4 h-4" />
                        </Link>
                      ) : (
                        <Link href="/signin"
                          className="flex-1 py-2.5 rounded-xl bg-[#1F2937] border border-[#374151] hover:border-[#8B5CF6]/50 text-[#9CA3AF] hover:text-white text-sm font-semibold text-center transition-all flex items-center justify-center gap-1.5">
                          <LogIn className="w-4 h-4" /> Sign In to Check In
                        </Link>
                      )
                    ) : selectedMarker.layerType === "clinics" ? (
                      <Link href={`/doctors/${selectedMarker.id}`}
                        className="flex-1 py-2.5 rounded-xl text-white text-sm font-semibold text-center transition-all flex items-center justify-center gap-1.5"
                        style={{ background: meta.pinColor }}>
                        Book Appointment <ChevronRight className="w-4 h-4" />
                      </Link>
                    ) : (
                      <div className="flex-1 py-2.5 rounded-xl text-white text-sm font-semibold text-center"
                        style={{ background: meta.pinColor + "33", color: meta.accentColor, border: `1px solid ${meta.pinColor}55` }}>
                        {meta.emoji} {meta.label}
                      </div>
                    )}

                    <a href={getNavUrl(selectedMarker)} target="_blank" rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-[#1F2937] border border-[#374151] hover:border-[#8B5CF6]/50 text-[#9CA3AF] hover:text-white text-sm transition-all flex items-center gap-1.5">
                      <Navigation className="w-4 h-4" /> Navigate
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MapPage() {
  return (
    <Suspense fallback={
      <div className="h-[calc(100vh-64px)] flex items-center justify-center bg-[#111827]">
        <div className="w-8 h-8 border-2 border-[#8B5CF6] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <MapPageInner />
    </Suspense>
  );
}
