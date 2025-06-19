import React from "react";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

const cities = [
  {
    name: "Harare",
    province: "Harare",
    coordinates: "17.4532° S, 31.0339° E",
    description: "The capital city of Zimbabwe with vibrant urban life",
    image: "harare1.jpg",
  },
  {
    name: "Bulawayo",
    province: "Bulawayo",
    coordinates: "20.1440° S, 28.3531° E",
    description: "Zimbabwe's second largest city with rich history",
    image: "bulawayo.png",
  },
  {
    name: "Mutare",
    province: "Manicaland",
    coordinates: "18.3786° S, 32.1746° E",
    description: "Picturesque city near the Eastern Highlands",
    image: "mutare.webp",
  },
  {
    name: "Masvingo",
    province: "Masvingo",
    coordinates: "20.8242° S, 31.2626° E",
    description: "Gateway to the Great Zimbabwe ruins",
    image: "masvingo.webp",
  },
  {
    name: "Chinhoyi",
    province: "Mashonaland West",
    coordinates: "17.4831° S, 28.7889° E",
    description: "Known for the Chinhoyi Caves and agricultural lands",
    image: "chinhoyi.webp",
  },
  {
    name: "Gweru",
    province: "Midlands",
    coordinates: "19.0532° S, 29.6035° E",
    description: "Industrial hub in the center of Zimbabwe",
    image: "gweru.png",
  },
];

const CitiesOverview = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            Explore All of Zimbabwe
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A deep dive into all the suburbs and neighborhoods in every Zimbabwean province, city and town
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cities.map((city, index) => (
            <Link 
              to={`/neighborhoods/${city.name.toLowerCase()}`} 
              key={index}
              className="group"
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={city.image}
                    alt={city.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-2xl font-bold text-slate-800 group-hover:text-yellow-600 transition-colors">
                      {city.name}
                    </h2>
                    <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                      {city.province}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-500 mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{city.coordinates}</span>
                  </div>
                  <p className="text-gray-600 mb-4 flex-1">{city.description}</p>
                  <div className="mt-auto">
                    <button className="text-yellow-600 font-semibold flex items-center group-hover:underline">
                      Explore neighborhoods
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 ml-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
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

export default CitiesOverview;