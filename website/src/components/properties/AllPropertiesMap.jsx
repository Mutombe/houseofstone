// src/components/properties/AllPropertiesMap.jsx
// Full-width map showcasing all property locations with HSP theme
import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  Home,
  Bed,
  Bath,
  Maximize,
  ArrowRight,
  X,
  Filter,
  Building2,
  TreePine,
  Loader,
} from 'lucide-react';
import { selectAllProperties, fetchProperties } from '../../redux/slices/propertySlice';

// HSP Brand Colors
const HSP_COLORS = {
  navy: '#0A1628',
  navyLight: '#1F2E44',
  gold: '#C9A962',
  goldDark: '#B8985A',
};

// Harare regions with approximate center coordinates
const HARARE_REGIONS = {
  "All Regions": { center: [-17.8292, 31.0522], zoom: 11 },
  "Harare North": { center: [-17.7500, 31.0500], zoom: 12, areas: ["Borrowdale", "Glen Lorne", "Mt Pleasant", "Avondale", "Highlands", "Marlborough"] },
  "Harare East": { center: [-17.8200, 31.1200], zoom: 12, areas: ["Greendale", "Eastlea", "Ruwa", "Zimre Park"] },
  "Harare South": { center: [-17.8800, 31.0300], zoom: 12, areas: ["Hatfield", "Waterfalls", "Glen View", "Southerton"] },
  "Harare West": { center: [-17.8200, 30.9500], zoom: 12, areas: ["Westgate", "Mabelreign", "Milton Park", "Belvedere"] },
  "Harare Central": { center: [-17.8292, 31.0522], zoom: 13, areas: ["City Centre", "Avenues", "CBD", "Newlands"] },
};

// Comprehensive location geocoding for Harare suburbs
const LOCATION_COORDINATES = {
  // Harare North
  "borrowdale": [-17.7450, 31.0850],
  "borrowdale brook": [-17.7400, 31.0900],
  "borrowdale west": [-17.7500, 31.0700],
  "glen lorne": [-17.7300, 31.1100],
  "hogerty hill": [-17.7200, 31.1000],
  "mt pleasant": [-17.7700, 31.0500],
  "mount pleasant": [-17.7700, 31.0500],
  "avondale": [-17.7900, 31.0300],
  "avondale west": [-17.7950, 31.0200],
  "highlands": [-17.8100, 31.0600],
  "marlborough": [-17.7600, 31.0100],
  "pomona": [-17.7500, 31.0300],
  "greystone park": [-17.7650, 31.0950],
  "helensvale": [-17.7550, 31.0800],
  "mandara": [-17.7600, 31.1050],
  "chisipite": [-17.7750, 31.1000],
  "colne valley": [-17.7350, 31.0750],
  "shawasha hills": [-17.7400, 31.0600],
  "the grange": [-17.7800, 31.0850],
  "vainona": [-17.7650, 31.0650],
  "quinnington": [-17.7550, 31.0550],

  // Harare East
  "greendale": [-17.8200, 31.1000],
  "eastlea": [-17.8300, 31.0800],
  "braeside": [-17.8150, 31.0900],
  "alexandra park": [-17.8050, 31.0750],
  "msasa": [-17.8100, 31.1200],
  "msasa park": [-17.8050, 31.1150],
  "ruwa": [-17.8900, 31.2500],
  "zimre park": [-17.8700, 31.2000],
  "sunway city": [-17.8800, 31.1800],
  "damofalls": [-17.8600, 31.1500],
  "epworth": [-17.8900, 31.1400],
  "hatcliffe": [-17.7100, 31.0700],
  "borrowdale brooke": [-17.7400, 31.0900],

  // Harare South
  "hatfield": [-17.8600, 31.0500],
  "southerton": [-17.8700, 31.0300],
  "waterfalls": [-17.8800, 31.0100],
  "glen view": [-17.9100, 31.0000],
  "glenview": [-17.9100, 31.0000],
  "highfield": [-17.8800, 30.9800],
  "mbare": [-17.8600, 31.0350],
  "ardbennie": [-17.8750, 31.0200],
  "willowvale": [-17.8650, 30.9900],
  "workington": [-17.8550, 31.0100],
  "graniteside": [-17.8400, 31.0600],
  "prospect": [-17.8500, 31.0450],
  "queensdale": [-17.8550, 31.0700],

  // Harare West
  "westgate": [-17.8200, 30.9600],
  "mabelreign": [-17.8000, 30.9700],
  "milton park": [-17.8200, 31.0200],
  "belvedere": [-17.8100, 31.0100],
  "emerald hill": [-17.8050, 31.0000],
  "meyrick park": [-17.8100, 30.9800],
  "kensington": [-17.8150, 30.9900],
  "ashdown park": [-17.7950, 30.9600],
  "bluff hill": [-17.7900, 30.9500],
  "sentosa": [-17.7850, 30.9400],
  "tynwald": [-17.8300, 30.9100],
  "marimba park": [-17.8400, 30.9300],
  "warren park": [-17.8500, 30.9500],
  "kuwadzana": [-17.8400, 30.8900],
  "dzivarasekwa": [-17.8200, 30.8700],
  "crowborough": [-17.8350, 30.9700],

  // Harare Central
  "city centre": [-17.8292, 31.0522],
  "cbd": [-17.8292, 31.0522],
  "harare cbd": [-17.8292, 31.0522],
  "avenues": [-17.8200, 31.0450],
  "the avenues": [-17.8200, 31.0450],
  "newlands": [-17.8000, 31.0350],
  "kopje": [-17.8350, 31.0480],
  "harare": [-17.8292, 31.0522],

  // Additional suburbs
  "gunhill": [-17.7950, 31.0650],
  "ballantyne park": [-17.7850, 31.0550],
  "strathaven": [-17.8000, 31.0500],
  "logan park": [-17.7900, 31.0450],
  "monavale": [-17.7800, 31.0200],
  "acturus": [-17.7600, 31.1300],
  "greencroft": [-17.8000, 30.9950],
  "ridgeview": [-17.7900, 30.9850],
  "adylinn": [-17.7750, 30.9800],
  "amby": [-17.8050, 31.0550],
  "belgravia": [-17.8150, 31.0350],
  "gunhill": [-17.7950, 31.0700],
  "kambanji": [-17.7500, 31.1200],
  "chishawasha": [-17.7200, 31.1400],
  "domboshawa": [-17.6200, 31.1500],
  "norton": [-17.8800, 30.7000],
  "chitungwiza": [-18.0100, 31.0800],

  // Zimbabwe other cities
  "bulawayo": [-20.1500, 28.5800],
  "mutare": [-18.9700, 32.6700],
  "gweru": [-19.4500, 29.8200],
  "masvingo": [-20.0700, 30.8300],
  "victoria falls": [-17.9300, 25.8300],
  "kariba": [-16.5200, 28.8000],
  "nyanga": [-18.2200, 32.7500],
};

// Function to get coordinates from location string
const getLocationCoordinates = (locationString) => {
  if (!locationString) return null;

  const location = locationString.toLowerCase().trim();

  // Direct match
  if (LOCATION_COORDINATES[location]) {
    return LOCATION_COORDINATES[location];
  }

  // Search for partial matches
  for (const [key, coords] of Object.entries(LOCATION_COORDINATES)) {
    if (location.includes(key) || key.includes(location.split(',')[0].trim())) {
      return coords;
    }
  }

  // Check if any keyword from location matches
  const words = location.split(/[\s,]+/).filter(w => w.length > 2);
  for (const word of words) {
    if (LOCATION_COORDINATES[word]) {
      return LOCATION_COORDINATES[word];
    }
    for (const [key, coords] of Object.entries(LOCATION_COORDINATES)) {
      if (key.includes(word)) {
        return coords;
      }
    }
  }

  return null;
};

// Custom dark map style
const DARK_MAP_STYLE = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
const DARK_MAP_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';

// Create custom marker icon
const createMarkerIcon = (price, type = 'sale') => {
  const bgColor = type === 'rent' ? '#10B981' : HSP_COLORS.gold;
  const formattedPrice = price ? `$${(parseFloat(price) / 1000).toFixed(0)}k` : 'POA';

  return L.divIcon({
    className: 'custom-cluster-icon',
    html: `
      <div style="
        background: linear-gradient(135deg, ${bgColor} 0%, ${type === 'rent' ? '#059669' : HSP_COLORS.goldDark} 100%);
        color: ${HSP_COLORS.navy};
        padding: 6px 10px;
        border-radius: 20px;
        font-weight: 700;
        font-size: 12px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        border: 2px solid ${HSP_COLORS.navy};
        white-space: nowrap;
        display: flex;
        align-items: center;
        gap: 4px;
      ">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="${HSP_COLORS.navy}">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        </svg>
        ${formattedPrice}
      </div>
    `,
    iconSize: [80, 30],
    iconAnchor: [40, 30],
    popupAnchor: [0, -30]
  });
};

// Cluster icon
const createClusterIcon = (cluster) => {
  const count = cluster.getChildCount();
  const size = count < 10 ? 40 : count < 50 ? 50 : 60;

  return L.divIcon({
    html: `
      <div style="
        background: linear-gradient(135deg, ${HSP_COLORS.navy} 0%, ${HSP_COLORS.navyLight} 100%);
        color: ${HSP_COLORS.gold};
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: ${count < 10 ? 14 : 16}px;
        box-shadow: 0 4px 15px rgba(201, 169, 98, 0.4);
        border: 3px solid ${HSP_COLORS.gold};
      ">
        ${count}
      </div>
    `,
    className: 'custom-cluster-icon',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};

// Map controller for flying to locations
const MapController = ({ center, zoom }) => {
  const map = useMap();

  useEffect(() => {
    if (center && zoom) {
      map.flyTo(center, zoom, { duration: 1.5 });
    }
  }, [map, center, zoom]);

  return null;
};

// Property popup card
const PropertyPopupCard = ({ property, onViewDetails }) => {
  const formatPrice = (price) => {
    if (!price) return 'POA';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(parseFloat(price));
  };

  return (
    <div className="w-64 p-0 -m-3">
      {/* Image */}
      <div className="relative h-32 rounded-t-lg overflow-hidden">
        {property.images?.[0] ? (
          <img
            src={property.images[0].image}
            alt={property.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <Home className="w-8 h-8 text-gray-400" />
          </div>
        )}
        <div className="absolute top-2 left-2 px-2 py-1 bg-[#C9A962] text-[#0A1628] text-xs font-bold rounded">
          {property.status}
        </div>
      </div>

      {/* Content */}
      <div className="p-3 bg-white rounded-b-lg">
        <p className="text-[#C9A962] font-bold text-lg mb-1">
          {formatPrice(property.price)}
        </p>
        <h3 className="font-semibold text-[#0A1628] text-sm mb-1 line-clamp-1">
          {property.title}
        </h3>
        <p className="text-gray-500 text-xs mb-2 flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          {property.location}
        </p>

        {/* Stats */}
        <div className="flex gap-3 text-xs text-gray-600 mb-3">
          {property.beds && (
            <span className="flex items-center gap-1">
              <Bed className="w-3 h-3" /> {property.beds}
            </span>
          )}
          {property.baths && (
            <span className="flex items-center gap-1">
              <Bath className="w-3 h-3" /> {property.baths}
            </span>
          )}
          {property.sqft && (
            <span className="flex items-center gap-1">
              <Maximize className="w-3 h-3" /> {property.sqft}
            </span>
          )}
        </div>

        <button
          onClick={() => onViewDetails(property.id)}
          className="w-full py-2 bg-[#0A1628] text-white text-xs font-medium rounded-lg hover:bg-[#1F2E44] transition-colors flex items-center justify-center gap-1"
        >
          View Details <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

// Main component
const AllPropertiesMap = ({ height = '80vh', showFilters = true }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const properties = useSelector(selectAllProperties);
  const propertiesStatus = useSelector((state) => state.properties.status);
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [mapCenter, setMapCenter] = useState(HARARE_REGIONS['All Regions'].center);
  const [mapZoom, setMapZoom] = useState(HARARE_REGIONS['All Regions'].zoom);
  const [isClient, setIsClient] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Fetch properties if not already loaded
  useEffect(() => {
    if (properties.length === 0 && propertiesStatus !== 'loading') {
      dispatch(fetchProperties({ page_size: 100 })); // Fetch more properties for the map
    }
  }, [dispatch, properties.length, propertiesStatus]);

  // Process properties - use explicit coords or geocode from location
  const propertiesWithCoords = useMemo(() => {
    const processed = properties.map((p) => {
      // If property has explicit coordinates, use them
      if (p.latitude && p.longitude && !isNaN(parseFloat(p.latitude)) && !isNaN(parseFloat(p.longitude))) {
        return {
          ...p,
          _lat: parseFloat(p.latitude),
          _lng: parseFloat(p.longitude),
          _geocoded: false,
        };
      }

      // Try to geocode from location string
      const coords = getLocationCoordinates(p.location);
      if (coords) {
        // Add small random offset to prevent markers from stacking exactly
        const offset = () => (Math.random() - 0.5) * 0.008;
        return {
          ...p,
          _lat: coords[0] + offset(),
          _lng: coords[1] + offset(),
          _geocoded: true,
        };
      }

      return null;
    }).filter(Boolean);

    // Debug log in development
    if (process.env.NODE_ENV === 'development' && properties.length > 0) {
      const explicit = processed.filter(p => !p._geocoded).length;
      const geocoded = processed.filter(p => p._geocoded).length;
      console.log(`[AllPropertiesMap] Total: ${properties.length}, Mapped: ${processed.length} (${explicit} explicit, ${geocoded} geocoded)`);
    }

    return processed;
  }, [properties]);

  // Handle region change
  const handleRegionChange = (region) => {
    setSelectedRegion(region);
    const regionData = HARARE_REGIONS[region];
    if (regionData) {
      setMapCenter(regionData.center);
      setMapZoom(regionData.zoom);
    }
  };

  const handleViewDetails = (propertyId) => {
    navigate(`/properties/${propertyId}`);
  };

  if (!isClient) {
    return (
      <div
        className="w-full bg-[#0A1628] flex items-center justify-center"
        style={{ height }}
      >
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-[#C9A962]/10 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <MapPin className="w-8 h-8 text-[#C9A962]" />
          </div>
          <p className="text-white/60">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full" style={{ height }}>
      {/* Map */}
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        style={{ height: '100%', width: '100%' }}
        preferCanvas={true}
        zoomControl={false}
      >
        <TileLayer
          attribution={DARK_MAP_ATTRIBUTION}
          url={DARK_MAP_STYLE}
        />

        <MapController center={mapCenter} zoom={mapZoom} />

        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createClusterIcon}
          maxClusterRadius={60}
          spiderfyOnMaxZoom={true}
          showCoverageOnHover={false}
        >
          {propertiesWithCoords.map((property) => (
            <Marker
              key={property.id}
              position={[property._lat, property._lng]}
              icon={createMarkerIcon(property.price, property.status?.toLowerCase().includes('rent') || property.category?.toLowerCase() === 'rental' ? 'rent' : 'sale')}
              eventHandlers={{
                click: () => setSelectedProperty(property),
              }}
            >
              <Popup>
                <PropertyPopupCard
                  property={property}
                  onViewDetails={handleViewDetails}
                />
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>

      {/* Region Filter Overlay */}
      {showFilters && (
        <div className="absolute top-4 left-4 right-4 z-[1000]">
          <div className="bg-[#0A1628]/90 backdrop-blur-md rounded-2xl p-4 border border-[#C9A962]/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#C9A962]/10 flex items-center justify-center">
                {propertiesStatus === 'loading' ? (
                  <Loader className="w-5 h-5 text-[#C9A962] animate-spin" />
                ) : (
                  <MapPin className="w-5 h-5 text-[#C9A962]" />
                )}
              </div>
              <div>
                <h3 className="text-white font-semibold">Explore Properties</h3>
                <p className="text-white/50 text-sm">
                  {propertiesStatus === 'loading'
                    ? 'Loading properties...'
                    : `${propertiesWithCoords.length} properties on map`}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {Object.keys(HARARE_REGIONS).map((region) => (
                <button
                  key={region}
                  onClick={() => handleRegionChange(region)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    selectedRegion === region
                      ? 'bg-[#C9A962] text-[#0A1628]'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Empty State Overlay */}
      {propertiesStatus !== 'loading' && properties.length > 0 && propertiesWithCoords.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center z-[999] pointer-events-none">
          <div className="bg-[#0A1628]/95 backdrop-blur-md rounded-2xl p-8 border border-[#C9A962]/20 text-center max-w-md mx-4 pointer-events-auto">
            <div className="w-16 h-16 rounded-full bg-[#C9A962]/10 flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-[#C9A962]" />
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">No Mapped Properties</h3>
            <p className="text-white/60 text-sm mb-4">
              {properties.length} properties found, but their locations couldn't be mapped.
              Make sure property locations include recognizable suburb names.
            </p>
            <button
              onClick={() => navigate('/sale')}
              className="px-6 py-2 bg-[#C9A962] text-[#0A1628] font-medium rounded-xl hover:bg-[#B8985A] transition-colors"
            >
              Browse All Properties
            </button>
          </div>
        </div>
      )}

      {/* No Properties State */}
      {propertiesStatus !== 'loading' && properties.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center z-[999] pointer-events-none">
          <div className="bg-[#0A1628]/95 backdrop-blur-md rounded-2xl p-8 border border-[#C9A962]/20 text-center max-w-md mx-4 pointer-events-auto">
            <div className="w-16 h-16 rounded-full bg-[#C9A962]/10 flex items-center justify-center mx-auto mb-4">
              <Loader className="w-8 h-8 text-[#C9A962]" />
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Loading Properties</h3>
            <p className="text-white/60 text-sm mb-4">
              Fetching property listings...
            </p>
          </div>
        </div>
      )}

      {/* Stats Overlay */}
      <div className="absolute bottom-4 left-4 z-[1000]">
        <div className="bg-[#0A1628]/90 backdrop-blur-md rounded-xl p-3 border border-[#C9A962]/20">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#C9A962]" />
              <span className="text-white/70 text-sm">For Sale</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-white/70 text-sm">For Rent</span>
            </div>
          </div>
        </div>
      </div>

      {/* View All Button */}
      <div className="absolute bottom-4 right-4 z-[1000]">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/sale')}
          className="bg-[#C9A962] text-[#0A1628] px-5 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:bg-[#B8985A] transition-colors"
        >
          View All Properties
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0A1628] to-transparent pointer-events-none z-[999]" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0A1628] to-transparent pointer-events-none z-[999]" />
    </div>
  );
};

export default AllPropertiesMap;
