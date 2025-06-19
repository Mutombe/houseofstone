import React from "react";
import { Link, useParams } from "react-router-dom";
import { MapPin, ArrowLeft } from "lucide-react";

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

const CitySuburbs = () => {
  const { cityName } = useParams();
  const city = cityData[cityName.toLowerCase()] || {
    name: cityName,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    suburbs: Array(6).fill({
      name: "Suburb Name",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      avgPrice: "$XXXK",
      avgRent: "$XXX",
      distanceToCBD: "X km",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop"
    })
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link 
            to="/neighborhoods" 
            className="inline-flex items-center text-yellow-600 hover:text-yellow-700 font-medium"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to all cities
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">{city.name}</h1>
              <div className="flex items-center text-gray-500 mb-4">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{city.coordinates || "Coordinates not available"}</span>
              </div>
            </div>
            <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg md:ml-4">
              <span className="font-medium">Weather:</span> 65°F • Mostly cloudy
            </div>
          </div>
          <p className="text-gray-600">{city.description}</p>
        </div>

        <h2 className="text-2xl font-bold text-slate-800 mb-6">Neighborhoods in {city.name}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {city.suburbs.map((suburb, index) => (
            <Link 
              to={`/neighborhoods/${cityName.toLowerCase()}/${suburb.name.toLowerCase().replace(/\s+/g, '-')}`} 
              key={index}
              className="group"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={suburb.image}
                    alt={suburb.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-bold text-white">{suburb.name}</h3>
                  </div>
                </div>
                <div className="p-4 flex-1">
                  <p className="text-gray-600 mb-4">{suburb.description}</p>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="bg-gray-100 p-2 rounded">
                      <div className="text-gray-500">Avg. Price</div>
                      <div className="font-semibold">{suburb.avgPrice}</div>
                    </div>
                    <div className="bg-gray-100 p-2 rounded">
                      <div className="text-gray-500">Avg. Rent</div>
                      <div className="font-semibold">{suburb.avgRent}</div>
                    </div>
                    <div className="bg-gray-100 p-2 rounded">
                      <div className="text-gray-500">To CBD</div>
                      <div className="font-semibold">{suburb.distanceToCBD}</div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CitySuburbs;