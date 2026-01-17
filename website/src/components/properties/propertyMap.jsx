// src/components/properties/propertyMap.jsx
// Property Map with HSP Theme - Navy/Gold colors
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Home, MapPin } from 'lucide-react';

// HSP Brand Colors
const HSP_COLORS = {
  navy: '#0A1628',
  navyLight: '#1F2E44',
  gold: '#C9A962',
  goldDark: '#B8985A',
};

// Create custom HSP-themed icon for property marker
const createPropertyIcon = (isMain = true) => {
  const size = isMain ? 40 : 32;
  const bgColor = isMain ? HSP_COLORS.gold : HSP_COLORS.navy;
  const borderColor = isMain ? HSP_COLORS.goldDark : HSP_COLORS.gold;

  return L.divIcon({
    className: 'custom-property-icon',
    html: `
      <div style="position: relative; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3));">
        <div style="
          background: linear-gradient(135deg, ${bgColor} 0%, ${borderColor} 100%);
          width: ${size}px;
          height: ${size}px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 3px solid ${isMain ? HSP_COLORS.navy : HSP_COLORS.gold};
        ">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${isMain ? HSP_COLORS.navy : 'white'}" width="${size * 0.45}px" height="${size * 0.45}px" style="transform: rotate(45deg);">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22" stroke="${isMain ? HSP_COLORS.navy : 'white'}" stroke-width="1" fill="none"></polyline>
          </svg>
        </div>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size]
  });
};

// Map zoom controller component
const MapController = ({ zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setZoom(zoom);
  }, [map, zoom]);
  return null;
};

// Custom dark map style URL (using CartoDB Dark Matter for HSP theme)
const DARK_MAP_STYLE = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
const DARK_MAP_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';

const PropertyMap = ({ position, title, address, zoom = 14 }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // If not client-side, position invalid, or coordinates missing, don't render map
  if (!isClient || !position || !Array.isArray(position) || position.length !== 2) {
    return (
      <div className="w-full h-full bg-[#0A1628] flex flex-col items-center justify-center rounded-2xl">
        <div className="w-16 h-16 rounded-full bg-[#C9A962]/10 flex items-center justify-center mb-4">
          <MapPin className="w-8 h-8 text-[#C9A962]" />
        </div>
        <p className="text-white/60 font-medium">Map coordinates not available</p>
        {address && <p className="text-white/40 text-sm mt-2">{address}</p>}
      </div>
    );
  }

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden">
      <MapContainer
        center={position}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        preferCanvas={true}
        zoomControl={false}
        className="z-0"
      >
        <TileLayer
          attribution={DARK_MAP_ATTRIBUTION}
          url={DARK_MAP_STYLE}
        />

        {/* Pulsing circle effect */}
        <Circle
          center={position}
          radius={500}
          pathOptions={{
            color: HSP_COLORS.gold,
            fillColor: HSP_COLORS.gold,
            fillOpacity: 0.1,
            weight: 2,
          }}
        />
        <Circle
          center={position}
          radius={200}
          pathOptions={{
            color: HSP_COLORS.gold,
            fillColor: HSP_COLORS.gold,
            fillOpacity: 0.2,
            weight: 1,
          }}
        />

        <Marker
          position={position}
          icon={createPropertyIcon(true)}
        >
          <Popup className="hsp-popup">
            <div className="min-w-[200px] p-2">
              <h3 className="font-bold text-[#0A1628] text-base mb-1">{title}</h3>
              <div className="flex items-center gap-1 text-gray-600 text-sm">
                <MapPin className="w-3 h-3 text-[#C9A962]" />
                <span>{address}</span>
              </div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>

      {/* Location badge overlay */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-[#0A1628]/90 backdrop-blur-sm px-4 py-2 rounded-xl border border-[#C9A962]/30 flex items-center gap-2">
        <MapPin className="w-4 h-4 text-[#C9A962]" />
        <span className="text-white text-sm font-medium">{address}</span>
      </div>

      {/* Gradient overlay at edges for seamless blend */}
      <div className="absolute inset-0 pointer-events-none rounded-2xl" style={{
        background: `
          linear-gradient(to bottom, transparent 90%, ${HSP_COLORS.navy}40 100%),
          linear-gradient(to top, transparent 90%, ${HSP_COLORS.navy}40 100%),
          linear-gradient(to right, transparent 95%, ${HSP_COLORS.navy}40 100%),
          linear-gradient(to left, transparent 95%, ${HSP_COLORS.navy}40 100%)
        `
      }} />
    </div>
  );
};

export default PropertyMap;
export { createPropertyIcon, HSP_COLORS, DARK_MAP_STYLE, DARK_MAP_ATTRIBUTION };
