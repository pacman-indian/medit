import { DOCTORS } from "./doctors";
// GYMS export alias is a placeholder — the map page converts GYMS itself
export const GYMS = [] as PlaceMarker[];

export type LayerType = "gyms" | "hospitals" | "clinics" | "labs" | "pharmacies";

export interface PlaceMarker {
  id: number;
  name: string;
  lat: number;
  lng: number;
  address: string;
  city: string;
  sublabel: string;   // open hours / specialty / category
  layerType: LayerType;
  phone?: string;
  rating?: number;
  image: string;      // 2-letter initials for the pin
}

export const LAYER_META: Record<LayerType, { label: string; emoji: string; pinColor: string; accentColor: string }> = {
  gyms:       { label: "Gyms",       emoji: "🏋️", pinColor: "#8B5CF6", accentColor: "#A78BFA" },
  hospitals:  { label: "Hospitals",  emoji: "🏥", pinColor: "#EC4899", accentColor: "#F472B6" },
  clinics:    { label: "Clinics",    emoji: "🩺", pinColor: "#34D399", accentColor: "#6EE7B7" },
  labs:       { label: "Test Labs",  emoji: "🧪", pinColor: "#06B6D4", accentColor: "#67E8F9" },
  pharmacies: { label: "Pharmacies", emoji: "💊", pinColor: "#F59E0B", accentColor: "#FCD34D" },
};

// Derived from DOCTORS — one clinic marker per doctor (id matches doctor.id)
export const CLINICS: PlaceMarker[] = DOCTORS.map((d) => ({
  id: d.id,
  name: d.hospital,
  lat: d.lat,
  lng: d.lng,
  address: d.address,
  city: d.location,
  sublabel: d.specialty,
  layerType: "clinics",
  phone: d.phone,
  rating: d.rating,
  image: d.hospital.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase(),
}));

export const HOSPITALS: PlaceMarker[] = [
  { id: 101, name: "AIIMS Delhi",                  lat: 28.5672, lng: 77.2100, address: "Ansari Nagar, New Delhi – 110029",          city: "Delhi",     sublabel: "Govt. Tertiary Care · 24 hrs", layerType: "hospitals", phone: "+91 11 2658 8500", rating: 4.8, image: "AI" },
  { id: 102, name: "Apollo Hospitals Mumbai",       lat: 19.0660, lng: 72.8310, address: "Plot 13, Parsee Colony, Bandra E, Mumbai",  city: "Mumbai",    sublabel: "Multi-Speciality · 24 hrs",    layerType: "hospitals", phone: "+91 22 6776 0000", rating: 4.7, image: "AH" },
  { id: 103, name: "Fortis Hospital Bangalore",     lat: 12.8900, lng: 77.5990, address: "Bannerghatta Road, Bangalore – 560076",     city: "Bangalore", sublabel: "Multi-Speciality · 24 hrs",    layerType: "hospitals", phone: "+91 80 6621 4444", rating: 4.6, image: "FH" },
  { id: 104, name: "Narayana Health Hyderabad",     lat: 17.3850, lng: 78.4867, address: "Kondapur, Hyderabad – 500084",              city: "Hyderabad", sublabel: "Cardiac & Multi-Speciality",    layerType: "hospitals", phone: "+91 40 6818 0000", rating: 4.8, image: "NH" },
  { id: 105, name: "Ruby Hall Clinic Pune",         lat: 18.5217, lng: 73.8743, address: "Sassoon Road, Pune – 411001",               city: "Pune",      sublabel: "Multi-Speciality · 24 hrs",    layerType: "hospitals", phone: "+91 20 6645 5000", rating: 4.5, image: "RH" },
  { id: 106, name: "Deenanath Mangeshkar Hospital", lat: 18.5129, lng: 73.8358, address: "Erandwane, Pune – 411004",                  city: "Pune",      sublabel: "Multi-Speciality · 24 hrs",    layerType: "hospitals", phone: "+91 20 4015 1000", rating: 4.7, image: "DM" },
  { id: 107, name: "Max Super Speciality Delhi",    lat: 28.6270, lng: 77.3700, address: "1 Press Enclave Road, Saket, New Delhi",    city: "Delhi",     sublabel: "Multi-Speciality · 24 hrs",    layerType: "hospitals", phone: "+91 11 2651 5050", rating: 4.6, image: "MS" },
  { id: 108, name: "Kokilaben Hospital Mumbai",     lat: 19.1281, lng: 72.8235, address: "Rao Saheb Achutrao Patwardhan Marg, Mumbai", city: "Mumbai",   sublabel: "Tertiary Care · 24 hrs",       layerType: "hospitals", phone: "+91 22 3069 9999", rating: 4.9, image: "KH" },
];

export const LABS: PlaceMarker[] = [
  { id: 201, name: "Dr. Lal PathLabs – Delhi",      lat: 28.6600, lng: 77.2200, address: "Block E, Sector 18, Rohini, Delhi",           city: "Delhi",     sublabel: "Home Collection · Open 7 AM–9 PM", layerType: "labs", phone: "+91 11 4444 4444", rating: 4.7, image: "LL" },
  { id: 202, name: "SRL Diagnostics – Mumbai",       lat: 19.0750, lng: 72.8750, address: "Santacruz West, Mumbai – 400054",              city: "Mumbai",    sublabel: "Home Collection · Open 7 AM–9 PM", layerType: "labs", phone: "+91 22 4241 5999", rating: 4.5, image: "SR" },
  { id: 203, name: "Metropolis Labs – Bangalore",    lat: 12.9700, lng: 77.5950, address: "Indiranagar, Bangalore – 560038",              city: "Bangalore", sublabel: "Home Collection · Open 7 AM–8 PM", layerType: "labs", phone: "+91 80 4140 4140", rating: 4.6, image: "ML" },
  { id: 204, name: "Thyrocare – Hyderabad",          lat: 17.4450, lng: 78.3750, address: "KPHB Colony, Kukatpally, Hyderabad",           city: "Hyderabad", sublabel: "Home Collection · Open 7 AM–8 PM", layerType: "labs", phone: "+91 40 4400 4400", rating: 4.4, image: "TC" },
  { id: 205, name: "Suburban Diagnostics – Pune",    lat: 18.5290, lng: 73.8550, address: "Karve Road, Kothrud, Pune – 411038",           city: "Pune",      sublabel: "Home Collection · Open 7 AM–9 PM", layerType: "labs", phone: "+91 20 6680 0800", rating: 4.6, image: "SD" },
  { id: 206, name: "Neuberg Anand Labs – Pune",      lat: 18.5090, lng: 73.8210, address: "Paud Road, Kothrud, Pune – 411029",            city: "Pune",      sublabel: "Home Collection · Open 7 AM–8 PM", layerType: "labs", phone: "+91 20 4120 4120", rating: 4.5, image: "NA" },
  { id: 207, name: "DDRC SRL – Kochi",               lat: 10.0350, lng: 76.3100, address: "Edappally, Kochi – 682024",                    city: "Kochi",     sublabel: "Home Collection · Open 7 AM–8 PM", layerType: "labs", phone: "+91 484 266 6100", rating: 4.7, image: "DD" },
  { id: 208, name: "Lifeline Lab – Kolkata",         lat: 22.5900, lng: 88.3600, address: "Salt Lake Sector III, Kolkata – 700097",       city: "Kolkata",   sublabel: "Home Collection · Open 7 AM–8 PM", layerType: "labs", phone: "+91 33 4040 2020", rating: 4.4, image: "LF" },
];

export const PHARMACIES: PlaceMarker[] = [
  { id: 301, name: "Apollo Pharmacy – Bandra",        lat: 19.0600, lng: 72.8310, address: "Linking Road, Bandra West, Mumbai",           city: "Mumbai",    sublabel: "Open 24 Hours", layerType: "pharmacies", phone: "+91 22 2640 0010", rating: 4.5, image: "AP" },
  { id: 302, name: "MedPlus – Koramangala",            lat: 12.9340, lng: 77.6250, address: "80 Feet Road, Koramangala, Bangalore",        city: "Bangalore", sublabel: "Open 8 AM–11 PM", layerType: "pharmacies", phone: "+91 80 4160 4160", rating: 4.3, image: "MP" },
  { id: 303, name: "Guardian Pharmacy – Hauz Khas",   lat: 28.5500, lng: 77.2000, address: "Hauz Khas Village, South Delhi",               city: "Delhi",     sublabel: "Open 9 AM–10 PM", layerType: "pharmacies", phone: "+91 11 4600 4600", rating: 4.4, image: "GP" },
  { id: 304, name: "Apollo Pharmacy – Banjara Hills",  lat: 17.4250, lng: 78.4500, address: "Road No 2, Banjara Hills, Hyderabad",          city: "Hyderabad", sublabel: "Open 24 Hours", layerType: "pharmacies", phone: "+91 40 2355 1010", rating: 4.6, image: "AP" },
  { id: 305, name: "Wellness Forever – Kothrud",       lat: 18.5000, lng: 73.8100, address: "Paud Road, Kothrud, Pune – 411038",            city: "Pune",      sublabel: "Open 7 AM–11 PM", layerType: "pharmacies", phone: "+91 20 6720 1122", rating: 4.5, image: "WF" },
  { id: 306, name: "Jan Aushadhi Store – Dighi",       lat: 18.6030, lng: 73.8700, address: "Dighi Alandi Road, Dighi, Pune – 411015",      city: "Pune",      sublabel: "Open 9 AM–9 PM · Generic Meds", layerType: "pharmacies", phone: "+91 98220 55678", rating: 4.2, image: "JA" },
  { id: 307, name: "MedPlus – Indiranagar Bangalore",  lat: 12.9790, lng: 77.6380, address: "100 Feet Road, Indiranagar, Bangalore",        city: "Bangalore", sublabel: "Open 8 AM–11 PM", layerType: "pharmacies", phone: "+91 80 4170 4170", rating: 4.4, image: "MP" },
  { id: 308, name: "Apollo Pharmacy – Salt Lake",       lat: 22.5820, lng: 88.4150, address: "Sector I, Salt Lake, Kolkata – 700064",        city: "Kolkata",   sublabel: "Open 8 AM–10 PM", layerType: "pharmacies", phone: "+91 33 2358 9090", rating: 4.5, image: "AP" },
];

export function getMarkersForLayer(layer: LayerType, gyms: PlaceMarker[]): PlaceMarker[] {
  switch (layer) {
    case "gyms":       return gyms;
    case "hospitals":  return HOSPITALS;
    case "clinics":    return CLINICS;
    case "labs":       return LABS;
    case "pharmacies": return PHARMACIES;
  }
}
