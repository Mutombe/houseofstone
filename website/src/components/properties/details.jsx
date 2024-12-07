// src/pages/PropertyDetail.jsx
import { motion } from 'framer-motion';
import { MapPin, Bed, Bath, Square, Heart, Share2, Calendar } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { properties } from '../data/properties';
import { useNavigate } from 'react-router-dom';
const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = properties.find(p => p.id === parseInt(id));

  const property4 = {
    title: 'Luxury Modern Villa',
    price: 1250000,
    location: 'Borrowdale, Harare',
    description: 'This stunning modern villa offers the perfect blend of luxury and comfort. Featuring premium finishes, smart home technology, and breathtaking views.',
    features: [
      'Smart Home Technology',
      'Infinity Pool',
      'Home Theater',
      'Wine Cellar',
      'Gourmet Kitchen',
      'Private Garden',
    ],
    details: {
      beds: 4,
      baths: 3,
      sqft: 2500,
      yearBuilt: 2022,
      lotSize: '0.5 acres',
      garage: '2 cars',
    },
  };

  return (
    <div className="min-h-screen pt-16 bg-stone-50">
      {/* Property Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-stone-900 mb-2">
                  {property.title}
                </h1>
                <div className="flex items-center text-stone-600">
                  <MapPin className="w-5 h-5 mr-2" />
                  {property.location}
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <p className="text-3xl font-bold text-stone-900">
                  ${property.price.toLocaleString()}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Property Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 gap-4 mb-8"
            >
              <div className="col-span-2 h-96 bg-gradient-to-r from-stone-500 to-stone-700 rounded-xl">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="h-48 bg-gradient-to-r from-stone-400 to-stone-600 rounded-xl">
                <img
                  src={property.images[1]}
                  alt={property.title}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="h-48 bg-gradient-to-r from-stone-400 to-stone-600 rounded-xl">
                <img
                  src={property.images[2]}
                  alt={property.title}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-stone-900 mb-4">Description</h2>
              <p className="text-stone-600">{property.description}</p>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-stone-900 mb-4">Features</h2>
              <div className="grid grid-cols-2 gap-4">
                {property.features.map((feature, i) => (
                  <div key={i} className="flex items-center text-stone-600">
                    <div className="w-2 h-2 bg-stone-500 rounded-full mr-2" />
                    {feature}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-8 sticky top-24"
            >
              <div className="flex justify-between mb-8">
                <button className="flex items-center text-stone-600 hover:text-stone-900">
                  <Heart className="w-5 h-5 mr-2" />
                  Save
                </button>
                <button className="flex items-center text-stone-600 hover:text-stone-900">
                  <Share2 className="w-5 h-5 mr-2" />
                  Share
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div>
                  <p className="text-stone-500 text-sm mb-1">Bedrooms</p>
                  <p className="font-semibold">{property.beds}</p>
                </div>
                <div>
                  <p className="text-stone-500 text-sm mb-1">Bathrooms</p>
                  <p className="font-semibold">{property.baths}</p>
                </div>
                <div>
                  <p className="text-stone-500 text-sm mb-1">Square Feet</p>
                  <p className="font-semibold">{property.sqft}</p>
                </div>
                <div>
                  <p className="text-stone-500 text-sm mb-1">Year Built</p>
                  <p className="font-semibold">{property.details.yearBuilt}</p>
                </div>
                <div>
                  <p className="text-stone-500 text-sm mb-1">Lot Size</p>
                  <p className="font-semibold">{property.details.lotSize}</p>
                </div>
                <div>
                  <p className="text-stone-500 text-sm mb-1">Garage</p>
                  <p className="font-semibold">{property.details.garage}</p>
                </div>
              </div>

              <button onClick={() => navigate('/contact')} className="w-full bg-stone-900 text-white py-3 rounded-lg hover:bg-stone-800 transition-colors mb-4">
                Schedule a Tour
              </button>
              <button onClick={() => navigate('/contact')} className="w-full border border-stone-900 text-stone-900 py-3 rounded-lg hover:bg-stone-50 transition-colors">
                Contact Agent
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;