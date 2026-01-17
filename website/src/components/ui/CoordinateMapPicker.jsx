// CoordinateMapPicker - Interactive map for selecting coordinates
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Navigation, RefreshCw } from 'lucide-react';

// HSP Brand Colors
const HSP_COLORS = {
  navy: '#0A1628',
  navyLight: '#1F2E44',
  gold: '#C9A962',
  goldDark: '#B8985A',
};

// Default Harare coordinates
const HARARE_COORDS = {
  lat: -17.8292,
  lng: 31.0522
};

// Dark map style
const DARK_MAP_STYLE = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
const DARK_MAP_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';

// Custom gold marker icon
const createPickerIcon = () => {
  return L.divIcon({
    className: 'custom-picker-icon',
    html: `
      <div style="position: relative; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.4));">
        <div style="
          background: linear-gradient(135deg, ${HSP_COLORS.gold} 0%, ${HSP_COLORS.goldDark} 100%);
          width: 32px;
          height: 32px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 3px solid ${HSP_COLORS.navy};
          animation: bounce 0.5s ease-out;
        ">
          <div style="
            width: 10px;
            height: 10px;
            background: ${HSP_COLORS.navy};
            border-radius: 50%;
            transform: rotate(45deg);
          "></div>
        </div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });
};

// Component to handle map clicks and update marker
const MapClickHandler = ({ onLocationSelect }) => {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      onLocationSelect(lat, lng);
    },
  });
  return null;
};

// Component to recenter map when coordinates change
const MapRecenter = ({ lat, lng }) => {
  const map = useMap();

  useEffect(() => {
    if (lat && lng && !isNaN(lat) && !isNaN(lng)) {
      map.setView([lat, lng], map.getZoom(), { animate: true });
    }
  }, [lat, lng, map]);

  return null;
};

// Draggable marker component
const DraggableMarker = ({ position, onDragEnd }) => {
  const markerRef = useRef(null);

  const eventHandlers = {
    dragend() {
      const marker = markerRef.current;
      if (marker != null) {
        const { lat, lng } = marker.getLatLng();
        onDragEnd(lat, lng);
      }
    },
  };

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
      icon={createPickerIcon()}
    />
  );
};

const CoordinateMapPicker = ({
  latitude,
  longitude,
  onCoordinateChange,
  className = ""
}) => {
  const [isClient, setIsClient] = useState(false);
  const [mapKey, setMapKey] = useState(0);

  // Parse coordinates, default to Harare
  const lat = latitude && !isNaN(parseFloat(latitude)) ? parseFloat(latitude) : HARARE_COORDS.lat;
  const lng = longitude && !isNaN(parseFloat(longitude)) ? parseFloat(longitude) : HARARE_COORDS.lng;

  const hasCustomCoords = latitude && longitude &&
    !isNaN(parseFloat(latitude)) && !isNaN(parseFloat(longitude));

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLocationSelect = useCallback((newLat, newLng) => {
    // Round to 6 decimal places for precision
    const roundedLat = Math.round(newLat * 1000000) / 1000000;
    const roundedLng = Math.round(newLng * 1000000) / 1000000;

    onCoordinateChange({
      latitude: roundedLat.toString(),
      longitude: roundedLng.toString()
    });
  }, [onCoordinateChange]);

  const handleReset = () => {
    onCoordinateChange({
      latitude: HARARE_COORDS.lat.toString(),
      longitude: HARARE_COORDS.lng.toString()
    });
    setMapKey(prev => prev + 1);
  };

  const handleCenterOnHarare = () => {
    setMapKey(prev => prev + 1);
  };

  if (!isClient) {
    return (
      <div className={`bg-[#0A1628] rounded-xl flex items-center justify-center ${className}`} style={{ height: '200px' }}>
        <div className="animate-pulse flex items-center gap-2 text-gray-500">
          <MapPin className="w-5 h-5" />
          <span>Loading map...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm text-gray-400">
          Click map or drag marker to set location
        </label>
        <button
          type="button"
          onClick={handleReset}
          className="flex items-center gap-1 text-xs text-[#C9A962] hover:text-[#C9A962]/80 transition-colors"
        >
          <RefreshCw className="w-3 h-3" />
          Reset to Harare
        </button>
      </div>

      <div className="relative rounded-xl overflow-hidden border border-white/10" style={{ height: '200px' }}>
        <MapContainer
          key={mapKey}
          center={[lat, lng]}
          zoom={hasCustomCoords ? 15 : 12}
          style={{ height: '100%', width: '100%' }}
          preferCanvas={true}
          zoomControl={false}
          className="z-0"
        >
          <TileLayer
            attribution={DARK_MAP_ATTRIBUTION}
            url={DARK_MAP_STYLE}
          />

          <MapClickHandler onLocationSelect={handleLocationSelect} />
          <MapRecenter lat={lat} lng={lng} />

          <DraggableMarker
            position={[lat, lng]}
            onDragEnd={handleLocationSelect}
          />
        </MapContainer>

        {/* Zoom controls */}
        <div className="absolute top-2 right-2 z-[1000] flex flex-col gap-1">
          <button
            type="button"
            onClick={() => {
              const mapEl = document.querySelector('.leaflet-container');
              if (mapEl && mapEl._leaflet_map) {
                mapEl._leaflet_map.zoomIn();
              }
            }}
            className="w-7 h-7 bg-[#0A1628]/90 hover:bg-[#0A1628] border border-white/20 rounded text-white text-sm font-medium transition-colors"
          >
            +
          </button>
          <button
            type="button"
            onClick={() => {
              const mapEl = document.querySelector('.leaflet-container');
              if (mapEl && mapEl._leaflet_map) {
                mapEl._leaflet_map.zoomOut();
              }
            }}
            className="w-7 h-7 bg-[#0A1628]/90 hover:bg-[#0A1628] border border-white/20 rounded text-white text-sm font-medium transition-colors"
          >
            -
          </button>
        </div>

        {/* Coordinates display overlay */}
        <div className="absolute bottom-2 left-2 z-[1000] bg-[#0A1628]/90 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/10">
          <div className="flex items-center gap-2 text-xs">
            <Navigation className="w-3 h-3 text-[#C9A962]" />
            <span className="text-gray-400">
              {lat.toFixed(4)}, {lng.toFixed(4)}
            </span>
          </div>
        </div>
      </div>

      {/* Hint text */}
      <p className="text-xs text-gray-500 mt-1">
        {hasCustomCoords
          ? "Coordinates set. Drag marker or click to adjust."
          : "Default: Harare. Click or drag to set property location."}
      </p>

      {/* CSS for bounce animation */}
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: rotate(-45deg) translateY(0); }
          50% { transform: rotate(-45deg) translateY(-5px); }
        }
        .leaflet-container {
          background: ${HSP_COLORS.navy};
        }
      `}</style>
    </div>
  );
};

export default CoordinateMapPicker;
