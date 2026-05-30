"use client";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import type { PlaceMarker } from "@/lib/map-data";
import { LAYER_META } from "@/lib/map-data";

delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:       "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function placeIcon(marker: PlaceMarker, selected: boolean) {
  const meta = LAYER_META[marker.layerType];
  const bg = selected ? meta.accentColor : meta.pinColor;
  return L.divIcon({
    className: "",
    html: `<div style="
      width:36px;height:36px;border-radius:50% 50% 50% 0;
      background:${bg};border:3px solid white;
      box-shadow:0 2px 10px rgba(0,0,0,0.45);
      transform:rotate(-45deg);
      display:flex;align-items:center;justify-content:center;
    "><span style="transform:rotate(45deg);font-size:13px;">${meta.emoji}</span></div>`,
    iconSize:    [36, 36],
    iconAnchor:  [18, 36],
    popupAnchor: [0, -40],
  });
}

function userIcon() {
  return L.divIcon({
    className: "",
    html: `<div style="
      width:18px;height:18px;border-radius:50%;
      background:#06B6D4;border:3px solid white;
      box-shadow:0 0 0 6px rgba(6,182,212,0.25);
    "></div>`,
    iconSize:   [18, 18],
    iconAnchor: [9, 9],
  });
}

function FlyTo({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => { map.flyTo([lat, lng], 14, { duration: 1.1 }); }, [lat, lng, map]);
  return null;
}

interface MapViewProps {
  markers: PlaceMarker[];
  selectedId: number | null;
  userLocation: { lat: number; lng: number } | null;
  flyTo: { lat: number; lng: number } | null;
  onSelectMarker: (m: PlaceMarker) => void;
}

export default function MapView({ markers, selectedId, userLocation, flyTo, onSelectMarker }: MapViewProps) {
  return (
    <MapContainer
      center={[20.5937, 78.9629]}
      zoom={5}
      style={{ height: "100%", width: "100%", background: "#1a2332" }}
      zoomControl
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {userLocation && (
        <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon()}>
          <Popup>
            <div className="text-sm font-semibold text-gray-800">You are here</div>
          </Popup>
        </Marker>
      )}

      {markers.map((m) => (
        <Marker
          key={`${m.layerType}-${m.id}`}
          position={[m.lat, m.lng]}
          icon={placeIcon(m, m.id === selectedId)}
          eventHandlers={{ click: () => onSelectMarker(m) }}
        >
          <Popup>
            <div style={{ minWidth: 160 }}>
              <div style={{ fontWeight: 700, fontSize: 13 }}>{m.name}</div>
              <div style={{ color: "#666", fontSize: 11, marginTop: 2 }}>{m.sublabel}</div>
              {m.rating && (
                <div style={{ fontSize: 11, color: "#8B5CF6", marginTop: 3 }}>⭐ {m.rating}</div>
              )}
              <button
                onClick={() => onSelectMarker(m)}
                style={{ marginTop: 8, width: "100%", padding: "4px 0", borderRadius: 6, background: "#8B5CF6", color: "white", fontSize: 11, border: "none", cursor: "pointer" }}
              >
                View Details
              </button>
            </div>
          </Popup>
        </Marker>
      ))}

      {flyTo && <FlyTo lat={flyTo.lat} lng={flyTo.lng} />}
    </MapContainer>
  );
}
