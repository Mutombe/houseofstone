// src/pages/Properties.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Search, MapPin, Home as HomeIcon, Bed, Bath, Square } from 'lucide-react';
import { Link } from 'react-router-dom';
import { properties } from '../data/properties';


const Properties = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: 'all',
    priceRange: 'all',
    bedrooms: 'all',
  });

  const properties1 = Array(9).fill().map((_, i) => ({
    id: i + 1,
    title: `Luxury ${i % 2 === 0 ? 'Villa' : 'Apartment'} ${i + 1}`,
    price: Math.floor(Math.random() * 1000000) + 500000,
    location: 'Avondale, Harare',
    beds: Math.floor(Math.random() * 3) + 2,
    baths: Math.floor(Math.random() * 2) + 2,
    sqft: Math.floor(Math.random() * 1000) + 1500,
  }));
  
  // src/data/properties.js

  const filteredProperties = properties.filter(property => {
    const matchesType = filters.type === 'all' || property.type === filters.type;
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesPriceRange = true;
    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(Number);
      matchesPriceRange = property.price >= min && (!max || property.price <= max);
    }

    return matchesType && matchesSearch && matchesPriceRange;
  });

  return (
    <div className="min-h-screen pt-16 bg-stone-50">
      {/* Filters Section */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 w-full">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search properties..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-500"
                />
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-stone-400" />
              </div>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <select
                className="px-4 py-2 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-500"
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              >
                <option value="all">All Types</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
              </select>
              <select
                className="px-4 py-2 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-500"
                value={filters.priceRange}
                onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
              >
                <option value="all">Any Price</option>
                <option value="0-500000">$0 - $500,000</option>
                <option value="500000-1000000">$500,000 - $1,000,000</option>
                <option value="1000000+">$1,000,000+</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property, i) => (
            <Link to={`/properties/${property.id}`} key={property.id}>
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative h-64">
                <div className="absolute inset-0 bg-gradient-to-r from-stone-500 to-stone-700">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-stone-900 font-semibold">
                  ${property.price.toLocaleString()}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-stone-900 mb-2">
                  {property.title}
                </h3>
                <div className="flex items-center text-stone-600 mb-4">
                  <MapPin className="w-4 h-4 mr-1" />
                  {property.location}
                </div>
                <div className="flex justify-between text-stone-600">
                  <div className="flex items-center">
                    <Bed className="w-4 h-4 mr-1" />
                    {property.beds} Beds
                  </div>
                  <div className="flex items-center">
                    <Bath className="w-4 h-4 mr-1" />
                    {property.baths} Baths
                  </div>
                  <div className="flex items-center">
                    <Square className="w-4 h-4 mr-1" />
                    {property.sqft} sqft
                  </div>
                </div>
              </div>
              </motion.div>
              </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Properties;