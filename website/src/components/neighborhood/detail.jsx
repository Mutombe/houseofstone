import React from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin,
  ArrowLeft,
  ArrowRight,
  Home,
  School,
  ShoppingCart,
  Heart,
  Share2,
  DollarSign,
  Navigation,
  Star,
  Building,
  Stethoscope,
  Bus,
  Trees,
  Coffee,
  Dumbbell,
} from "lucide-react";
import { MdStarPurple500 } from "react-icons/md";

// Floating Orb Component
const FloatingOrb = ({ className, delay = 0 }) => (
  <motion.div
    className={`absolute rounded-full blur-3xl ${className}`}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.1, 0.2, 0.1],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
  />
);

// Grid Pattern Component
const GridPattern = () => (
  <div className="absolute inset-0 opacity-[0.02]">
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `linear-gradient(#C9A962 1px, transparent 1px), linear-gradient(90deg, #C9A962 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }}
    />
  </div>
);

// Get amenity icon based on type
const getAmenityIcon = (type) => {
  switch (type) {
    case "shopping":
      return ShoppingCart;
    case "medical":
      return Stethoscope;
    case "transport":
      return Bus;
    case "recreation":
      return Trees;
    case "cultural":
      return Building;
    case "fitness":
      return Dumbbell;
    default:
      return Coffee;
  }
};

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
          "Borrowdale Brooke is arguably Harare's most prestigious area, anchored by its world-class 18-hole golf course designed by Peter Matkovich and Nick Price. ",
        avgPrice: "$350K",
        avgRent: "$1,200",
        distanceToCBD: "19 km",
        image:
          "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=600&fit=crop",
        coordinates: "17.4532° S, 31.0339° E",
        life: "Borrowdale Brooke might just be the wealthiest suburb in Harare. It's widely considered the most posh one and one of the best places to live in Harare. Residents enjoy the security of a gated environment while maintaining easy access to Harare's northern suburbs. The estate's carefully planned layout, featuring wide streets lined with mature trees and well-maintained gardens, creates an atmosphere of tranquility despite being just 15 minutes from the CBD. The lifestyle here centers around outdoor living, with the golf course serving as both a recreational facility and a social hub. Its proximity to key amenities, including the Borrowdale Brooke Shopping Centre, and premier educational institutions like St. John's College, combined with its stringent security measures, has established it as one of Harare's most sought-after residential addresses.",
        schools: [
          {
            name: " St. John's College",
            distance: "1.2 km",
            rating: "4.2/5",
          },
          {
            name: "St. John's Preparatory School",
            distance: "3.5 km",
            rating: "4.5/5",
          },
        ],
        amenities: [
          {
            name: "Borrowdale Brooke Shopping Centre",
            distance: "4.3 km",
            type: "shopping",
          },
          {
            name: "Bon Marché supermarket",
            distance: "0.8 km",
            type: "medical",
          },
        ],
        nearbySuburbs: [
          { name: "Adylinn", distance: "5 km", avgPrice: "$350K" },
        ],
      },
      {
        name: "Adylinn",
        city: "Harare",
        description:
          "Adylinn is a tranquil suburban neighborhood in Harare known for its spacious family homes and medium-density residential character.Located near the A1 highway, the area offers convenient access to major shopping centers like Westgate (4.3km) and Avonlea Shopping Centre.",
        avgPrice: "$185K",
        avgRent: "$700",
        distanceToCBD: "13 km",
        image:
          "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",

        coordinates: "17.4532° S, 31.0339° E",
        life: "Living in Adylinn offers a balanced suburban lifestyle that's particularly appealing to families seeking space and value. The neighbourhood's lower density creates a peaceful atmosphere while still providing convenient access to daily amenities. Most destinations require a short drive, but residents enjoy the tranquility of a true suburban setting away from the bustle of central Harare. The area's mix of housing options and relatively affordable prices makes it attractive to both first-time homebuyers and established families.",
        schools: [
          {
            name: "Riverside Senior School (1.5km)",
            distance: "1.2 km",
            rating: "4.2/5",
          },
          {
            name: "Wise Owl High School (2.1km)",
            distance: "3.5 km",
            rating: "4.5/5",
          },
        ],
        amenities: [
          {
            name: "Westgate Shopping Centre (4.3km)",
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
        name: "Highlands",
        description:
          "Orange Grove Drive is one of Harare's most exclusive addresses—and it belongs to Highlands.Nestled within the city's coveted 'Golden Triangle,' Highlands' tree-lined streets and proximity to key facilities, such as the Zimbabwe Broadcasting Corporation, set it apart.Elevated 1,600 meters above sea level, Highlands stands head and shoulders above the rest.",
        avgPrice: "$210K-$1.3m",
        avgRent: "$900",
        distanceToCBD: "5 km",
        image:
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
        coordinates: "17.4532° S, 31.0339° E",
        life: "The Highlands is arguably the best suburb to live in Harare. It's certainly one of the most in-demand. Some have even described it as a posh area in Harare. As Zimbabwe's leading property portal, Propertybook observes that Highlands particularly appeals to professionals, diplomats, and families seeking a prestigious address in a historic neighbourhood with excellent amenities.",
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
            name: "Highland Park shopping center",
            distance: "4.3 km",
            type: "shopping",
          },
          {
            name: "Pick n' Pay supermarket",
            distance: "0.8 km",
            type: "shopping",
          },
          {
            name: "First Capital Bank",
            distance: "0.8 km",
            type: "banking",
          },
        ],
        nearbySuburbs: [
          { name: "Newlands", distance: "5 km", avgPrice: "$350K" },
        ],
      },
      {
        name: "Mount Pleasant",
        description:
          "Anchored by the historic University of Zimbabwe campus, Mount Pleasant combines educational excellence with comfortable suburban living.Bordered by Avondale West, Vainona, Emerald Hill, Belgravia, and Marlborough, it attracts academics, professionals, and families alike.Originally developed in 1902, Mount Pleasant has evolved into a diverse community.",
        avgPrice: "$150K -$3.0m",
        avgRent: "$750",
        distanceToCBD: "6 km",
        image:
          "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop",
        coordinates: "17.4532° S, 31.0339° E",
        life: "Mount Pleasant is one of Harare's leading suburbs and a great place to live. Tree-lined streets, spacious properties, and well-maintained gardens characterize this established suburb, where long-term residents mix comfortably with academic staff and students. The neighbourhood's mix of housing options, from classic colonial homes to modern developments, caters to various lifestyle preferences. Mount Pleasant alone offers a unique blend of academic energy and suburban tranquility.",
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
            name: "Bond Street Shopping Centre",
            distance: "4.3 km",
            type: "shopping",
          },
          {
            name: "Venus Medical & Dental Centre",
            distance: "0.8 km",
            type: "medical",
          },
          {
            name: "Arundel Hospital",
            distance: "1.5 km",
            type: "medical",
          },
        ],
        nearbySuburbs: [
          { name: "Avondale", distance: "5 km", avgPrice: "$350K" },
        ],
      },
      {
        name: "Avondale",
        description:
          "Avondale was established in 1903 as Harare's first suburb.The neighbourhood features tree-lined streets dotted with a mix of family homes and modern apartments, anchored by the bustling Avondale Shopping Centre.Originally a dairy farm named after its Irish counterpart in County Wicklow, this historic area has evolved into a thriving community.",
        avgPrice: "$195K",
        avgRent: "$650",
        distanceToCBD: "3 km",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
        coordinates: "17.4532° S, 31.0339° E",
        life: "Avondale is one of the best and safest suburbs Harare has to offer. Its strategic location provides easy access to prestigious schools, medical facilities, and entertainment venues, while maintaining its distinctive suburban character. The neighbourhood's mature trees and wide streets create a peaceful atmosphere, while the proximity to shopping centers, restaurants, and professional services ensures all amenities are within easy reach.",
        schools: [
          {
            name: "Littlerock International School",
            distance: "1.2 km",
            rating: "4.2/5",
          },
          {
            name: "Avondale Primary School",
            distance: "3.5 km",
            rating: "4.5/5",
          },
        ],
        amenities: [
          {
            name: "Avondale Flea Market",
            distance: "4.3 km",
            type: "shopping",
          },
          {
            name: "High Performance Centre",
            distance: "0.8 km",
            type: "fitness",
          },
        ],
        nearbySuburbs: [
          { name: "Strathaven", distance: "5 km", avgPrice: "$350K" },
        ],
      },
      {
        name: "Greendale",
        description:
          "Home of the Honeydew Lifestyle Center, the serene and leafy suburb of Greendale lies a mere 7 km from Harare's CBD. With its collection of schools, lifestyle centers and business parks, Greendale offers the perfect blend of suburban tranquility and urban convenience. Originally established in the 1950s, Greendale is now one of Harare's pre-eminent suburbs.",
        avgPrice: "$240K",
        avgRent: "$800",
        distanceToCBD: "10 km",
        image:
          "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&h=600&fit=crop",
        coordinates: "17.4532° S, 31.0339° E",
        life: "Greendale is one of Harare's most desirable suburbs and an amazing place to live. With the Honeydew Lifestyle Center its heartbeat, Greendale offers the popular Food Lover's Market, the well-reviewed Three Monkeys restaurant and as well as a number of highly regarded cafes and recreational spots. It has everything to offer to singles, families and professionals alike.",
        schools: [
          {
            name: "Nova Satus Christian Academy",
            distance: "1.2 km",
            rating: "4.2/5",
          },
          {
            name: "Herentals Greendale Primary School",
            distance: "3.5 km",
            rating: "4.5/5",
          },
        ],
        amenities: [
          {
            name: "Food Lover's Market",
            distance: "4.3 km",
            type: "shopping",
          },
          {
            name: "Athlone Family Clinic",
            distance: "0.8 km",
            type: "medical",
          },
        ],
        nearbySuburbs: [
          { name: "Athlone", distance: "5 km", avgPrice: "$350K" },
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
        life: "Rhodene offers a peaceful lifestyle with spacious properties and well-maintained gardens. The suburb attracts professionals and families seeking a quieter pace of life while remaining close to Masvingo's amenities.",
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
        life: "Mucheke is the heart of Masvingo's community life, with bustling markets and a vibrant atmosphere. The township offers affordable housing options and a strong sense of community.",
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
        life: "Murambi offers stunning views of the Eastern Highlands and a premium lifestyle. The suburb is known for its well-maintained properties and family-friendly environment.",
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
        life: "Dangamvura is a vibrant community with active markets and a strong sense of neighborhood. The area offers affordable housing and easy access to local amenities.",
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
        life: "Gadzema is known for its rich cultural heritage and strong community bonds. The area offers affordable living with a traditional Zimbabwean atmosphere.",
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
        life: "Hunyani Hills offers a premium lifestyle with proximity to the famous Chinhoyi Caves. The area attracts professionals and academics from nearby institutions.",
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
        life: "Windsor Park is Gweru's premier residential area, featuring spacious properties and a family-friendly environment. The suburb is popular with professionals and business owners.",
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
        life: "Mtapa offers affordable housing and a vibrant community atmosphere. The area is known for its lively markets and strong neighborhood connections.",
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
        life: "Thorngrove offers a peaceful suburban lifestyle with spacious properties and well-maintained gardens. The area is popular with families seeking a quiet environment.",
        schools: [
          {
            name: "Thorngrove Primary School",
            distance: "1.2 km",
            rating: "4.2/5",
          },
          { name: "Milton High School", distance: "3.5 km", rating: "4.5/5" },
        ],
        amenities: [
          {
            name: "Ascot Shopping Centre",
            distance: "4.3 km",
            type: "shopping",
          },
          {
            name: "Thorngrove Medical Centre",
            distance: "0.8 km",
            type: "medical",
          },
        ],
        nearbySuburbs: [
          { name: "Khumalo", distance: "5 km", avgPrice: "$500K" },
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
        life: "Barbour Fields combines residential living with commercial convenience. The area is ideal for those who prefer easy access to business districts.",
        schools: [
          {
            name: "Barbour Fields Primary",
            distance: "1.2 km",
            rating: "4.2/5",
          },
          { name: "Hamilton High School", distance: "3.5 km", rating: "4.5/5" },
        ],
        amenities: [
          {
            name: "Barbour Fields Mall",
            distance: "0.5 km",
            type: "shopping",
          },
          {
            name: "United Bulawayo Hospitals",
            distance: "2.0 km",
            type: "medical",
          },
        ],
        nearbySuburbs: [
          { name: "Bradfield", distance: "3 km", avgPrice: "$300K" },
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
        life: "Bradfield offers a classic suburban experience with tree-lined streets and friendly neighbors. The area is perfect for families seeking good schools and parks.",
        schools: [
          {
            name: "Bradfield Primary School",
            distance: "1.2 km",
            rating: "4.2/5",
          },
          { name: "Girls College", distance: "3.5 km", rating: "4.5/5" },
        ],
        amenities: [
          {
            name: "Bradfield Shopping Centre",
            distance: "1.0 km",
            type: "shopping",
          },
          {
            name: "Mater Dei Hospital",
            distance: "2.5 km",
            type: "medical",
          },
        ],
        nearbySuburbs: [
          { name: "Khumalo", distance: "2 km", avgPrice: "$500K" },
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
        life: "Khumalo is one of Bulawayo's most prestigious neighborhoods. The area features large properties with mature gardens and attracts professionals and diplomats.",
        schools: [
          {
            name: "Khumalo Primary School",
            distance: "1.2 km",
            rating: "4.2/5",
          },
          { name: "CBC High School", distance: "3.5 km", rating: "4.5/5" },
        ],
        amenities: [
          {
            name: "Khumalo Shopping Centre",
            distance: "1.5 km",
            type: "shopping",
          },
          {
            name: "Mater Dei Hospital",
            distance: "3.0 km",
            type: "medical",
          },
        ],
        nearbySuburbs: [
          { name: "Bradfield", distance: "2 km", avgPrice: "$300K" },
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
        life: "Ascot offers a dynamic living experience with easy access to shopping, dining, and entertainment. The area attracts young professionals and families alike.",
        schools: [
          {
            name: "Ascot Primary School",
            distance: "1.2 km",
            rating: "4.2/5",
          },
          { name: "Northlea High School", distance: "3.5 km", rating: "4.5/5" },
        ],
        amenities: [
          {
            name: "Ascot Shopping Centre",
            distance: "0.5 km",
            type: "shopping",
          },
          {
            name: "Ascot Medical Centre",
            distance: "0.8 km",
            type: "medical",
          },
        ],
        nearbySuburbs: [
          { name: "Malindela", distance: "3 km", avgPrice: "$400K" },
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
        life: "Malindela combines suburban tranquility with modern conveniences. The area is ideal for families seeking a peaceful environment with good schools nearby.",
        schools: [
          {
            name: "Malindela Primary School",
            distance: "1.2 km",
            rating: "4.2/5",
          },
          { name: "Founders High School", distance: "3.5 km", rating: "4.5/5" },
        ],
        amenities: [
          {
            name: "Malindela Shopping Centre",
            distance: "1.0 km",
            type: "shopping",
          },
          {
            name: "Malindela Medical Centre",
            distance: "0.8 km",
            type: "medical",
          },
        ],
        nearbySuburbs: [
          { name: "Ascot", distance: "3 km", avgPrice: "$350K" },
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
        life: "Morningside offers a welcoming community atmosphere with well-maintained streets and friendly neighbors. The area is popular with families and retirees.",
        schools: [
          {
            name: "Morningside Primary School",
            distance: "1.2 km",
            rating: "4.2/5",
          },
          { name: "Eveline High School", distance: "3.5 km", rating: "4.5/5" },
        ],
        amenities: [
          {
            name: "Morningside Shopping Centre",
            distance: "1.0 km",
            type: "shopping",
          },
          {
            name: "Morningside Clinic",
            distance: "0.8 km",
            type: "medical",
          },
        ],
        nearbySuburbs: [
          { name: "Khumalo", distance: "2 km", avgPrice: "$500K" },
        ],
      },
    ],
  },
};

// School Card Component
const SchoolCard = ({ school, suburbName }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-[#C9A962]/30 transition-all duration-300"
  >
    <div className="flex items-start justify-between">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-[#C9A962]/10 rounded-lg flex items-center justify-center flex-shrink-0">
          <School className="w-5 h-5 text-[#C9A962]" />
        </div>
        <div>
          <h4 className="font-medium text-white mb-1">{school.name}</h4>
          <div className="flex items-center gap-1 text-gray-400 text-sm">
            <MapPin className="w-3 h-3" />
            <span>{school.distance} from {suburbName}</span>
          </div>
        </div>
      </div>
      {school.rating && (
        <div className="flex items-center gap-1 px-3 py-1 bg-[#C9A962]/10 rounded-full">
          <MdStarPurple500 className="w-3 h-3 text-[#C9A962] fill-[#C9A962]" />
          <span className="text-[#C9A962] text-sm font-medium">{school.rating}</span>
        </div>
      )}
    </div>
  </motion.div>
);

// Amenity Card Component
const AmenityCard = ({ amenity, suburbName, index }) => {
  const IconComponent = getAmenityIcon(amenity.type);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-[#C9A962]/30 transition-all duration-300"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-[#C9A962]/10 rounded-lg flex items-center justify-center flex-shrink-0">
          <IconComponent className="w-5 h-5 text-[#C9A962]" />
        </div>
        <div>
          <h4 className="font-medium text-white mb-1">{amenity.name}</h4>
          <div className="flex items-center gap-1 text-gray-400 text-sm">
            <MapPin className="w-3 h-3" />
            <span>{amenity.distance} from {suburbName}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Nearby Suburb Card Component
const NearbySuburbCard = ({ nearby, cityName }) => (
  <Link
    to={`/neighborhoods/${cityName.toLowerCase()}/${nearby.name
      .toLowerCase()
      .replace(/\s+/g, "-")}`}
    className="group"
  >
    <motion.div
      whileHover={{ x: 5 }}
      className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:border-[#C9A962]/30 transition-all duration-300"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-[#C9A962]/10 transition-colors">
          <Home className="w-5 h-5 text-gray-400 group-hover:text-[#C9A962] transition-colors" />
        </div>
        <div>
          <h4 className="font-medium text-white group-hover:text-[#C9A962] transition-colors">
            {nearby.name}
          </h4>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>{nearby.distance} away</span>
            <span className="text-[#C9A962]">{nearby.avgPrice}</span>
          </div>
        </div>
      </div>
      <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-[#C9A962] transition-colors" />
    </motion.div>
  </Link>
);

const SuburbDetail = () => {
  const { cityName, suburbName } = useParams();
  const formattedSuburbName = suburbName.replace(/-/g, " ");
  const city = cityData[cityName.toLowerCase()] || { name: cityName, suburbs: [] };
  const suburb = city.suburbs?.find(
    (s) => s.name.toLowerCase() === formattedSuburbName.toLowerCase()
  ) || {
    name: formattedSuburbName,
    description: "Information about this suburb is coming soon.",
    avgPrice: "N/A",
    avgRent: "N/A",
    distanceToCBD: "N/A",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
    coordinates: "N/A",
    life: "",
    schools: [],
    amenities: [],
    nearbySuburbs: [],
  };

  return (
    <div className="min-h-screen bg-[#060D16]">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={suburb.image}
            alt={suburb.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060D16] via-[#060D16]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060D16]/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-12">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <Link
              to={`/neighborhoods/${cityName.toLowerCase()}`}
              className="inline-flex items-center gap-2 text-gray-300 hover:text-[#C9A962] transition-colors duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to {city.name} neighborhoods
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {suburb.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#C9A962]" />
                <span>{city.name}, Zimbabwe</span>
              </div>
              {suburb.coordinates && suburb.coordinates !== "N/A" && (
                <div className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-[#C9A962]" />
                  <span className="text-sm">{suburb.coordinates}</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute top-32 right-4 sm:right-8 flex gap-3"
          >
            <button className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#C9A962]/20 hover:border-[#C9A962]/30 border border-white/20 transition-all duration-300">
              <Heart className="w-5 h-5 text-white" />
            </button>
            <button className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#C9A962]/20 hover:border-[#C9A962]/30 border border-white/20 transition-all duration-300">
              <Share2 className="w-5 h-5 text-white" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative py-16">
        <div className="absolute inset-0">
          <GridPattern />
          <FloatingOrb className="w-[500px] h-[500px] bg-[#C9A962] -top-40 -right-40" delay={0} />
          <FloatingOrb className="w-[300px] h-[300px] bg-[#1E3A5F] bottom-40 left-20" delay={2} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Stats Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-3 gap-4"
              >
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 text-center">
                  <DollarSign className="w-6 h-6 text-[#C9A962] mx-auto mb-2" />
                  <div className="text-gray-400 text-sm mb-1">To Buy</div>
                  <div className="text-xl font-bold text-white">{suburb.avgPrice}</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 text-center">
                  <DollarSign className="w-6 h-6 text-[#C9A962] mx-auto mb-2" />
                  <div className="text-gray-400 text-sm mb-1">To Rent</div>
                  <div className="text-xl font-bold text-white">{suburb.avgRent}</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 text-center">
                  <Navigation className="w-6 h-6 text-[#C9A962] mx-auto mb-2" />
                  <div className="text-gray-400 text-sm mb-1">To CBD</div>
                  <div className="text-xl font-bold text-white">{suburb.distanceToCBD}</div>
                </div>
              </motion.div>

              {/* About Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8"
              >
                <h2 className="text-2xl font-bold text-white mb-4">
                  Your Guide to{" "}
                  <span className="bg-gradient-to-r from-[#C9A962] to-[#E8D5A3] bg-clip-text text-transparent">
                    {suburb.name}
                  </span>
                </h2>
                <p className="text-gray-400 leading-relaxed">{suburb.description}</p>
              </motion.div>

              {/* Life in Suburb Section */}
              {suburb.life && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8"
                >
                  <h3 className="text-xl font-bold text-white mb-4">
                    Life in {suburb.name}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">{suburb.life}</p>
                </motion.div>
              )}

              {/* Schools Section */}
              {suburb.schools && suburb.schools.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-[#C9A962]/10 rounded-lg flex items-center justify-center">
                      <School className="w-5 h-5 text-[#C9A962]" />
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      Schools in {suburb.name}
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {suburb.schools.map((school, index) => (
                      <SchoolCard key={index} school={school} suburbName={suburb.name} />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Amenities Section */}
              {suburb.amenities && suburb.amenities.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-[#C9A962]/10 rounded-lg flex items-center justify-center">
                      <ShoppingCart className="w-5 h-5 text-[#C9A962]" />
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      Nearby Amenities
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {suburb.amenities.map((amenity, index) => (
                      <AmenityCard
                        key={index}
                        amenity={amenity}
                        suburbName={suburb.name}
                        index={index}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Nearby Areas */}
                {suburb.nearbySuburbs && suburb.nearbySuburbs.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
                  >
                    <h3 className="text-lg font-bold text-white mb-4">
                      Nearby Areas
                    </h3>
                    <div className="space-y-3">
                      {suburb.nearbySuburbs.map((nearby, index) => (
                        <NearbySuburbCard
                          key={index}
                          nearby={nearby}
                          cityName={cityName}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Properties CTA */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="bg-gradient-to-br from-[#C9A962]/20 to-[#C9A962]/5 backdrop-blur-sm border border-[#C9A962]/20 rounded-2xl p-6"
                >
                  <div className="w-12 h-12 bg-[#C9A962]/20 rounded-xl flex items-center justify-center mb-4">
                    <Building className="w-6 h-6 text-[#C9A962]" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Properties in {suburb.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-6">
                    Browse properties currently available in this neighborhood.
                  </p>
                  <Link
                    to={`/properties?location=${suburb.name}`}
                    className="group flex items-center justify-center gap-2 w-full px-6 py-4 bg-gradient-to-r from-[#C9A962] to-[#B8985A] text-[#0A1628] font-semibold rounded-xl hover:shadow-lg hover:shadow-[#C9A962]/25 transition-all duration-300"
                  >
                    View Properties
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>

                {/* Contact CTA */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
                >
                  <h3 className="text-lg font-bold text-white mb-2">
                    Need Help?
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Our team can help you find the perfect property in {suburb.name}.
                  </p>
                  <Link
                    to="/contact"
                    className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-white/5 border border-white/10 text-white font-medium rounded-xl hover:bg-white/10 hover:border-[#C9A962]/30 transition-all duration-300"
                  >
                    Contact Us
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SuburbDetail;
