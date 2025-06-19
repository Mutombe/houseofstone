import React from "react";
import { Link, useParams } from "react-router-dom";
import { MapPin, ArrowLeft, Home, School, ShoppingCart, Heart, Share2 } from "lucide-react";

// Sample data - in a real app this would come from an API
const cityData =  {
  harare: {
    name: "Harare",
    coordinates: "17.4532° S, 31.0339° E",
    description: "The capital and largest city of Zimbabwe, known for its vibrant urban life, cultural attractions, and economic opportunities.",
    suburbs: [
      {
        name: "Borrowdale",
        description: "Affluent suburb known for luxury homes and diplomatic residences",
        avgPrice: "$350K",
        avgRent: "$1,200",
        distanceToCBD: "8 km",
        image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=600&fit=crop"
      },
      {
        name: "Adylinn",
        description: "Tranquil suburban neighborhood with spacious family homes",
        avgPrice: "$185K",
        avgRent: "$700",
        distanceToCBD: "13 km",
        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop"
      },
      {
        name: "Highlands",
        description: "Established neighborhood with mature trees and quality homes",
        avgPrice: "$275K",
        avgRent: "$900",
        distanceToCBD: "5 km",
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop"
      },
      {
        name: "Mount Pleasant",
        description: "Popular with young professionals and families, near universities",
        avgPrice: "$220K",
        avgRent: "$750",
        distanceToCBD: "6 km",
        image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop"
      },
      {
        name: "Avondale",
        description: "Central location with mix of residential and commercial properties",
        avgPrice: "$195K",
        avgRent: "$650",
        distanceToCBD: "3 km",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop"
      },
      {
        name: "Greendale",
        description: "Leafy suburb with excellent schools and community feel",
        avgPrice: "$240K",
        avgRent: "$800",
        distanceToCBD: "10 km",
        image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&h=600&fit=crop"
      }
    ]
  },
  bulawayo: {
    name: "Bulawayo",
    coordinates: "20.1440° S, 28.3531° E",
    description: "Zimbabwe's second largest city with wide streets, colonial architecture, and rich cultural heritage.",
    suburbs: [
      {
        name: "Suburbs Placeholder",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        avgPrice: "$XXXK",
        avgRent: "$XXX",
        distanceToCBD: "X km",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop"
      }
    ]
  }
};

const suburbData = {
  harare: {
    adylinn: {
      name: "Adylinn",
      city: "Harare",
      description: "Adylinn is a tranquil suburban neighborhood in Harare known for its spacious family homes and medium-density residential character.",
      overview: "Located near the A1 highway, the area offers convenient access to major shopping centers like Westgate (4.3km) and Avonlea Shopping Centre. The neighbourhood features a mix of housing options, with predominantly 3-4 bedroom homes.",
      avgPrice: "$185K - $180K",
      avgRent: "$700 - $700",
      distanceToCBD: "13 km",
      coordinates: "17.4532° S, 31.0339° E",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
      schools: [
        { name: "Adylinn Primary School", distance: "1.2 km", rating: "4.2/5" },
        { name: "Harare High School", distance: "3.5 km", rating: "4.5/5" },
        { name: "St. John's College", distance: "5.1 km", rating: "4.8/5" }
      ],
      amenities: [
        { name: "Westgate Shopping Mall", distance: "4.3 km", type: "shopping" },
        { name: "Avonlea Shopping Centre", distance: "2.1 km", type: "shopping" },
        { name: "Adylinn Medical Centre", distance: "0.8 km", type: "medical" },
        { name: "Arundel Sports Club", distance: "3.7 km", type: "recreation" }
      ],
      nearbySuburbs: [
        { name: "Borrowdale", distance: "5 km", avgPrice: "$350K" },
        { name: "Greendale", distance: "3 km", avgPrice: "$240K" },
        { name: "Mount Pleasant", distance: "7 km", avgPrice: "$220K" }
      ]
    }
  }
};

const SuburbDetail = () => {
  const { cityName, suburbName } = useParams();
  const formattedSuburbName = suburbName.replace(/-/g, ' ');
  const city = cityData[cityName.toLowerCase()] || { name: cityName };
  const suburb = suburbData[cityName.toLowerCase()]?.[formattedSuburbName] || {
    name: formattedSuburbName,
    city: cityName,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    overview: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    avgPrice: "$XXXK - $XXXK",
    avgRent: "$XXX - $XXX",
    distanceToCBD: "X km",
    coordinates: "XX.XXXX° S, XX.XXXX° E",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
    schools: Array(3).fill({
      name: "School Name",
      distance: "X km",
      rating: "X.X/5"
    }),
    amenities: Array(4).fill({
      name: "Amenity Name",
      distance: "X km",
      type: "type"
    }),
    nearbySuburbs: Array(3).fill({
      name: "Nearby Suburb",
      distance: "X km",
      avgPrice: "$XXXK"
    })
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link 
            to={`/neighborhoods/${cityName.toLowerCase()}`} 
            className="inline-flex items-center text-yellow-600 hover:text-yellow-700 font-medium"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to {city.name} neighborhoods
          </Link>
        </div>

        {/* Hero Section */}
        <div className="relative rounded-xl overflow-hidden mb-8 h-64 sm:h-80 md:h-96">
          <img
            src={suburb.image}
            alt={suburb.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-white">{suburb.name}</h1>
            <div className="flex items-center text-white/90 mt-2">
              <MapPin className="w-5 h-5 mr-1" />
              <span>{suburb.city}, Zimbabwe • {suburb.coordinates}</span>
            </div>
          </div>
          <div className="absolute top-6 right-6 flex gap-3">
            <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-colors">
              <Heart className="w-5 h-5 text-white" />
            </button>
            <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-colors">
              <Share2 className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Your Guide to {suburb.name}</h2>
              <p className="text-gray-600 mb-6">{suburb.description}</p>
              
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Suburb Overview</h3>
              <p className="text-gray-600 mb-6">{suburb.overview}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-gray-500 text-sm mb-1">To Buy</div>
                  <div className="font-bold text-lg text-slate-800">{suburb.avgPrice}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-gray-500 text-sm mb-1">To Rent</div>
                  <div className="font-bold text-lg text-slate-800">{suburb.avgRent}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-gray-500 text-sm mb-1">Distance To CBD</div>
                  <div className="font-bold text-lg text-slate-800">{suburb.distanceToCBD}</div>
                </div>
              </div>
            </div>

            {/* Life in Suburb Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Life in {suburb.name}</h3>
              <p className="text-gray-600 mb-6">
                Living in {suburb.name} offers a balanced suburban lifestyle that's particularly appealing to families seeking space and value. The neighbourhood's lower density creates a peaceful atmosphere while still providing convenient access to daily amenities. Most destinations require a short drive, but residents enjoy the tranquility of a true suburban setting away from the bustle of central {suburb.city}. The area's mix of housing options and relatively affordable prices makes it attractive to both first-time homebuyers and established families.
              </p>
            </div>

            {/* Schools Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
                <School className="w-5 h-5 mr-2 text-yellow-600" />
                Schools in {suburb.name}
              </h3>
              <div className="space-y-4">
                {suburb.schools.map((school, index) => (
                  <div key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-slate-800">{school.name}</h4>
                        <div className="flex items-center text-gray-500 text-sm mt-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          <span>{school.distance} from {suburb.name}</span>
                        </div>
                      </div>
                      <div className="flex items-center bg-yellow-50 text-yellow-700 px-2 py-1 rounded-full text-sm">
                        <span className="font-medium">{school.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
                <ShoppingCart className="w-5 h-5 mr-2 text-yellow-600" />
                Nearby Amenities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {suburb.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                    <div className="bg-yellow-100 p-2 rounded-full mr-3">
                      {amenity.type === "shopping" ? (
                        <ShoppingCart className="w-5 h-5 text-yellow-600" />
                      ) : amenity.type === "medical" ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm4 14a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-800">{amenity.name}</h4>
                      <div className="flex items-center text-gray-500 text-sm mt-1">
                        <MapPin className="w-3 h-3 mr-1" />
                        <span>{amenity.distance} from {suburb.name}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Nearby Areas</h3>
              <div className="space-y-4">
                {suburb.nearbySuburbs.map((nearby, index) => (
                  <Link 
                    to={`/neighborhoods/${cityName.toLowerCase()}/${nearby.name.toLowerCase().replace(/\s+/g, '-')}`}
                    key={index}
                    className="group"
                  >
                    <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="bg-gray-100 p-2 rounded-full mr-3 group-hover:bg-yellow-100 transition-colors">
                        <Home className="w-5 h-5 text-gray-600 group-hover:text-yellow-600 transition-colors" />
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-800 group-hover:text-yellow-600 transition-colors">
                          {nearby.name}
                        </h4>
                        <div className="flex items-center text-gray-500 text-sm mt-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          <span>{nearby.distance} away • Avg. price {nearby.avgPrice}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Properties in {suburb.name}</h3>
                <p className="text-gray-600 mb-4">Browse properties currently available in this neighborhood:</p>
                <Link
                  to={`/properties?location=${suburb.name}`}
                  className="block w-full bg-yellow-600 hover:bg-yellow-700 text-white text-center font-medium py-3 px-4 rounded-lg transition-colors"
                >
                  View Properties
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuburbDetail;