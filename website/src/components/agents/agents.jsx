import React, { useState } from "react";
import {
  Phone,
  Mail,
  MessageCircle,
  Star,
  Award,
  TrendingUp,
  Home,
  Users,
  MapPin,
  Calendar,
  CheckCircle,
  Filter,
  Search,
  Globe,
  Linkedin,
  Facebook,
  Twitter,
  ChevronDown,
  Sparkles,
  Shield,
  Clock,
  Target,
} from "lucide-react";
import { motion } from "framer-motion";

// Sample agents data
const agents = [
  {
    id: 1,
    name: "Lionita Mhishi",
    title: "Pincipal Registered Estate Agent",
    specialization: "Luxury Properties",
    experience: "8+ Years",
    image: "leo.jpeg",
    rating: 4.9,
    reviews: 127,
    propertiesSold: 156,
    languages: ["English", "French"],
    phone: "+263 77 123 4567",
    email: "leonita@hsp.co.zw",
    bio: "Leonita is the founder of House of Stone Properties, one of the top real estate agencies in the country. She has worked for various organizations holding key positions in Zimbabwe, Australia, China and various other countries. Experienced Property Consultant with a demonstrated history of working in the Real Estate industry for over 15 years. Skilled in Commercial Property Sales, Negotiation, Real Property, Diplomatic History, and International Relations, Leonita thrives in building business relationships grounded in adherence to the principles of honesty, transparency, integrity and legality, giving an assurance to all clients that all property dealings are done in conformity with the law. Leonita oversees the running of the company.",
    achievements: [
      "Top Agent 2023",
      "Million Dollar Club",
      "Customer Choice Award",
    ],
    areas: ["Borrowdale", "Highlands", "Mount Pleasant", "Avondale"],
    social: {
      linkedin: "#",
      facebook: "#",
      twitter: "#",
    },
  },
  {
    id: 2,
    name: "Nairgel Masiiwa",
    title: "Commercial Property Specialist",
    specialization: "Commercial Real Estate",
    experience: "12+ Years",
    image: "/nairgel.jpeg",
    rating: 4.8,
    reviews: 94,
    propertiesSold: 89,
    languages: ["English", "Shona", "Ndebele"],
    phone: "+263 77 234 5678",
    email: "nairgel@hsp.co.zw",
    bio: "Nairgel Masiiwa is a seasoned sales professional and current Head of Sales at House of Stone Properties, a leading real estate firm based in Zimbabwe. With a proven track record of driving revenue growth and building high-performing sales teams, Nairgel brings a wealth of expertise to his role, including construction and architecture, having worked in South Africa and Zimbabwe real estate industries. Throughout his career, he has demonstrated a keen understanding of the property market and a talent for identifying opportunities that drive business success. Under his leadership, the sales team at House of Stone Properties has consistently exceeded targets, solidifying the company's position as a major player in the industry. Nairgel's passion for innovative sales strategies and commitment to exceptional customer service have earned him a reputation as a respected and results-driven leader in the real estate sector. Nairgel is an expert in his field, providing the highest level of service and an incredible attention to detail when it comes to buying, selling, or renting properties.",
    achievements: [
      "Commercial Expert 2023",
      "Investment Advisor Award",
      "Top Revenue Generator",
    ],
    areas: ["CBD", "Msasa", "Workington", "Graniteside"],
    social: {
      linkedin: "#",
      facebook: "#",
      twitter: "#",
    },
  },
  {
    id: 3,
    name: "Tsitsi Mashingaidze",
    title: "Residential Property Agent",
    specialization: "Family Homes",
    experience: "6+ Years",
    image: "tsitsi.jpeg",
    rating: 4.9,
    reviews: 112,
    propertiesSold: 134,
    languages: ["English", "Shona"],
    phone: "+263 77 345 6789",
    email: "tsitsi@hsp.co.zw",
    bio: "Tsitsi is an Accountant by profession, and has more than 3 decades of finance, administration and sales experience in the Private, NGO and Retail Sectors. Tsitsi joined real estate industry in 2022 but has shown she is a force to be reckoned with. She is skilled at developing the right action plan for each of her client’s unique needs and committed to helping them choose the best properties. Throughout her career, Tsitsi has earned the trust of several national and international clients and maintained strong client relationships that generate repeat business. She attributes her success to her ability to listen to customers and put their needs first.",
    achievements: [
      "Family Choice Award",
      "Rising Star 2022",
      "Community Champion",
    ],
    areas: ["Warren Park", "Hatfield", "Marlborough", "Newlands"],
    social: {
      linkedin: "#",
      facebook: "#",
      twitter: "#",
    },
  },
  {
    id: 4,
    name: "James Mudzikitiri",
    title: "Marketing & Media Executive",
    specialization: "Investment Properties",
    experience: "10+ Years",
    image: "james.jpeg",
    rating: 4.7,
    reviews: 88,
    propertiesSold: 98,
    languages: ["English", "Shona"],
    phone: "+263 77 456 7890",
    email: "james@hsp.co.zw",
    bio: "James is a qualified and experienced professional with over 20 years operational, tactical and strategic experience across Business Processes, and Industry sectors, as well as Consultancy. Has vast experience in Press and Public relations and managing corporate affairs. James has held project leadership roles, across manufacturing insurance and FMCG sectors. His experience has a successful track record of executive client service engagement and management. He has sound strategic and functional expertise and versatile professional background.",
    achievements: [
      "Investment Specialist 2023",
      "ROI Maximizer Award",
      "Trusted Advisor",
    ],
    areas: ["Eastlea", "Southerton", "Belvedere", "Greendale"],
    social: {
      linkedin: "#",
      facebook: "#",
      twitter: "#",
    },
  },
  {
    id: 5,
    name: "Tanaka Maforimbo",
    title: "Head of Property Management Department",
    specialization: "New Developments",
    experience: "5+ Years",
    image: "tanaka.jpeg",
    rating: 4.8,
    reviews: 76,
    propertiesSold: 67,
    languages: ["English", "Ndebele", "Shona"],
    phone: "+263 77 567 8901",
    email: "tanaka@hsp.co.zw",
    bio: "Tanaka, Head of Rentals and Letting at HSP, brings five years of dedicated experience in the real estate sector to his role. Holding a BSc with Honours in Real Estate Management from the University of Zimbabwe, Tanaka specializes in rentals and property management. His passion for the industry is evident in his commitment to providing exceptional client care. Tanaka’s strong communication and customer service skills allow him to connect with clients in a clear and concise manner, ensuring their needs are understood and met. He leverages his organizational talents and market expertise to guide clients through the complexities of the housing market, helping them make informed decisions that align with their needs and goals. Passionate about elevating the real estate industry, Tanaka is committed to going above and beyond for his clients. By providing personalized attention and tailored solutions, he consistently exceeds their expectations and helps them achieve their real estate aspirations.",
    achievements: [
      "New Development Expert",
      "Future Vision Award",
      "Innovation Leader",
    ],
    areas: ["Norton", "Ruwa", "Chitungwiza", "Epworth"],
    social: {
      linkedin: "#",
      facebook: "#",
      twitter: "#",
    },
  },
  {
    id: 6,
    name: "Sarah Mugweni",
    title: "Administrator",
    specialization: "Administration",
    experience: "7+ Years",
    image: "sarah.jpeg",
    rating: 4.9,
    reviews: 103,
    propertiesSold: 45,
    languages: ["English", "Shona", "Ndebele"],
    phone: "+263 77 678 9012",
    email: "info@hsp.co.zw",
    bio: "Sarah is an invaluable member of the HSP team as the office Administrator. Her strong organizational skills and meticulous attention to detail ensure the smooth and efficient operation of the office on a daily basis. She manages a variety of tasks, including scheduling and supporting real estate agents, maintaining client records, and coordinating marketing campaigns. Sarah’s friendly and multitasking nature allows her to excel in meeting the needs of both the real estate agents and clients. Her dedication to providing top-notch service has contributed significantly to HSP’s success and growth. She has a rich background in office administration and customer service, having worked in the tertiary and real estate sectors.",
    achievements: [
      "Property Manager of the Year",
      "Client Satisfaction Award",
      "Operational Excellence",
    ],
    areas: ["Harare Central", "Waterfalls", "Glen View", "Budiriro"],
    social: {
      linkedin: "#",
      facebook: "#",
      twitter: "#",
    },
  },
  {
    id: 7,
    name: "Prince Sanidoka",
    title: "Sales Negotiator",
    specialization: "Negotiation",
    experience: "7+ Years",
    image: "PRINCE.jpeg",
    rating: 4.9,
    reviews: 103,
    propertiesSold: 45,
    languages: ["English", "Shona", "Ndebele"],
    phone: "+263 77 678 9012",
    email: "prince@hsp.co.zw",
    bio: "Prince is a dedicated and results-driven sales consultant at HSP, bringing three years of experience in real estate and a passion for driving sales growth. Prince honed his skills in the industry, developing a keen understanding of the market and a talent for negotiation. With his enthusiasm and expertise, he aims to leverage his knowledge to deliver exceptional sales performance for HSP, consistently exceeding targets and contributing to the company’s success.",
    achievements: [
      "Property Manager of the Year",
      "Client Satisfaction Award",
      "Operational Excellence",
    ],
    areas: ["Harare Central", "Waterfalls", "Glen View", "Budiriro"],
    social: {
      linkedin: "#",
      facebook: "#",
      twitter: "#",
    },
  },
  {
    id: 8,
    name: "Tatenda Dzumbunu",
    title: "Sales Negotiator",
    specialization: "Negotiation",
    experience: "7+ Years",
    image: "Tatenda.jpeg",
    rating: 4.9,
    reviews: 103,
    propertiesSold: 45,
    languages: ["English", "Shona", "Ndebele"],
    phone: "+263 77 678 9012",
    email: "tatenda@hsp.co.zw",
    bio: "Tatenda is a seasoned real estate expert with a passion for staying ahead of the curve in domestic and regional property markets. With a diverse background in residential, commercial, and industrial real estate, as well as property development, Tatenda has developed a unique understanding of the industry. He currently focuses on the Harare North market, where he leverages his expertise to deliver exceptional results.",
    achievements: [
      "Property Manager of the Year",
      "Client Satisfaction Award",
      "Operational Excellence",
    ],
    areas: ["Harare Central", "Waterfalls", "Glen View", "Budiriro"],
    social: {
      linkedin: "#",
      facebook: "#",
      twitter: "#",
    },
  },
  {
    id: 8,
    name: "Leeroy Mangwiro",
    title: "Letting",
    specialization: "Letting",
    experience: "7+ Years",
    image: "leroy.jpeg",
    rating: 4.9,
    reviews: 103,
    propertiesSold: 45,
    languages: ["English", "Shona", "Ndebele"],
    phone: "+263 77 678 9012",
    email: "tatenda@hsp.co.zw",
    bio: "Tatenda is a seasoned real estate expert with a passion for staying ahead of the curve in domestic and regional property markets. With a diverse background in residential, commercial, and industrial real estate, as well as property development, Tatenda has developed a unique understanding of the industry. He currently focuses on the Harare North market, where he leverages his expertise to deliver exceptional results.",
    achievements: [
      "Property Manager of the Year",
      "Client Satisfaction Award",
      "Operational Excellence",
    ],
    areas: ["Harare Central", "Waterfalls", "Glen View", "Budiriro"],
    social: {
      linkedin: "#",
      facebook: "#",
      twitter: "#",
    },
  },
  {
    id: 8,
    name: "Tatenda Dzumbunu",
    title: "Sales Negotiator",
    specialization: "Negotiation",
    experience: "7+ Years",
    image: "Tatenda.jpeg",
    rating: 4.9,
    reviews: 103,
    propertiesSold: 45,
    languages: ["English", "Shona", "Ndebele"],
    phone: "+263 77 678 9012",
    email: "tatenda@hsp.co.zw",
    bio: "Tatenda is a seasoned real estate expert with a passion for staying ahead of the curve in domestic and regional property markets. With a diverse background in residential, commercial, and industrial real estate, as well as property development, Tatenda has developed a unique understanding of the industry. He currently focuses on the Harare North market, where he leverages his expertise to deliver exceptional results.",
    achievements: [
      "Property Manager of the Year",
      "Client Satisfaction Award",
      "Operational Excellence",
    ],
    areas: ["Harare Central", "Waterfalls", "Glen View", "Budiriro"],
    social: {
      linkedin: "#",
      facebook: "#",
      twitter: "#",
    },
  },
  {
    id: 7,
    name: "Winnifilda Shadaya",
    title: "Sales Negotiator",
    specialization: "Negotiation",
    experience: "7+ Years",
    image: "winnie.jpeg",
    rating: 4.9,
    reviews: 103,
    propertiesSold: 45,
    languages: ["English", "Shona", "Ndebele"],
    phone: "+263 77 678 9012",
    email: "winnie@hsp.co.zw",
    bio: "Winnifilda is an accomplished real estate sales CONSULTANT with over 14 years of experience in the Zimbabwean and South African markets. Known for her exceptional negotiation skills and in-depth market knowledge, Winnifilda has facilitated numerous successful transactions across residential, commercial, and industrial properties. Based in Harare, she has built an extensive network of clients and industry contacts throughout the region, enabling her to consistently deliver optimal outcomes for buyers and sellers alike. Winnifilda’s unwavering commitment to professional development and her ability to navigate complex market conditions have solidified her reputation as a trusted advisor in the field of real estate.",
    achievements: [
      "Property Manager of the Year",
      "Client Satisfaction Award",
      "Operational Excellence",
    ],
    areas: ["Harare Central", "Waterfalls", "Glen View", "Budiriro"],
    social: {
      linkedin: "#",
      facebook: "#",
      twitter: "#",
    },
  },
  {
    id: 7,
    name: "Chomu Sithole",
    title: "Sales Negotiator",
    specialization: "Negotiation",
    experience: "7+ Years",
    image: "chomu.jpeg",
    rating: 4.9,
    reviews: 103,
    propertiesSold: 45,
    languages: ["English", "Shona", "Ndebele"],
    phone: "+263 77 678 9012",
    email: "chomu@hsp.co.zw",
    bio: "Chomu Sithole is a mature and dynamic professional with over 25 years of experience in the interior design industry and 3 years in the real estate sector. She has a keen eye for spotting hidden gems and can help transform a “diamond in the rough” into a stunning showcase. Chomu is prepared to assist you with all your property needs, whether you are looking to buy, sell, or rent. No matter the size or scope of the property, she is eager to connect you with your dream home or investment. Chomu’s expertise and dedication make her an invaluable resource in the property market. She is excited to put her skills and experience to work for you, ensuring a smooth and successful real estate transaction.",
    achievements: [
      "Property Manager of the Year",
      "Client Satisfaction Award",
      "Operational Excellence",
    ],
    areas: ["Harare Central", "Waterfalls", "Glen View", "Budiriro"],
    social: {
      linkedin: "#",
      facebook: "#",
      twitter: "#",
    },
  },
  {
    id: 7,
    name: "Heather Mushori",
    title: "Sales Negotiator",
    specialization: "Negotiation",
    experience: "7+ Years",
    image: "heather.jpeg",
    rating: 4.9,
    reviews: 103,
    propertiesSold: 45,
    languages: ["English", "Shona", "Ndebele"],
    phone: "+263 77 678 9012",
    email: "heather@hsp.co.zw",
    bio: "Heather is not only an estate agent but also a dedicated professional who goes above and beyond to serve her clients. She combines her international business acumen, client-centric approach, negotiation skills, strong network, and market expertise to excel in the real estate industry. Whether you’re a first-time homebuyer or a seasoned investor, Heather is the agent you can trust to guide you through the process with confidence.",
    achievements: [
      "Property Manager of the Year",
      "Client Satisfaction Award",
      "Operational Excellence",
    ],
    areas: ["Harare Central", "Waterfalls", "Glen View", "Budiriro"],
    social: {
      linkedin: "#",
      facebook: "#",
      twitter: "#",
    },
  },
          {
    id: 7,
    name: "Emily Matsika",
    title: "Sales Negotiator",
    specialization: "Sales",
    experience: "7+ Years",
    image: "emily.jpeg",
    rating: 4.9,
    reviews: 103,
    propertiesSold: 45,
    languages: ["English", "Shona", "Ndebele"],
    phone: "+263 77 678 9012",
    email: "emily@hsp.co.zw",
    bio: "Emily is a dedicated real estate agent specialising in sales. She brings a unique blend of passion for real estate and a robust background in marketing to the table. Her expertise lie in the vibrant Harare West market, where she focuses on matching clients with properties that perfectly suit their needs. With a personalised approach, she strives to ensure every client finds their ideal home or investment, making the buying process as smooth and rewarding as possible. Let her help you navigate the Harare West real estate market with confidence and ease.",
    achievements: [
      "Property Manager of the Year",
      "Client Satisfaction Award",
      "Operational Excellence"
    ],
    areas: ["Harare Central", "Waterfalls", "Glen View", "Budiriro"],
    social: {
      linkedin: "#",
      facebook: "#",
      twitter: "#"
    }
  },
          {
    id: 7,
    name: "Arthur Tumbwe",
    title: "Executive Personal Assistant",
    specialization: "Administration",
    experience: "7+ Years",
    image: "arthur.jpeg",
    rating: 4.9,
    reviews: 103,
    propertiesSold: 45,
    languages: ["English", "Shona", "Ndebele"],
    phone: "+263 77 678 9012",
    email: "arthur@hsp.co.zw",
    bio: "Arthur is not only an estate agent but also a dedicated professional who goes above and beyond to serve her clients. She combines her international business acumen, client-centric approach, negotiation skills, strong network, and market expertise to excel in the real estate industry. Whether you’re a first-time homebuyer or a seasoned investor, Heather is the agent you can trust to guide you through the process with confidence.",
    achievements: [
      "Property Manager of the Year",
      "Client Satisfaction Award",
      "Operational Excellence"
    ],
    areas: ["Harare Central", "Waterfalls", "Glen View", "Budiriro"],
    social: {
      linkedin: "#",
      facebook: "#",
      twitter: "#"
    }
  },
];

const specializations = [
  "All",
  "Luxury Properties",
  "Commercial Real Estate",
  "Family Homes",
  "Investment Properties",
  "New Developments",
  "Property Management",
];

const AgentsPage = () => {
  const [selectedSpecialization, setSelectedSpecialization] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredAgents = agents.filter((agent) => {
    const matchesSpecialization =
      selectedSpecialization === "All" ||
      agent.specialization === selectedSpecialization;
    const matchesSearch =
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.areas.some((area) =>
        area.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesSpecialization && matchesSearch;
  });

  const handleContactAgent = (agent) => {
    console.log("Contacting agent:", agent.name);
  };

  const handleCallAgent = (phone) => {
    window.open(`tel:${phone}`, "_self");
  };

  const handleEmailAgent = (email) => {
    window.open(`mailto:${email}`, "_self");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-400/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-yellow-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 bg-yellow-400/20 rounded-full mb-6 backdrop-blur-sm border border-yellow-400/30"
            >
              <Sparkles className="w-5 h-5 text-yellow-400 mr-2" />
              <span className="text-yellow-100 font-medium">Meet Our Team</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-white"
            >
              Our Expert{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                Agents
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-8"
            >
              Meet the dedicated professionals who make your real estate dreams
              come true. Our experienced team is here to guide you through every
              step of your property journey.
            </motion.p>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 max-w-4xl mx-auto"
            >
              {[
                { number: "20+", label: "Expert Agents" },
                { number: "1000+", label: "Properties Sold" },
                { number: "4.8", label: "Average Rating" },
                { number: "95%", label: "Client Satisfaction" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-yellow-400 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full lg:max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search agents, specializations, or areas..."
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter Toggle - Mobile */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center px-4 py-3 bg-slate-800 text-white rounded-xl"
            >
              <Filter className="w-5 h-5 mr-2" />
              Filters
              <ChevronDown
                className={`w-4 h-4 ml-2 transition-transform ${
                  showFilters ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Specialization Filter - Desktop */}
            <div className="hidden lg:flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">
                Filter by:
              </span>
              <select
                value={selectedSpecialization}
                onChange={(e) => setSelectedSpecialization(e.target.value)}
                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none bg-white"
              >
                {specializations.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="lg:hidden mt-4 p-4 bg-white rounded-xl border"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specialization
                </label>
                <select
                  value={selectedSpecialization}
                  onChange={(e) => setSelectedSpecialization(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none bg-white"
                >
                  {specializations.map((spec) => (
                    <option key={spec} value={spec}>
                      {spec}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Agents Grid */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredAgents.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No agents found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search criteria
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredAgents.map((agent, i) => (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group transform hover:-translate-y-2"
                >
                  {/* Agent Photo */}
                  <div className="relative h-64 sm:h-72 overflow-hidden">
                    <img
                      src={agent.image}
                      alt={agent.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Rating Badge */}
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                      <span className="text-sm font-semibold">
                        {agent.rating}
                      </span>
                    </div>

                    {/* Experience Badge */}
                    <div className="absolute top-4 right-4 bg-yellow-400 text-slate-900 rounded-full px-3 py-1">
                      <span className="text-sm font-bold">
                        {agent.experience}
                      </span>
                    </div>

                    {/* Quick Contact - Mobile Optimized */}
                    <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => handleCallAgent(agent.phone)}
                        className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors touch-manipulation"
                      >
                        <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </button>
                      <button
                        onClick={() => handleEmailAgent(agent.email)}
                        className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors touch-manipulation"
                      >
                        <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </button>
                    </div>
                  </div>

                  {/* Agent Info */}
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-1 group-hover:text-yellow-600 transition-colors">
                        {agent.name}
                      </h3>
                      <p className="text-yellow-600 font-semibold mb-1">
                        {agent.title}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {agent.specialization}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 rounded-xl">
                      <div className="text-center">
                        <div className="text-lg sm:text-xl font-bold text-slate-800">
                          {agent.propertiesSold}
                        </div>
                        <div className="text-xs text-gray-600">
                          Properties Sold
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg sm:text-xl font-bold text-slate-800">
                          {agent.reviews}
                        </div>
                        <div className="text-xs text-gray-600">Reviews</div>
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {agent.bio}
                    </p>

                    {/* Languages */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {agent.languages.map((lang, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                          >
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-slate-700 mb-2">
                        Recent Achievements
                      </h4>
                      <div className="space-y-1">
                        {agent.achievements
                          .slice(0, 2)
                          .map((achievement, idx) => (
                            <div
                              key={idx}
                              className="flex items-center text-xs text-gray-600"
                            >
                              <Award className="w-3 h-3 text-yellow-500 mr-2 flex-shrink-0" />
                              {achievement}
                            </div>
                          ))}
                      </div>
                    </div>

                    {/* Areas Served */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-slate-700 mb-2">
                        Areas Served
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {agent.areas.slice(0, 3).map((area, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs"
                          >
                            {area}
                          </span>
                        ))}
                        {agent.areas.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                            +{agent.areas.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Contact Buttons - Mobile Optimized */}
                    <div className="space-y-3">
                      <motion.button
                        onClick={() => handleContactAgent(agent)}
                        className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 text-slate-900 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 min-h-[48px] touch-manipulation"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <MessageCircle className="w-5 h-5 mr-2 inline" />
                        Contact Agent
                      </motion.button>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => handleCallAgent(agent.phone)}
                          className="flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium min-h-[44px] touch-manipulation"
                        >
                          <Phone className="w-4 h-4 mr-1" />
                          Call
                        </button>
                        <button
                          onClick={() => handleEmailAgent(agent.email)}
                          className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium min-h-[44px] touch-manipulation"
                        >
                          <Mail className="w-4 h-4 mr-1" />
                          Email
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Load More Button */}
          {filteredAgents.length > 0 && (
            <div className="text-center mt-12">
              <motion.button
                className="px-8 py-4 bg-slate-800 text-white rounded-xl font-semibold hover:bg-yellow-500 hover:text-slate-900 transition-all duration-300 transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Load More Agents
              </motion.button>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Our Agents Section */}
      <section className="py-16 sm:py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Why Choose Our <span className="text-yellow-400">Agents</span>
            </h2>
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6" />
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Our agents are more than just salespeople – they're your trusted
              advisors and advocates
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "Licensed & Certified",
                description:
                  "All our agents are fully licensed and continuously trained",
              },
              {
                icon: Target,
                title: "Market Experts",
                description:
                  "Deep knowledge of local markets and property values",
              },
              {
                icon: Clock,
                title: "24/7 Availability",
                description: "Always available when you need us most",
              },
              {
                icon: CheckCircle,
                title: "Proven Results",
                description:
                  "Track record of successful transactions and satisfied clients",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-slate-900" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-yellow-600 to-yellow-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Ready to Work with Our Expert Team?
            </h2>
            <p className="text-lg text-slate-800 mb-8 opacity-90">
              Contact us today and let our experienced agents help you find your
              perfect property
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="px-8 py-4 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors transform hover:scale-105 min-h-[48px] touch-manipulation"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="w-5 h-5 mr-2 inline" />
                Call Us Now
              </motion.button>
              <motion.button
                className="px-8 py-4 bg-white text-slate-900 rounded-xl font-semibold hover:bg-gray-100 transition-colors transform hover:scale-105 min-h-[48px] touch-manipulation"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-5 h-5 mr-2 inline" />
                Send Message
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AgentsPage;
