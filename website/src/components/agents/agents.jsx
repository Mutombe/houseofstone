// src/components/agents/agents.jsx
import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  Star,
  Award,
  TrendingUp,
  Home,
  Users,
  MapPin,
  Calendar,
  CheckCircle,
  Search,
  Linkedin,
  Facebook,
  Twitter,
  X,
  Sparkles,
  Shield,
  Clock,
  Target,
  ArrowRight,
  MessageCircle,
  ChevronDown,
  Building,
  Briefcase,
  Languages,
  Quote,
  Filter,
} from "lucide-react";
import { SiFsecure } from "react-icons/si";
import { LiaAwardSolid } from "react-icons/lia";
import { FaRegCircleUser } from "react-icons/fa6";
import { MdStarPurple500 } from "react-icons/md";
import { FaXTwitter } from "react-icons/fa6";


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

// Grid Pattern Background
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

// Animated Counter Component
const AnimatedCounter = ({ end, suffix = "", duration = 2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  React.useEffect(() => {
    if (isInView) {
      let startTime;
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

// Agent data
const agents = [
  {
    id: 1,
    name: "Leonita Mhishi",
    title: "Principal Registered Estate Agent",
    specialization: "Luxury Properties",
    experience: "8+ Years",
    image: "leo.jpeg",
    rating: 4.9,
    reviews: 127,
    propertiesSold: 156,
    languages: ["English", "French"],
    phone: "+263 77 123 4567",
    email: "leonita@hsp.co.zw",
    bio: "Leonita is the founder of House of Stone Properties, one of the top real estate agencies in the country. She has worked for various organizations holding key positions in Zimbabwe, Australia, China and various other countries. Experienced Property Consultant with a demonstrated history of working in the Real Estate industry for over 15 years.",
    achievements: ["Top Agent 2023", "Million Dollar Club", "Customer Choice Award"],
    areas: ["Borrowdale", "Highlands", "Mount Pleasant", "Avondale"],
    featured: true,
  },
  {
    id: 2,
    name: "Nairgel Masiiwa",
    title: "Head of Sales Department",
    specialization: "Sales",
    experience: "12+ Years",
    image: "/ngl.jpeg",
    rating: 4.8,
    reviews: 94,
    propertiesSold: 89,
    languages: ["English", "Shona", "Ndebele"],
    phone: "+263 77 234 5678",
    email: "nairgel@hsp.co.zw",
    bio: "Nairgel Masiiwa is a seasoned sales professional and current Head of Sales at House of Stone Properties. With a proven track record of driving revenue growth and building high-performing sales teams, Nairgel brings a wealth of expertise including construction and architecture.",
    achievements: ["Commercial Expert 2023", "Investment Advisor Award", "Top Revenue Generator"],
    areas: ["CBD", "Msasa", "Workington", "Graniteside"],
    featured: true,
  },
  {
    id: 3,
    name: "Winnifilda Shadaya",
    title: "Head of Rentals Department",
    specialization: "Negotiation",
    experience: "7+ Years",
    image: "winnie.jpeg",
    rating: 4.9,
    reviews: 103,
    propertiesSold: 45,
    languages: ["English", "Shona", "Ndebele"],
    phone: "+263 77 678 9012",
    email: "winnie@hsp.co.zw",
    bio: "Winnifilda is an accomplished real estate sales consultant with over 14 years of experience in the Zimbabwean and South African markets. Known for her exceptional negotiation skills and in-depth market knowledge.",
    achievements: ["Property Manager of the Year", "Client Satisfaction Award", "Operational Excellence"],
    areas: ["Harare Central", "Waterfalls", "Glen View", "Budiriro"],
    featured: true,
  },
  {
    id: 4,
    name: "James Mudzikitiri",
    title: "Marketing & Media Executive",
    specialization: "Media & Marketing",
    experience: "10+ Years",
    image: "james.jpeg",
    rating: 4.7,
    reviews: 88,
    propertiesSold: 98,
    languages: ["English", "Shona"],
    phone: "+263 77 456 7890",
    email: "james@hsp.co.zw",
    bio: "James is a qualified and experienced professional with over 20 years operational, tactical and strategic experience across Business Processes and Industry sectors, as well as Consultancy.",
    achievements: ["Investment Specialist 2023", "ROI Maximizer Award", "Trusted Advisor"],
    areas: ["Eastlea", "Southerton", "Belvedere", "Greendale"],
  },
  {
    id: 5,
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
    bio: "Arthur is a dedicated professional who goes above and beyond to serve his clients. He combines international business acumen, client-centric approach, negotiation skills, and market expertise to excel.",
    achievements: ["Property Manager of the Year", "Client Satisfaction Award", "Operational Excellence"],
    areas: ["Harare Central", "Waterfalls", "Glen View", "Budiriro"],
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
    bio: "Sarah is an invaluable member of the HSP team as the office Administrator. Her strong organizational skills and meticulous attention to detail ensure the smooth and efficient operation of the office.",
    achievements: ["Property Manager of the Year", "Client Satisfaction Award", "Operational Excellence"],
    areas: ["Harare Central", "Waterfalls", "Glen View", "Budiriro"],
  },
  {
    id: 7,
    name: "Tsitsi Mashingaidze",
    title: "Senior Sales Consultant",
    specialization: "Sales",
    experience: "6+ Years",
    image: "tsitsi.jpeg",
    rating: 4.9,
    reviews: 112,
    propertiesSold: 134,
    languages: ["English", "Shona"],
    phone: "+263 77 345 6789",
    email: "tsitsi@hsp.co.zw",
    bio: "Tsitsi is an Accountant by profession with more than 3 decades of finance, administration and sales experience. She is skilled at developing the right action plan for each client's unique needs.",
    achievements: ["Family Choice Award", "Rising Star 2022", "Community Champion"],
    areas: ["Warren Park", "Hatfield", "Marlborough", "Newlands"],
  },
  {
    id: 8,
    name: "Chomu Sithole",
    title: "Senior Sales Consultant",
    specialization: "Negotiation",
    experience: "7+ Years",
    image: "chomu.jpeg",
    rating: 4.9,
    reviews: 103,
    propertiesSold: 45,
    languages: ["English", "Shona", "Ndebele"],
    phone: "+263 77 678 9012",
    email: "chomu@hsp.co.zw",
    bio: "Chomu Sithole is a mature and dynamic professional with over 25 years of experience in the interior design industry and 3 years in the real estate sector. She has a keen eye for spotting hidden gems.",
    achievements: ["Property Manager of the Year", "Client Satisfaction Award", "Operational Excellence"],
    areas: ["Harare Central", "Waterfalls", "Glen View", "Budiriro"],
  },
  {
    id: 9,
    name: "Emily Matsika",
    title: "Senior Sales Consultant",
    specialization: "Sales",
    experience: "7+ Years",
    image: "emily.jpeg",
    rating: 4.9,
    reviews: 103,
    propertiesSold: 45,
    languages: ["English", "Shona", "Ndebele"],
    phone: "+263 77 678 9012",
    email: "emily@hsp.co.zw",
    bio: "Emily is a dedicated real estate agent specialising in sales. She brings a unique blend of passion for real estate and a robust background in marketing to the table.",
    achievements: ["Property Manager of the Year", "Client Satisfaction Award", "Operational Excellence"],
    areas: ["Harare Central", "Waterfalls", "Glen View", "Budiriro"],
  },
  {
    id: 10,
    name: "Tanaka Maforimbo",
    title: "Letting Agent",
    specialization: "Rentals & Letting",
    experience: "5+ Years",
    image: "tanaka.jpeg",
    rating: 4.8,
    reviews: 76,
    propertiesSold: 67,
    languages: ["English", "Ndebele", "Shona"],
    phone: "+263 77 567 8901",
    email: "tanaka@hsp.co.zw",
    bio: "Tanaka, Head of Rentals and Letting at HSP, brings five years of dedicated experience in the real estate sector. He specializes in rentals and property management.",
    achievements: ["New Development Expert", "Future Vision Award", "Innovation Leader"],
    areas: ["Norton", "Ruwa", "Chitungwiza", "Epworth"],
  },
  {
    id: 11,
    name: "Prince Sanidoka",
    title: "Sales Negotiator",
    specialization: "Negotiation",
    experience: "7+ Years",
    image: "prnc.jpeg",
    rating: 4.9,
    reviews: 103,
    propertiesSold: 45,
    languages: ["English", "Shona", "Ndebele"],
    phone: "+263 77 678 9012",
    email: "prince@hsp.co.zw",
    bio: "Prince is a dedicated and results-driven sales consultant bringing three years of experience in real estate and a passion for driving sales growth.",
    achievements: ["Property Manager of the Year", "Client Satisfaction Award", "Operational Excellence"],
    areas: ["Harare Central", "Waterfalls", "Glen View", "Budiriro"],
  },
  {
    id: 12,
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
    bio: "Heather is a dedicated professional who goes above and beyond to serve her clients. She combines international business acumen and negotiation skills to excel in real estate.",
    achievements: ["Property Manager of the Year", "Client Satisfaction Award", "Operational Excellence"],
    areas: ["Harare Central", "Waterfalls", "Glen View", "Budiriro"],
  },
  {
    id: 13,
    name: "Michael Madanha",
    title: "Sales Negotiator",
    specialization: "Negotiation",
    experience: "7+ Years",
    image: "mic.jpeg",
    rating: 4.9,
    reviews: 103,
    propertiesSold: 45,
    languages: ["English", "Shona", "Ndebele"],
    phone: "+263 77 678 9012",
    email: "michael@hsp.co.zw",
    bio: "Michael is a hardworking Sales Negotiator with dedication to helping clients find their perfect properties.",
    achievements: ["Property Manager of the Year", "Client Satisfaction Award", "Operational Excellence"],
    areas: ["Harare Central", "Waterfalls", "Glen View", "Budiriro"],
  },
  {
    id: 14,
    name: "Tatenda Dzumbunu",
    title: "Sales Negotiator",
    specialization: "Negotiation",
    experience: "7+ Years",
    image: "Tatenda.jpeg",
    rating: 4.9,
    reviews: 0,
    propertiesSold: 0,
    languages: ["Shona"],
    phone: "+263 784 532 812",
    email: "tatenda@hsp.co.zw",
    bio: "Tatenda is a hardworking Sales Negotiator passionate about real estate.",
    achievements: ["Rising Star", "Client Satisfaction Award"],
    areas: ["Harare Central", "Waterfalls", "Glen View", "Budiriro"],
  },
  {
    id: 15,
    name: "Lloyd Chitsowe",
    title: "Maintenance Supervisor",
    specialization: "Maintenance",
    experience: "7+ Years",
    image: "caretaker.jpeg",
    rating: 4.9,
    reviews: 0,
    propertiesSold: 0,
    languages: ["Shona"],
    phone: "N/A",
    email: "N/A",
    bio: "Lloyd is a hardworking Maintenance Supervisor ensuring all properties are well maintained.",
    achievements: ["Operational Excellence"],
    areas: ["Harare Central"],
  },
];

const specializations = [
  "All",
  "Luxury Properties",
  "Sales",
  "Negotiation",
  "Rentals & Letting",
  "Administration",
  "Media & Marketing",
  "Maintenance",
];

// Featured Agent Card Component
const FeaturedAgentCard = ({ agent, onClick }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="group relative cursor-pointer"
      onClick={() => onClick(agent)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#C9A962]/20 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative bg-[#0A1628] border border-white/10 rounded-3xl overflow-hidden hover:border-[#C9A962]/30 transition-all duration-500">
        {/* Image */}
        <div className="relative h-80 overflow-hidden">
          <img
            src={agent.image}
            alt={agent.name}
            className="w-full h-full object-cover object-top transform group-hover:scale-110 transition-transform duration-700"
            style={{ objectPosition: "center 20%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-transparent to-transparent" />

          {/* Featured Badge */}
          <div className="absolute top-4 left-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-[#C9A962] to-[#B8985A] rounded-full">
              <MdStarPurple500 className="w-4 h-4 text-[#0A1628] fill-current" />
              <span className="text-[#0A1628] font-semibold text-sm">Featured</span>
            </div>
          </div>

          {/* Quick Stats Overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex justify-between">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-xl rounded-full">
              <Building className="w-4 h-4 text-[#C9A962]" />
              <span className="text-white text-sm font-medium">{agent.propertiesSold} Sold</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-xl rounded-full">
              <MdStarPurple500 className="w-4 h-4 text-[#C9A962] fill-current" />
              <span className="text-white text-sm font-medium">{agent.rating}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#C9A962] transition-colors">
            {agent.name}
          </h3>
          <p className="text-[#C9A962] font-medium text-sm mb-2">{agent.title}</p>
          <p className="text-gray-400 text-sm mb-4">{agent.specialization}</p>

          {/* Languages */}
          <div className="flex flex-wrap gap-2 mb-4">
            {agent.languages.slice(0, 3).map((lang, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-white/5 border border-white/10 rounded-full text-gray-400 text-xs"
              >
                {lang}
              </span>
            ))}
          </div>

          {/* Contact Buttons */}
          <div className="flex gap-2">
            <a
              href={`tel:${agent.phone}`}
              onClick={(e) => e.stopPropagation()}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-[#C9A962] hover:border-[#C9A962] hover:text-[#0A1628] transition-all"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm font-medium">Call</span>
            </a>
            <a
              href={`mailto:${agent.email}`}
              onClick={(e) => e.stopPropagation()}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-[#C9A962] to-[#B8985A] rounded-xl text-[#0A1628] font-medium text-sm hover:shadow-lg hover:shadow-[#C9A962]/20 transition-all"
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Regular Agent Card Component
const AgentCard = ({ agent, index, onClick }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative cursor-pointer"
      onClick={() => onClick(agent)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#C9A962]/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-[#C9A962]/30 transition-all duration-500 h-full">
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={agent.image}
            alt={agent.name}
            className="w-full h-full object-cover object-top transform group-hover:scale-110 transition-transform duration-700"
            style={{ objectPosition: "center 20%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-transparent to-transparent" />

          {/* Rating Badge */}
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-white/10 backdrop-blur-xl rounded-full">
            <MdStarPurple500 className="w-3 h-3 text-[#C9A962] fill-current" />
            <span className="text-white text-xs font-medium">{agent.rating}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#C9A962] transition-colors">
            {agent.name}
          </h3>
          <p className="text-[#C9A962] font-medium text-sm mb-2">{agent.title}</p>

          {/* Stats Row */}
          <div className="flex items-center gap-4 text-gray-400 text-xs mb-4">
            <div className="flex items-center gap-1">
              <Building className="w-3 h-3" />
              <span>{agent.propertiesSold} sold</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-3 h-3" />
              <span>{agent.reviews} reviews</span>
            </div>
          </div>

          {/* View Profile Button */}
          <button className="w-full py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm font-medium group-hover:bg-[#C9A962] group-hover:border-[#C9A962] group-hover:text-[#0A1628] transition-all flex items-center justify-center gap-2">
            View Profile
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Agent Detail Modal Component
const AgentDetailModal = ({ agent, isOpen, onClose }) => {
  if (!isOpen || !agent) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-[#0A1628]/90 backdrop-blur-xl" />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto bg-gradient-to-br from-[#0A1628] to-[#060D16] border border-white/10 rounded-2xl sm:rounded-3xl mx-2 sm:mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid md:grid-cols-2 gap-0">
            {/* Image Section */}
            <div className="relative h-80 md:h-full md:min-h-[600px]">
              <img
                src={agent.image}
                alt={agent.name}
                className="w-full h-full object-cover"
                style={{ objectPosition: "center 20%" }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0A1628]/80 hidden md:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] to-transparent md:hidden" />

              {/* Social Links - Mobile */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-3 md:hidden">
                <a
                  href="#"
                  className="w-10 h-10 bg-blue-600/80 backdrop-blur-xl rounded-full flex items-center justify-center"
                >
                  <Linkedin className="w-5 h-5 text-white" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-blue-500/80 backdrop-blur-xl rounded-full flex items-center justify-center"
                >
                  <Facebook className="w-5 h-5 text-white" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-sky-500/80 backdrop-blur-xl rounded-full flex items-center justify-center"
                >
                  <FaXTwitter className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-5 sm:p-8 md:p-10">
              {/* Header */}
              <div className="mb-4 sm:mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1 px-2 py-1 bg-[#C9A962]/10 rounded-full">
                    <MdStarPurple500 className="w-4 h-4 text-[#C9A962] fill-current" />
                    <span className="text-[#C9A962] text-sm font-medium">{agent.rating}</span>
                  </div>
                  <span className="text-gray-400 text-sm">{agent.reviews} reviews</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1">{agent.name}</h2>
                <p className="text-[#C9A962] font-medium text-sm sm:text-base">{agent.title}</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
                <div className="bg-white/5 border border-white/10 rounded-lg sm:rounded-xl p-2 sm:p-4 text-center">
                  <div className="text-lg sm:text-2xl font-bold text-white mb-0.5 sm:mb-1">{agent.propertiesSold}</div>
                  <div className="text-gray-400 text-[10px] sm:text-xs">Properties Sold</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg sm:rounded-xl p-2 sm:p-4 text-center">
                  <div className="text-lg sm:text-2xl font-bold text-white mb-0.5 sm:mb-1">{agent.experience}</div>
                  <div className="text-gray-400 text-[10px] sm:text-xs">Experience</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg sm:rounded-xl p-2 sm:p-4 text-center">
                  <div className="text-lg sm:text-2xl font-bold text-white mb-0.5 sm:mb-1">{agent.reviews}</div>
                  <div className="text-gray-400 text-[10px] sm:text-xs">Reviews</div>
                </div>
              </div>

              {/* Bio */}
              <div className="mb-6">
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <Quote className="w-4 h-4 text-[#C9A962]" />
                  About
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{agent.bio}</p>
              </div>

              {/* Languages */}
              <div className="mb-6">
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <Languages className="w-4 h-4 text-[#C9A962]" />
                  Languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {agent.languages.map((lang, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-gray-300 text-sm"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div className="mb-6">
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <LiaAwardSolid className="w-4 h-4 text-[#C9A962]" />
                  Achievements
                </h3>
                <div className="flex flex-wrap gap-2">
                  {agent.achievements.map((achievement, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-[#C9A962]/10 border border-[#C9A962]/20 rounded-full text-[#C9A962] text-sm"
                    >
                      {achievement}
                    </span>
                  ))}
                </div>
              </div>

              {/* Social Links - Desktop */}
              <div className="hidden md:flex gap-3 mb-6">
                <a
                  href="#"
                  className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  <Linkedin className="w-5 h-5 text-white" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  <Facebook className="w-5 h-5 text-white" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors"
                >
                  <FaXTwitter className="w-5 h-5 text-white" />
                </a>
              </div>

              {/* Contact Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`tel:${agent.phone}`}
                  className="flex items-center justify-center gap-2 py-4 bg-emerald-500 rounded-xl text-white font-semibold hover:bg-emerald-600 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>
                <a
                  href={`mailto:${agent.email}`}
                  className="flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-[#C9A962] to-[#B8985A] rounded-xl text-[#0A1628] font-semibold hover:shadow-lg hover:shadow-[#C9A962]/20 transition-all"
                >
                  <Mail className="w-5 h-5" />
                  Send Email
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Stat Card Component
const StatCard = ({ value, suffix, label, icon: Icon }) => (
  <div className="relative group">
    <div className="absolute inset-0 bg-gradient-to-br from-[#C9A962]/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center hover:border-[#C9A962]/30 transition-all">
      <Icon className="w-8 h-8 text-[#C9A962] mx-auto mb-3" />
      <div className="text-3xl md:text-4xl font-bold text-white mb-1">
        <AnimatedCounter end={value} suffix={suffix} />
      </div>
      <p className="text-gray-400 text-sm">{label}</p>
    </div>
  </div>
);

// Feature Card Component
const FeatureCard = ({ icon: Icon, title, description, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="text-center group"
    >
      <div className="w-16 h-16 bg-gradient-to-br from-[#C9A962] to-[#B8985A] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-8 h-8 text-[#0A1628]" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#C9A962] transition-colors">
        {title}
      </h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </motion.div>
  );
};

const AgentsPage = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [selectedAgent, setSelectedAgent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const featuredAgents = agents.filter((agent) => agent.featured);
  const regularAgents = agents.filter((agent) => !agent.featured);

  const filteredAgents = regularAgents.filter((agent) => {
    const matchesSpecialization =
      selectedSpecialization === "All" || agent.specialization === selectedSpecialization;
    const matchesSearch =
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSpecialization && matchesSearch;
  });

  const handleViewDetails = (agent) => {
    setSelectedAgent(agent);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAgent(null);
  };

  const features = [
    {
      icon: SiFsecure,
      title: "Licensed & Certified",
      description: "All our agents are fully licensed and continuously trained",
    },
    {
      icon: Target,
      title: "Market Experts",
      description: "Deep knowledge of local markets and property values",
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Always available when you need us most",
    },
    {
      icon: CheckCircle,
      title: "Proven Results",
      description: "Track record of successful transactions and satisfied clients",
    },
  ];

  return (
    <div className="min-h-screen bg-[#060D16] pb-24 lg:pb-0">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[60vh] sm:min-h-[70vh] overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628] via-[#0A1628] to-[#1a2a3a]" />
        </motion.div>

        <FloatingOrb className="w-[600px] h-[600px] bg-[#C9A962] -top-40 -right-40" />
        <FloatingOrb className="w-[400px] h-[400px] bg-blue-500 bottom-20 -left-20" delay={2} />
        <GridPattern />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 h-full flex items-center pt-32 pb-20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center px-4 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full mb-8"
              >
                <Sparkles className="w-4 h-4 text-[#C9A962] mr-2" />
                <span className="text-gray-300 text-sm">Meet Our Expert Team</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 leading-tight"
              >
                <span className="text-white">Our Professional</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A962] via-[#DCC471] to-[#C9A962]">
                  Real Estate Agents
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-xl text-gray-300 max-w-3xl mx-auto mb-8 sm:mb-12 px-2 sm:px-0"
              >
                Dedicated professionals who make your real estate dreams come true. Our experienced
                team guides you through every step of your property journey.
              </motion.p>

              {/* Stats Grid */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto"
              >
                <StatCard value={15} suffix="+" label="Expert Agents" icon={Users} />
                <StatCard value={1000} suffix="+" label="Properties Sold" icon={Building} />
                <StatCard value={4.8} suffix="" label="Average Rating" icon={Star} />
                <StatCard value={95} suffix="%" label="Client Satisfaction" icon={LiaAwardSolid} />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Featured Agents Section */}
      <section className="relative py-24 overflow-hidden">
        <FloatingOrb className="w-[500px] h-[500px] bg-purple-500 -top-40 -left-40" delay={1} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-[#C9A962]/10 text-[#C9A962] text-sm font-semibold rounded-full mb-6">
              Top Performers
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Featured <span className="text-[#C9A962]">Agents</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our top-performing agents with exceptional track records and client satisfaction
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {featuredAgents.map((agent) => (
              <FeaturedAgentCard key={agent.id} agent={agent} onClick={handleViewDetails} />
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="relative py-8 bg-[#0A1628]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full lg:max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search agents..."
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#C9A962] focus:ring-2 focus:ring-[#C9A962]/20 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter Toggle - Mobile */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center px-6 py-4 bg-white/5 border border-white/10 text-white rounded-xl"
            >
              <Filter className="w-5 h-5 mr-2" />
              Filters
              <ChevronDown
                className={`w-4 h-4 ml-2 transition-transform ${showFilters ? "rotate-180" : ""}`}
              />
            </button>

            {/* Filter - Desktop */}
            <div className="hidden lg:flex items-center gap-3">
              <span className="text-gray-400 text-sm">Filter:</span>
              <select
                value={selectedSpecialization}
                onChange={(e) => setSelectedSpecialization(e.target.value)}
                className="px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#C9A962] appearance-none cursor-pointer"
              >
                {specializations.map((spec) => (
                  <option key={spec} value={spec} className="bg-[#0A1628]">
                    {spec}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Mobile Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden mt-4"
              >
                <select
                  value={selectedSpecialization}
                  onChange={(e) => setSelectedSpecialization(e.target.value)}
                  className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#C9A962]"
                >
                  {specializations.map((spec) => (
                    <option key={spec} value={spec} className="bg-[#0A1628]">
                      {spec}
                    </option>
                  ))}
                </select>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* All Agents Section */}
      <section className="relative py-24 overflow-hidden">
        <GridPattern />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-[#C9A962]/10 text-[#C9A962] text-sm font-semibold rounded-full mb-6">
              Our Team
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              All <span className="text-[#C9A962]">Agents</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Browse our complete team of dedicated real estate professionals
            </p>
          </motion.div>

          {filteredAgents.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-12 h-12 text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No agents found</h3>
              <p className="text-gray-400">Try adjusting your search criteria</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAgents.map((agent, index) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  index={index}
                  onClick={handleViewDetails}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Our Agents Section */}
      <section className="relative py-24 bg-[#0A1628]">
        <FloatingOrb className="w-[400px] h-[400px] bg-[#C9A962] -bottom-20 -right-20" delay={0.5} />
        <GridPattern />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-[#C9A962]/10 text-[#C9A962] text-sm font-semibold rounded-full mb-6">
              Why Choose Us
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Our <span className="text-[#C9A962]">Agents Stand Out</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our agents are more than just salespeople – they're your trusted advisors and
              advocates
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-br from-[#C9A962] to-[#B8985A]">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(#0A1628 1px, transparent 1px), linear-gradient(90deg, #0A1628 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0A1628] mb-4 sm:mb-6 px-2 sm:px-0">
              Ready to Work with Our Expert Team?
            </h2>
            <p className="text-base sm:text-xl text-[#0A1628]/80 mb-6 sm:mb-10 max-w-2xl mx-auto px-4 sm:px-0">
              Contact us today and let our experienced agents help you find your perfect property
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-[#0A1628] text-white font-semibold rounded-xl hover:bg-[#1a2a3a] transition-all text-sm sm:text-base"
              >
                <Phone className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                Contact Us Today
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/sale"
                className="group inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white text-[#0A1628] font-semibold rounded-xl hover:bg-gray-100 transition-all text-sm sm:text-base"
              >
                <Building className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                Browse Properties
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Agent Detail Modal */}
      <AgentDetailModal
        agent={selectedAgent}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default AgentsPage;
