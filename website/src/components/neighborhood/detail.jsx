import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  MapPin,
  ArrowLeft,
  Home,
  School,
  ShoppingCart,
  Heart,
  Share2,
} from "lucide-react";

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
        distanceToCBD: "19 km",
        image:
          "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=600&fit=crop",
        coordinates: "17.4532° S, 31.0339° E",
        life: "Borrowdale Brooke might just be the wealthiest suburb in Harare. It's widely considered the most posh one and one of the best places to live in Harare. Residents enjoy the security of a gated environment while maintaining easy access to Harare’s northern suburbs. The estate’s carefully planned layout, featuring wide streets lined with mature trees and well-maintained gardens, creates an atmosphere of tranquility despite being just 15 minutes from the CBD. The lifestyle here centers around outdoor living, with the golf course serving as both a recreational facility and a social hub. Its proximity to key amenities, including the Borrowdale Brooke Shopping Centre, and premier educational institutions like St. John’s College, combined with its stringent security measures, has established it as one of Harare’s most sought-after residential addresses.",
        schools: [
          {
            name: " St. John’s College",
            distance: "1.2 km",
            rating: "4.2/5",
          },
          {
            name: "St. John’s Preparatory School",
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
        life: "Living in Adylinn offers a balanced suburban lifestyle that’s particularly appealing to families seeking space and value. The neighbourhood’s lower density creates a peaceful atmosphere while still providing convenient access to daily amenities. Most destinations require a short drive, but residents enjoy the tranquility of a true suburban setting away from the bustle of central Harare. The area’s mix of housing options and relatively affordable prices makes it attractive to both first-time homebuyers and established families.",
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
          "Orange Grove Drive is one of Harare’s most exclusive addresses—and it belongs to Highlands.Nestled within the city’s coveted ‘Golden Triangle,’ Highlands' tree-lined streets and proximity to key facilities, such as the Zimbabwe Broadcasting Corporation, set it apart.Elevated 1,600 meters above sea level, Highlands stands head and shoulders above the rest.",
        avgPrice: "$210K-$1.3m",
        avgRent: "$900",
        distanceToCBD: "5 km",
        image:
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
        coordinates: "17.4532° S, 31.0339° E",
        //image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
        life: "The Highlands is arguably the best suburb to live in Harare. It's certainly one of the most in-demand. Some have even described it as a posh area in Harare. As Zimbabwe’s leading property portal, Propertybook observes that Highlands particularly appeals to professionals, diplomats, and families seeking a prestigious address in a historic neighbourhood with excellent amenities.",
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
        //image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
        life: "Mount Pleasant is one of Harare's leading suburbs and a great place to live. Tree-lined streets, spacious properties, and well-maintained gardens characterize this established suburb, where long-term residents mix comfortably with academic staff and students. The neighbourhood’s mix of housing options, from classic colonial homes to modern developments, caters to various lifestyle preferences. Mount Pleasant alone offers a unique blend of academic energy and suburban tranquility.",
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
          "Avondale was established in 1903 as Harare’s first suburb.The neighbourhood features tree-lined streets dotted with a mix of family homes and modern apartments, anchored by the bustling Avondale Shopping Centre.Originally a dairy farm named after its Irish counterpart in County Wicklow, this historic area has evolved into a thriving community.",
        avgPrice: "$195K",
        avgRent: "$650",
        distanceToCBD: "3 km",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
        coordinates: "17.4532° S, 31.0339° E",
        //image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
        life: "Avondale is one of the best and safest suburbs Harare has to offer. Its strategic location provides easy access to prestigious schools, medical facilities, and entertainment venues, while maintaining its distinctive suburban character. The neighbourhood’s mature trees and wide streets create a peaceful atmosphere, while the proximity to shopping centers, restaurants, and professional services ensures all amenities are within easy reach.",
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
          "Home of the Honeydew Lifestyle Center, the serene and leafy suburb of Greendale lies a mere 7 km from Harare’s CBD. With its collection of schools, lifestyle centers and business parks, Greendale offers the perfect blend of suburban tranquility and urban convenience. Originally established in the 1950s, Greendale is now one of Harare’s pre-eminent suburbs.",
        avgPrice: "$240K",
        avgRent: "$800",
        distanceToCBD: "10 km",
        image:
          "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&h=600&fit=crop",
        coordinates: "17.4532° S, 31.0339° E",
        //image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
        life: "Greendale is one of Harare's most desirable suburbs and an amazing place to live. With the Honeydew Lifestyle Center its heartbeat, Greendale offers the popular Food Lover’s Market, the well-reviewed Three Monkeys restaurant and as well as a number of highly regarded cafes and recreational spots. It has everything to offer to singles, families and professionals alike.",
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
            name: "Food Lover’s Market",
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
};

const SuburbDetail = () => {
  const { cityName, suburbName } = useParams();
  const formattedSuburbName = suburbName.replace(/-/g, " ");
  const city = cityData[cityName.toLowerCase()] || { name: cityName };
  const suburb = city.suburbs.find(
    (s) => s.name.toLowerCase() === formattedSuburbName.toLowerCase()
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 pt-16">
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
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              {suburb.name}
            </h1>
            <div className="flex items-center text-white/90 mt-2">
              <MapPin className="w-5 h-5 mr-1" />
              <span>
                {suburb.city}, Zimbabwe • {suburb.coordinates}
              </span>
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
              <h2 className="text-2xl font-bold text-slate-800 mb-4">
                Your Guide to {suburb.name}
              </h2>
              <p className="text-gray-600 mb-6">{suburb.description}</p>

              <h3 className="text-xl font-semibold text-slate-800 mb-3">
                Suburb Overview
              </h3>
              <p className="text-gray-600 mb-6">{suburb.overview}</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-gray-500 text-sm mb-1">To Buy</div>
                  <div className="font-bold text-lg text-slate-800">
                    {suburb.avgPrice}
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-gray-500 text-sm mb-1">To Rent</div>
                  <div className="font-bold text-lg text-slate-800">
                    {suburb.avgRent}
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-gray-500 text-sm mb-1">
                    Distance To CBD
                  </div>
                  <div className="font-bold text-lg text-slate-800">
                    {suburb.distanceToCBD}
                  </div>
                </div>
              </div>
            </div>

            {/* Life in Suburb Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">
                Life in {suburb.name}
              </h3>
              <p className="text-gray-600 mb-6">
                Living in {suburb.name} offers a balanced suburban lifestyle
                that's particularly appealing to families seeking space and
                value. The neighbourhood's lower density creates a peaceful
                atmosphere while still providing convenient access to daily
                amenities. Most destinations require a short drive, but
                residents enjoy the tranquility of a true suburban setting away
                from the bustle of central {suburb.city}. The area's mix of
                housing options and relatively affordable prices makes it
                attractive to both first-time homebuyers and established
                families.
              </p>
            </div>

            {/* Schools Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
                <School className="w-5 h-5 mr-2 text-yellow-600" />
                Schools in {suburb.name}
              </h3>
              <div className="space-y-4">
                {suburb.schools?.map((school, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-slate-800">
                          {school.name}
                        </h4>
                        <div className="flex items-center text-gray-500 text-sm mt-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          <span>
                            {school.distance} from {suburb.name}
                          </span>
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
                  <div
                    key={index}
                    className="flex items-start p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="bg-yellow-100 p-2 rounded-full mr-3">
                      {amenity.type === "shopping" ? (
                        <ShoppingCart className="w-5 h-5 text-yellow-600" />
                      ) : amenity.type === "medical" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-yellow-600"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm4 14a1 1 0 100-2 1 1 0 000 2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-yellow-600"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-800">
                        {amenity.name}
                      </h4>
                      <div className="flex items-center text-gray-500 text-sm mt-1">
                        <MapPin className="w-3 h-3 mr-1" />
                        <span>
                          {amenity.distance} from {suburb.name}
                        </span>
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
              <h3 className="text-xl font-semibold text-slate-800 mb-4">
                Nearby Areas
              </h3>
              <div className="space-y-4">
                {suburb.nearbySuburbs.map((nearby, index) => (
                  <Link
                    to={`/neighborhoods/${cityName.toLowerCase()}/${nearby.name
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
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
                          <span>
                            {nearby.distance} away • Avg. price{" "}
                            {nearby.avgPrice}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold text-slate-800 mb-4">
                  Properties in {suburb.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  Browse properties currently available in this neighborhood:
                </p>
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
