// src/components/PropertyMap.jsx
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Home } from 'lucide-react';

// Create custom icon for property marker
const createPropertyIcon = () => {
  return L.divIcon({
    className: 'custom-property-icon',
    html: `
      <div style="position: relative;">
        <div style="background-color: #f97316; box-shadow: 0 2px 10px rgba(0,0,0,0.3); width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="18" height="18">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </div>
        <div style="position: absolute; bottom: -25px; left: 50%; transform: translateX(-50%); background-color: white; padding: 3px 8px; border-radius: 4px; font-weight: bold; font-size: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.2); white-space: nowrap;">
          Property
        </div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
};

const PropertyMap = ({ position, title, address }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // If not client-side, position invalid, or coordinates missing, don't render map
  if (!isClient || !position || !Array.isArray(position) || position.length !== 2) {
    return (
      <div className="w-full h-full bg-stone-100 flex flex-col items-center justify-center">
        <Home className="w-10 h-10 text-stone-400 mb-2" />
        <p className="text-stone-500">Map coordinates not available</p>
        {address && <p className="text-stone-400 text-sm mt-1">{address}</p>}
      </div>
    );
  }

  return (
    <MapContainer
      center={position}
      zoom={15}
      style={{ height: '100%', width: '100%' }}
      preferCanvas={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker 
        position={position}
        icon={createPropertyIcon()}
      >
        <Popup>
          <div className="min-w-full p-1">
            <h3 className="font-bold text-base mb-1">{title}</h3>
            <p className="text-sm">{address}</p>
          </div>
        </Popup>
      </Marker>

      {/* Circle to highlight the area */}
      <Circle 
        center={position} 
        radius={300}
        color="rgba(249, 22, 22, 1)"
        fillColor="#f97316"
        fillOpacity={0.15}
      />

      {/* Optional location indicator in corner */}
      <div className="absolute bottom-2 left-2 bg-white p-2 rounded-lg shadow-sm flex items-center z-1000">
        <Home className="w-5 h-5 text-orange-500 mr-1" />
        <span className="text-sm">{address}</span>
      </div>
    </MapContainer>
  );
};

export default PropertyMap;