import React from "react";
import { Link, useParams } from "react-router-dom";
import { MapPin, ArrowLeft } from "lucide-react";

// Sample data - in a real app this would come from an API
const cityData = {
  harare: {
    name: "Harare",
    coordinates: "17.4532° S, 31.0339° E",
    description:
      "The capital and largest city of Zimbabwe, known for its vibrant urban life, cultural attractions, and economic opportunities.",
    suburbs: [
      {
        name: "Borrowdale",
        description:
          "Borrowdale Brooke is arguably Harare’s most prestigious area, anchored by its world-class 18-hole golf course designed by Peter Matkovich and Nick Price. ",
        avgPrice: "$350K",
        avgRent: "$1,200",
        distanceToCBD: "8 km",
        image:
          "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=600&fit=crop",
      },
      {
        name: "Adylinn",
        description:
          "Tranquil suburban neighborhood with spacious family homes",
        avgPrice: "$185K",
        avgRent: "$700",
        distanceToCBD: "13 km",
        image:
          "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
      },
      {
        name: "Highlands",
        description:
          "Established neighborhood with mature trees and quality homes",
        avgPrice: "$275K",
        avgRent: "$900",
        distanceToCBD: "5 km",
        image:
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
      },
      {
        name: "Mount Pleasant",
        description:
          "Popular with young professionals and families, near universities",
        avgPrice: "$220K",
        avgRent: "$750",
        distanceToCBD: "6 km",
        image:
          "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop",
      },
      {
        name: "Avondale",
        description:
          "Central location with mix of residential and commercial properties",
        avgPrice: "$195K",
        avgRent: "$650",
        distanceToCBD: "3 km",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
      },
      {
        name: "Greendale",
        description: "Leafy suburb with excellent schools and community feel",
        avgPrice: "$240K",
        avgRent: "$800",
        distanceToCBD: "10 km",
        image:
          "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&h=600&fit=crop",
      },
    ],
  },
  bulawayo: {
    name: "Bulawayo",
    coordinates: "20.1440° S, 28.3531° E",
    description:
      "Zimbabwe's second largest city with wide streets, colonial architecture, and rich cultural heritage.",
    suburbs: [
      {
        name: "Thorngrove",
        description: "Quiet residential area with spacious homes and gardens",
        avgPrice: "$450K",
        avgRent: "$1,500",
        distanceToCBD: "8 km",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
        coordinates: "17.4532° S, 31.0339° E",
        //image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
        life: "Life in Adylinn is peaceful, with spacious parks and family-friendly activities. The community is vibrant, hosting various events throughout the year.",
        schools: [
          {
            name: "Adylinn Primary School",
            distance: "1.2 km",
            rating: "4.2/5",
          },
          { name: "Harare High School", distance: "3.5 km", rating: "4.5/5" },
        ],
        amenities: [
          {
            name: "Westgate Shopping Mall",
            distance: "4.3 km",
            type: "shopping",
          },
          {
            name: "Adylinn Medical Centre",
            distance: "0.8 km",
            type: "medical",
          },
        ],
        nearbySuburbs: [
          { name: "Borrowdale", distance: "5 km", avgPrice: "$350K" },
        ],
      },
      {
        name: "Barbour Fields",
        description: "Bustling commercial area with a mix of residential and business properties",
        avgPrice: "$450K",
        avgRent: "$1,500",
        distanceToCBD: "8 km",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
        coordinates: "17.4532° S, 31.0339° E",
        //image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
        life: "Life in Adylinn is peaceful, with spacious parks and family-friendly activities. The community is vibrant, hosting various events throughout the year.",
        schools: [
          {
            name: "Adylinn Primary School",
            distance: "1.2 km",
            rating: "4.2/5",
          },
          { name: "Harare High School", distance: "3.5 km", rating: "4.5/5" },
        ],
        amenities: [
          {
            name: "Westgate Shopping Mall",
            distance: "4.3 km",
            type: "shopping",
          },
          {
            name: "Adylinn Medical Centre",
            distance: "0.8 km",
            type: "medical",
          },
        ],
        nearbySuburbs: [
          { name: "Borrowdale", distance: "5 km", avgPrice: "$350K" },
        ],
      },
      {
        name: "Bradfield",
        description: "Bradfield is a well-established suburb in Bulawayo, known for its spacious homes and family-friendly environment. It features tree-lined streets and is close to several schools and parks.",
        avgPrice: "$300K",
        avgRent: "$1,200",
        distanceToCBD: "6 km",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
        coordinates: "17.4532° S, 31.0339° E",
        //image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
        life: "Life in Adylinn is peaceful, with spacious parks and family-friendly activities. The community is vibrant, hosting various events throughout the year.",
        schools: [
          {
            name: "Adylinn Primary School",
            distance: "1.2 km",
            rating: "4.2/5",
          },
          { name: "Harare High School", distance: "3.5 km", rating: "4.5/5" },
        ],
        amenities: [
          {
            name: "Westgate Shopping Mall",
            distance: "4.3 km",
            type: "shopping",
          },
          {
            name: "Adylinn Medical Centre",
            distance: "0.8 km",
            type: "medical",
          },
        ],
        nearbySuburbs: [
          { name: "Borrowdale", distance: "5 km", avgPrice: "$350K" },
        ],
      },
      {
        name: "Khumalo",
        description: "Khumalo is a prestigious suburb in Bulawayo, known for its large homes and well-maintained gardens. It is a quiet area with a strong sense of community and is close to several amenities.",
        avgPrice: "$500K",
        avgRent: "$1,500",
        distanceToCBD: "7 km",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
        coordinates: "17.4532° S, 31.0339° E",
        //image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
        life: "Life in Adylinn is peaceful, with spacious parks and family-friendly activities. The community is vibrant, hosting various events throughout the year.",
        schools: [
          {
            name: "Adylinn Primary School",
            distance: "1.2 km",
            rating: "4.2/5",
          },
          { name: "Harare High School", distance: "3.5 km", rating: "4.5/5" },
        ],
        amenities: [
          {
            name: "Westgate Shopping Mall",
            distance: "4.3 km",
            type: "shopping",
          },
          {
            name: "Adylinn Medical Centre",
            distance: "0.8 km",
            type: "medical",
          },
        ],
        nearbySuburbs: [
          { name: "Borrowdale", distance: "5 km", avgPrice: "$350K" },
        ],
      },
      {
        name: "Ascot",
        description: "Ascot is a vibrant suburb in Bulawayo, known for its lively atmosphere and diverse community. It features a mix of residential and commercial properties, making it a convenient place to live.",
        avgPrice: "$350K",
        avgRent: "$1,500",
        distanceToCBD: "8 km",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
        coordinates: "17.4532° S, 31.0339° E",
        //image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
        life: "Life in Adylinn is peaceful, with spacious parks and family-friendly activities. The community is vibrant, hosting various events throughout the year.",
        schools: [
          {
            name: "Adylinn Primary School",
            distance: "1.2 km",
            rating: "4.2/5",
          },
          { name: "Harare High School", distance: "3.5 km", rating: "4.5/5" },
        ],
        amenities: [
          {
            name: "Westgate Shopping Mall",
            distance: "4.3 km",
            type: "shopping",
          },
          {
            name: "Adylinn Medical Centre",
            distance: "0.8 km",
            type: "medical",
          },
        ],
        nearbySuburbs: [
          { name: "Borrowdale", distance: "5 km", avgPrice: "$350K" },
        ],
      },
      {
        name: "Malindela",
        description: "Malindela is a peaceful suburb in Bulawayo, known for its spacious homes and family-friendly environment. It features well-maintained parks and is close to several schools and shopping centers.",
        avgPrice: "$400K",
        avgRent: "$1,500",
        distanceToCBD: "9 km",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
        coordinates: "17.4532° S, 31.0339° E",
        //image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
        life: "Life in Adylinn is peaceful, with spacious parks and family-friendly activities. The community is vibrant, hosting various events throughout the year.",
        schools: [
          {
            name: "Adylinn Primary School",
            distance: "1.2 km",
            rating: "4.2/5",
          },
          { name: "Harare High School", distance: "3.5 km", rating: "4.5/5" },
        ],
        amenities: [
          {
            name: "Westgate Shopping Mall",
            distance: "4.3 km",
            type: "shopping",
          },
          {
            name: "Adylinn Medical Centre",
            distance: "0.8 km",
            type: "medical",
          },
        ],
        nearbySuburbs: [
          { name: "Borrowdale", distance: "5 km", avgPrice: "$350K" },
        ],
      },
      {
        name: "Morningside",
        description: "Morningside is a charming suburb in Bulawayo, known for its friendly community and well-kept homes. It features tree-lined streets and is close to several parks and recreational facilities.",
        avgPrice: "$350K",
        avgRent: "$1,500",
        distanceToCBD: "7 km",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
        coordinates: "17.4532° S, 31.0339° E",
        //image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
        life: "Life in Adylinn is peaceful, with spacious parks and family-friendly activities. The community is vibrant, hosting various events throughout the year.",
        schools: [
          {
            name: "Adylinn Primary School",
            distance: "1.2 km",
            rating: "4.2/5",
          },
          { name: "Harare High School", distance: "3.5 km", rating: "4.5/5" },
        ],
        amenities: [
          {
            name: "Westgate Shopping Mall",
            distance: "4.3 km",
            type: "shopping",
          },
          {
            name: "Adylinn Medical Centre",
            distance: "0.8 km",
            type: "medical",
          },
        ],
        nearbySuburbs: [
          { name: "Borrowdale", distance: "5 km", avgPrice: "$350K" },
        ],
      },
    ],
  },

  masvingo: {
    name: "Masvingo",
    coordinates: "20.0625° S, 30.8236° E",
    description:
      "Zimbabwe's oldest colonial settlement, gateway to Great Zimbabwe ruins.",

    suburbs: [
      {
        name: "Rhodene",
        description: "Affluent low-density suburb with manicured gardens",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
        avgPrice: "$140K",
        avgRent: "$700",
        distanceToCBD: "3 km",
        coordinates: "20.0700° S, 30.8300° E",
        schools: [
          { name: "Victoria High School", distance: "2.2 km", rating: "4.4/5" },
        ],
        amenities: [
          {
            name: "Masvingo Sports Club",
            distance: "850 m",
            type: "recreation",
          },
        ],
        nearbySuburbs: [
          { name: "Mucheke", distance: "4 km", avgPrice: "$45K" },
        ],
      },
      {
        name: "Mucheke",
        description:
          "High-density township with vibrant markets and community life",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
        avgPrice: "$45K",
        avgRent: "$200",
        distanceToCBD: "1.5 km",
        coordinates: "20.0550° S, 30.8150° E",
        schools: [
          { name: "Mucheke High School", distance: "0.5 km", rating: "4.0/5" },
        ],
        amenities: [
          { name: "Mucheke Bus Rank", distance: "0.3 km", type: "transport" },
        ],
        nearbySuburbs: [
          { name: "Runyararo", distance: "2 km", avgPrice: "$60K" },
        ],
      },
    ],
  },
  mutare: {
    name: "Mutare",
    coordinates: "18.967° S, 32.633° E",
    description: "Zimbabwe's gateway to Mozambique and the Eastern Highlands.",
    suburbs: [
      {
        name: "Murambi",
        description: "Upscale hillside neighborhood with panoramic views",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
        avgPrice: "$220K",
        avgRent: "$950",
        distanceToCBD: "4 km",
        coordinates: "18.950° S, 32.650° E",
        schools: [
          { name: "Mutare Boys' High", distance: "3.2 km", rating: "4.6/5" },
        ],
        amenities: [
          { name: "Mutare Museum", distance: "3.8 km", type: "cultural" },
        ],
        nearbySuburbs: [
          { name: "Dangamvura", distance: "6 km", avgPrice: "$90K" },
        ],
      },
      {
        name: "Dangamvura",
        description: "High-density suburb with bustling informal markets",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
        avgPrice: "$90K",
        avgRent: "$350",
        distanceToCBD: "7 km",
        coordinates: "18.990° S, 32.670° E",
        schools: [
          { name: "Sakubva High School", distance: "1.0 km", rating: "3.9/5" },
        ],
        amenities: [
          { name: "Sakubva Market", distance: "0.5 km", type: "shopping" },
        ],
        nearbySuburbs: [
          { name: "Chikanga", distance: "3 km", avgPrice: "$110K" },
        ],
      },
    ],
  },
  chinhoyi: {
    name: "Chinhoyi",
    coordinates: "17.3497° S, 30.1944° E",
    description: "College town near the Chinhoyi Caves National Park.",

    suburbs: [
      {
        name: "Gadzema",
        description: "Cultural hub with strong community traditions",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
        avgPrice: "$75K",
        avgRent: "$300",
        distanceToCBD: "5 km",
        coordinates: "17.3600° S, 30.2100° E",
        schools: [],
        amenities: [],
        nearbySuburbs: [
          { name: "Hunyani Hills", distance: "3 km", avgPrice: "$150K" },
        ],
      },
      {
        name: "Hunyani Hills",
        description: "Affluent area near universities and nature reserves",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
        avgPrice: "$150K",
        avgRent: "$600",
        distanceToCBD: "2 km",
        coordinates: "17.3400° S, 30.1800° E",
        schools: [
          { name: "Lomagundi College", distance: "1.5 km", rating: "4.8/5" },
        ],
        amenities: [
          { name: "Chinhoyi Caves", distance: "8 km", type: "recreation" },
        ],
        nearbySuburbs: [],
      },
    ],
  },
  gweru: {
    name: "Gweru",
    coordinates: "19.4614° S, 29.8022° E",
    description:
      "Industrial hub in Midlands Province with a mix of urban and rural landscapes.",
    suburbs: [
      {
        name: "Windsor Park",
        description: "Leafy suburb with spacious homes and gardens",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
        avgPrice: "$300K",
        avgRent: "$1,200",
        distanceToCBD: "3 km",
        coordinates: "19.4500° S, 29.7900° E",
        schools: [
          {
            name: "Thornhill High School",
            distance: "2.0 km",
            rating: "4.5/5",
          },
        ],
        amenities: [
          { name: "Gweru Sports Club", distance: "1.5 km", type: "recreation" },
        ],
        nearbySuburbs: [{ name: "Mtapa", distance: "5 km", avgPrice: "$50K" }],
      },
      {
        name: "Mtapa",
        description: "Vibrant high-density area with lively markets",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
        avgPrice: "$50K",
        avgRent: "$250",
        distanceToCBD: "4 km",
        coordinates: "19.4800° S, 29.8200° E",
        schools: [
          { name: "Mkoba High School", distance: "1.2 km", rating: "4.0/5" },
        ],
        amenities: [
          { name: "Mtapa Flea Market", distance: "0.3 km", type: "shopping" },
        ],
        nearbySuburbs: [{ name: "Senga", distance: "2 km", avgPrice: "$65K" }],
      },
    ],
  },
};

const CitySuburbs = () => {
  const { cityName } = useParams();
  const city = cityData[cityName.toLowerCase()] || {
    name: cityName,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    suburbs: Array(6).fill({
      name: "Suburb Name",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      avgPrice: "$XXXK",
      avgRent: "$XXX",
      distanceToCBD: "X km",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
    }),
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
              <h1 className="text-3xl font-bold text-slate-800 mb-2">
                {city.name}
              </h1>
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

        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          Neighborhoods in {city.name}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {city.suburbs.map((suburb, index) => (
            <Link
              to={`/neighborhoods/${cityName.toLowerCase()}/${suburb.name
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
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
                    <h3 className="text-xl font-bold text-white">
                      {suburb.name}
                    </h3>
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
                      <div className="font-semibold">
                        {suburb.distanceToCBD}
                      </div>
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
