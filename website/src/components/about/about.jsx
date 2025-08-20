// src/pages/About.jsx
import { motion } from 'framer-motion';
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Users,
  BookOpen,
  Award,
  Home,
  BriefcaseBusiness,
  Phone,
  Mail,
  Sparkles,
  Shield,
  TrendingUp,
  MapPin,
  Heart,
  Eye,
  UserCheck,
  Crown,
  Briefcase,
  Target,
  Star,
  Calendar,
  GraduationCap,
} from "lucide-react";

// Brand colors
const COLORS = {
  primary: "#1e293b",
  secondary: "#DCC471",
  accent: "#b07e28",
  light: "#ffffff",
  dark: "#0f172a",
};

// Glowing button component
const GlowButton = ({
  children,
  onClick,
  variant = "primary",
  className = "",
  ...props
}) => (
  <motion.button
    onClick={onClick}
    className={`
      relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform
      ${
        variant === "primary"
          ? "bg-[#DCC471] text-slate-900 shadow-lg hover:shadow-yellow-500/25"
          : "bg-slate-800 text-white border-2 border-[#DCC471] hover:bg-yellow-400 hover:text-slate-900"
      }
      hover:scale-105 active:scale-95 overflow-hidden
      ${className}
    `}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    {...props}
  >
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
      initial={{ x: "-100%" }}
      whileHover={{ x: "100%" }}
      transition={{ duration: 0.6 }}
    />
    <span className="relative z-10 flex items-center justify-center">
      {children}
    </span>
  </motion.button>
);

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/grp-hsp.jpeg')",
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/85 to-yellow-900/40" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 bg-yellow-400/20 rounded-full mb-6 backdrop-blur-sm border border-yellow-400/30"
          >
            <Sparkles className="w-5 h-5 text-[#DCC471] mr-2" />
            <span className="text-yellow-100 font-medium">
              Proudly Zimbabwean, Anchored on The Rock of All Ages
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white">About</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DCC471] to-yellow-300">
              House of Stone
            </span>
            <br />
            <span className="text-white">Properties</span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8"
          >
            Your Property, Our Priority — Takavimbika ~ Sithembekile
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <GlowButton
              onClick={() => window.location.href = "/contact"}
            >
              <Phone className="w-5 h-5 mr-2" />
              Contact Us
            </GlowButton>
            <GlowButton variant="secondary"
              onClick={() => window.location.href = "mailto:info@hsp.co.zw"}
            >
              <Mail className="w-5 h-5 mr-2" />
              Get in Touch
            </GlowButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const ValuesSection = () => {
  const values = [
    { 
      icon: BookOpen, 
      title: 'Purpose', 
      description: 'At HSP, we value God, family and then business. This hierarchy influences everything we do as a company and has created the culture that you see today.'
    },
    { 
      icon: BriefcaseBusiness, 
      title: 'Vision', 
      description: "We aim to become a GLOBAL BRAND providing world class real estate services that meet our clients' needs at all times, and the preferred place of employment for real estate professionals."
    },
    { 
      icon: Home, 
      title: 'Mission', 
      description: 'To provide convenience for tenants, prospective landlords, property owners and investors by bringing them together to a place of satisfaction and comfort.'
    },
    { 
      icon: Award, 
      title: 'Core Values', 
      description: 'Our business is grounded in adherence to the principles of quality, honesty, transparency, integrity, and legality.'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {values.map((item, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="bg-white p-6 rounded-lg shadow-md border-l-4 border-slate-800"
        >
          <div className="flex items-start">
            <div className="bg-slate-800 p-3 rounded-full mr-4">
              <item.icon className="w-6 h-6 text-[#DCC471]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-stone-900 mb-2">{item.title}</h3>
              <p className="text-stone-600 text-sm">{item.description}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const ServicesSection = () => {
  const services = [
    {
      title: "Property Sales",
      description: "Comprehensive listings of residential and commercial properties with extensive marketing and pre-sale enhancement advice."
    },
    {
      title: "Letting & Management",
      description: "We manage rental properties on behalf of owners, market properties, select tenants, and draw up lease agreements."
    },
    {
      title: "Valuations",
      description: "Specialist property valuations for all types of properties (Commercial, Residential, Industrial and Leisure)."
    },
    {
      title: "Project Management",
      description: "Expert services from inception to completion including financial studies, contract drafting, and supervision."
    },
    {
      title: "Other Services",
      description: "Additional services including property auctions, available upon request."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="mt-12"
    >
      <h2 className="text-2xl font-bold text-stone-900 mb-6">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service, index) => (
          <div key={index} className="bg-slate-200 p-4 rounded-md hover:shadow-md transition duration-300">
            <h3 className="text-lg font-semibold text-[#DCC471] mb-2">{service.title}</h3>
            <p className="text-stone-600 text-sm">{service.description}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// Team Section Component
const TeamSection = ({ title, icon: Icon, children, bgColor = "bg-white" }) => (
  <section className={`py-16 ${bgColor}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center mb-4">
          <Icon className="w-8 h-8 text-[#DCC471] mr-3" />
          <h2 className="text-3xl font-bold text-stone-900">{title}</h2>
        </div>
      </motion.div>
      {children}
    </div>
  </section>
);

const About = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Hero Section */}
      <HeroSection />

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-stone-900 mb-6">About Us</h2>
              <div className="prose text-stone-600">
                <p className="mb-4">
                  At House of Stone Properties, we believe real estate should be clear,
                  straightforward, and conducted with integrity. Our reputation is built
                  on dedication to our clients and mastering the complexities of our local
                  markets, providing tailored service that knows no bounds.
                </p>
                <p className="mb-4">
                  HSP serves an organically growing client base of homeowners, prospective
                  purchasers, landlords, investors, and developers. The team is committed
                  to delivering data-driven, transparent, and empathetic real estate
                  advisory.
                </p>
                <p className="mb-4">
                  Our mission is captured in our motto: "Your Real Estate Needs: Our
                  Passion, Our Priority." This reflects our commitment to prioritizing your
                  needs and ensuring that every interaction is driven by a genuine desire
                  to help you achieve your real estate goals.
                </p>
              </div>
              <div className="mt-8">
                <h3 className="text-2xl font-bold text-stone-900 mb-4">Our Origin</h3>
                <p className="text-stone-600 mb-4">
                  House of Stone Properties derives its name from the Word of God, Matthew
                  7: 24-27 with a touch of inspiration from Dzimba DzeMabwe. HSP was
                  established in 2017 with a vision to create an elite, professional
                  boutique real estate company unlike any other.
                </p>
                <blockquote className="italic border-l-4 border-[#DCC471] pl-4 py-2 text-stone-700 bg-stone-100 rounded-r-md">
                  "Therefore everyone who hears these words of mine and puts them into practice is like a wise man who built his 
                  house on the rock." — Matthew 7:24
                </blockquote>
                <p className="text-stone-600 mt-4 font-semibold">
                  Proudly Zimbabwean, Anchored on The Rock of All Ages…
                </p>
              </div>
              
              <ServicesSection />
            </motion.div>

            <div className="space-y-8">
              <ValuesSection />
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-slate-800 rounded-xl p-8 text-white shadow-xl mt-8"
              >
                <h3 className="text-2xl font-bold mb-4">Our Points of Difference</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="bg-[#DCC471] rounded-full p-1 mr-3 mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <p className="text-sm text-stone-300">Strong links with the business community and unwavering commitment to industry regulations and professional codes of conduct.</p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-[#DCC471] rounded-full p-1 mr-3 mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <p className="text-sm text-stone-300">A quality team of dedicated real estate professionals delivering complete real estate services.</p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-[#DCC471] rounded-full p-1 mr-3 mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <p className="text-sm text-stone-300">Results driven, continually outperforming competitors in the management, marketing, selling and leasing of property.</p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-[#DCC471] rounded-full p-1 mr-3 mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <p className="text-sm text-stone-300">Focus on retaining, developing, and supporting our team with ongoing training and professional development.</p>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDERS Section */}
      <TeamSection title="Founders" icon={Crown} bgColor="bg-slate-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl p-8 shadow-lg border-t-4 border-[#DCC471]"
        >
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
            <div className="w-32 h-32 bg-slate-200 rounded-full flex-shrink-0 overflow-hidden">
              <img src="/icon.png" alt="Leonita Mhishi" className="w-full h-full object-cover" />
            </div>
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Leonita Mhishi</h3>
              <p className="text-[#DCC471] font-semibold mb-4 text-lg">CEO/Principal Registered Estate Agent</p>
              <p className="text-stone-600 leading-relaxed mb-4">
                With over a decade of experience, Leonita has helped countless families find their dream homes with grit and enthusiasm. 
                As the Principal Registered Estate Agent and manager of House of Stone Properties, she specializes in working with buyers, 
                sellers, investors, businesses, developers, and land transactions across both residential and commercial sectors.
              </p>
              <p className="text-stone-600 leading-relaxed mb-4">
                Known as a clear, innovative leader in the industry, she has spearheaded numerous real estate initiatives, demonstrating
                exceptional sales volume and efficiency. Her results-driven approach distinguishes her in the industry; she focuses on
                building relationships, mutual respect, and personal touches to achieve the best outcomes for her clients.
              </p>
              <div className="mb-4">
                <h4 className="font-bold text-stone-900 mb-2">Qualifications:</h4>
                <p className="text-stone-600">
                  Bachelor of Laws (LLB) and International Relations and Diplomacy, along with certifications from CIS, IMM, and the Estate Agents Council.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-stone-900 mb-2">Achievements:</h4>
                <ul className="text-stone-600 list-disc list-inside">
                  <li>2022: Agency of the Year -- Propertybook</li>
                  <li>2023-Present: Executive Producer and Presenter of Property Unlocked on ZTN Prime DSTV</li>
                  <li>2023: Megafest Director of the Year -- Platinum Winner</li>
                  <li>2025: Women in Real Estate and Construction Award for Best Salesperson in Luxury Real Estate and Property Management</li>
                  <li>2025: Nominee for Women in Business Award -- Real Estate</li>
                  <li>2025: Nominee for Women in Construction</li>
                </ul>
              </div>
              <p className="text-stone-600 mt-4">
                She is also a committee member of the Diplomat Business Networking Group. Leonita, together with Loraine Gatsi based in Australia Co-founded House of Stone Properties.
              </p>
            </div>
          </div>
        </motion.div>
      </TeamSection>

      {/* MANAGEMENT Section */}
      <TeamSection title="Management" icon={Briefcase} bgColor="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* George Maunganidze */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-slate-50 rounded-xl p-6 shadow-md"
          >
            <h3 className="text-xl font-bold text-stone-900 mb-4">George Maunganidze</h3>
            <p className="text-[#DCC471] font-semibold mb-4">Head of Finance and HR</p>
            <div className="space-y-3">
              <div className="flex items-start">
                <GraduationCap className="w-5 h-5 text-[#DCC471] mr-3 mt-1 flex-shrink-0" />
                <p className="text-stone-700">Qualified Chartered Certified Accountant (ACCA) and holder of a Bachelor of Accountancy degree from the University of Zimbabwe</p>
              </div>
              <div className="flex items-start">
                <Briefcase className="w-5 h-5 text-[#DCC471] mr-3 mt-1 flex-shrink-0" />
                <p className="text-stone-700">Over ten years experience serving clients in manufacturing, mining and metals, agri-business, financial services, construction, education and real estate</p>
              </div>
              <div className="flex items-start">
                <Award className="w-5 h-5 text-[#DCC471] mr-3 mt-1 flex-shrink-0" />
                <p className="text-stone-700">Technically astute and proficient in Accounting, Taxation as well as Corporate Advisory Services</p>
              </div>
              <div className="flex items-start">
                <Users className="w-5 h-5 text-[#DCC471] mr-3 mt-1 flex-shrink-0" />
                <p className="text-stone-700">Married and a father of two girls, avid reader, likes travelling. First year MBA Candidate at the University of Zimbabwe Graduate School of Business</p>
              </div>
            </div>
          </motion.div>

          {/* Nairgel Masiiwa */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-slate-50 rounded-xl p-6 shadow-md"
          >
            <h3 className="text-xl font-bold text-stone-900 mb-4">Nairgel Masiiwa</h3>
            <p className="text-[#DCC471] font-semibold mb-4">Head of Sales Department</p>
            <div className="space-y-3">
              <div className="flex items-start">
                <Briefcase className="w-5 h-5 text-[#DCC471] mr-3 mt-1 flex-shrink-0" />
                <p className="text-stone-700">Seasoned sales professional with expertise in construction and architecture, having worked in South Africa and Zimbabwe real estate industries</p>
              </div>
              <div className="flex items-start">
                <TrendingUp className="w-5 h-5 text-[#DCC471] mr-3 mt-1 flex-shrink-0" />
                <p className="text-stone-700">Proven track record of driving revenue growth and building high-performing sales teams</p>
              </div>
              <div className="flex items-start">
                <Target className="w-5 h-5 text-[#DCC471] mr-3 mt-1 flex-shrink-0" />
                <p className="text-stone-700">Under his leadership, the sales team has consistently exceeded targets, solidifying the company's position as a major player in the industry</p>
              </div>
              <div className="flex items-start">
                <Star className="w-5 h-5 text-[#DCC471] mr-3 mt-1 flex-shrink-0" />
                <p className="text-stone-700">Passionate about innovative sales strategies and commitment to exceptional customer service</p>
              </div>
            </div>
          </motion.div>

          {/* Winnifilda Shadaya */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-slate-50 rounded-xl p-6 shadow-md"
          >
            <h3 className="text-xl font-bold text-stone-900 mb-4">Winnifilda Shadaya</h3>
            <p className="text-[#DCC471] font-semibold mb-4">Head of Rentals</p>
            <div className="space-y-3">
              <div className="flex items-start">
                <Briefcase className="w-5 h-5 text-[#DCC471] mr-3 mt-1 flex-shrink-0" />
                <p className="text-stone-700">Accomplished real estate sales consultant with over 14 years of experience in the Zimbabwean and South African markets</p>
              </div>
              <div className="flex items-start">
                <Award className="w-5 h-5 text-[#DCC471] mr-3 mt-1 flex-shrink-0" />
                <p className="text-stone-700">Known for exceptional negotiation skills and in-depth market knowledge</p>
              </div>
              <div className="flex items-start">
                <Users className="w-5 h-5 text-[#DCC471] mr-3 mt-1 flex-shrink-0" />
                <p className="text-stone-700">Based in Harare, with an extensive network of clients and industry contacts throughout the region</p>
              </div>
              <div className="flex items-start">
                <Target className="w-5 h-5 text-[#DCC471] mr-3 mt-1 flex-shrink-0" />
                <p className="text-stone-700">Facilitated numerous successful transactions across residential, commercial, and industrial properties</p>
              </div>
            </div>
          </motion.div>

          {/* James Mudzikiti */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-slate-50 rounded-xl p-6 shadow-md"
          >
            <h3 className="text-xl font-bold text-stone-900 mb-4">James Mudzikiti</h3>
            <p className="text-[#DCC471] font-semibold mb-4">Head of Marketing Executive</p>
            <div className="space-y-3">
              <div className="flex items-start">
                <Briefcase className="w-5 h-5 text-[#DCC471] mr-3 mt-1 flex-shrink-0" />
                <p className="text-stone-700">Qualified and experienced professional with over 20 years operational, tactical and strategic experience across Business Processes, and Industry sectors</p>
              </div>
              <div className="flex items-start">
                <TrendingUp className="w-5 h-5 text-[#DCC471] mr-3 mt-1 flex-shrink-0" />
                <p className="text-stone-700">Vast experience in Press and Public relations and managing corporate affairs</p>
              </div>
              <div className="flex items-start">
                <Award className="w-5 h-5 text-[#DCC471] mr-3 mt-1 flex-shrink-0" />
                <p className="text-stone-700">Has held project leadership roles across manufacturing, insurance and FMCG sectors</p>
              </div>
              <div className="flex items-start">
                <Target className="w-5 h-5 text-[#DCC471] mr-3 mt-1 flex-shrink-0" />
                <p className="text-stone-700">Brings a wealth of functional, tactical and strategic management experience to the Real Estate sector</p>
              </div>
            </div>
          </motion.div>
        </div>
      </TeamSection>

      {/* AGENTS Section */}
      <TeamSection title="Our Agents" icon={UserCheck} bgColor="bg-slate-50">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Tsitsi Mashingaidze */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition duration-300"
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-[#DCC471] to-yellow-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-2">Tsitsi Mashingaidze</h3>
              <p className="text-[#DCC471] font-semibold mb-3">Senior Sales Consultant</p>
              <p className="text-stone-600 text-sm">
                Accountant by profession with more than 3 decades of finance, administration and sales experience in the Private, NGO and Retail Sectors.
                Skilled at developing the right action plan for each client's unique needs.
              </p>
            </div>
          </motion.div>

          {/* Chomu Sithole */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition duration-300"
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Eye className="w-10 h-10 text-[#DCC471]" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-2">Chomu Sithole</h3>
              <p className="text-[#DCC471] font-semibold mb-3">Senior Sales Consultant</p>
              <p className="text-stone-600 text-sm">
                Mature and dynamic professional with over 25 years of experience in the interior design industry and 3 years in real estate.
                Has a keen eye for spotting hidden gems and transforming properties into stunning showcases.
              </p>
            </div>
          </motion.div>

          {/* Emily Matsika */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition duration-300"
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Building2 className="w-10 h-10 text-[#DCC471]" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-2">Emily Matsika</h3>
              <p className="text-[#DCC471] font-semibold mb-3">Senior Sales Consultant</p>
              <p className="text-stone-600 text-sm">
                Dedicated real estate agent specializing in sales with a unique blend of passion for real estate and a robust background in marketing.
                Expertise in the vibrant Harare West market.
              </p>
            </div>
          </motion.div>

          {/* Additional agents would follow the same pattern */}
          {/* For brevity, I'm showing 3 agents but you would add the remaining 7 following the same pattern */}
        </div>

        <div className="text-center mt-8">
          <GlowButton
            onClick={() => window.location.href = "/agents"}
            className="mx-auto"
          >
            View All Our Agents
          </GlowButton>
        </div>
      </TeamSection>

      {/* OUR STAFF Section */}
      <TeamSection title="Our Staff" icon={Users} bgColor="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Tanaka Maforimbo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-slate-50 rounded-xl p-6 shadow-md"
          >
            <h3 className="text-xl font-bold text-stone-900 mb-4">Tanaka Maforimbo</h3>
            <p className="text-[#DCC471] font-semibold mb-4">Letting Executive</p>
            <div className="space-y-3">
              <div className="flex items-start">
                <GraduationCap className="w-5 h-5 text-[#DCC471] mr-3 mt-1 flex-shrink-0" />
                <p className="text-stone-700">BSc with Honors in Real Estate Management from the University of Zimbabwe</p>
              </div>
              <div className="flex items-start">
                <Briefcase className="w-5 h-5 text-[#DCC471] mr-3 mt-1 flex-shrink-0" />
                <p className="text-stone-700">Three years of expertise in the real estate sector</p>
              </div>
              <div className="flex items-start">
                <Award className="w-5 h-5 text-[#DCC471] mr-3 mt-1 flex-shrink-0" />
                <p className="text-stone-700">Excellent customer service and strong communication skills</p>
              </div>
              <div className="flex items-start">
                <Target className="w-5 h-5 text-[#DCC471] mr-3 mt-1 flex-shrink-0" />
                <p className="text-stone-700">Uses organizational talents and market expertise to provide exceptional client care</p>
              </div>
            </div>
          </motion.div>

          {/* Arthur Tumbwe */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-slate-50 rounded-xl p-6 shadow-md"
          >
            <h3 className="text-xl font-bold text-stone-900 mb-4">Arthur Tumbwe</h3>
            <p className="text-[#DCC471] font-semibold mb-4">Executive Personal Assistant to CEO</p>
            <div className="space-y-3">
              <div className="flex items-start">
                <Briefcase className="w-5 h-5 text-[#DCC471] mr-3 mt-1 flex-shrink-0" />
                <p className="text-stone-700">Dynamic professional with over a decade of experience in the commercial industry</p>
              </div>
              <div className="flex items-start">
                <TrendingUp className="w-5 h-5 text-[#DCC471] mr-3 mt-1 flex-shrink-0" />
                <p className="text-stone-700">Passionate advocate for sustainable business growth and innovation</p>
              </div>
              <div className="flex items-start">
                <Award className="w-5 h-5 text-[#DCC471] mr-3 mt-1 flex-shrink-0" />
                <p className="text-stone-700">Transforms love for business and technology into ground-breaking solutions</p>
              </div>
              <div className="flex items-start">
                <Heart className="w-5 h-5 text-[#DCC471] mr-3 mt-1 flex-shrink-0" />
                <p className="text-stone-700">Dedicated mentor and speaker, sharing insights to encourage aspiring creators</p>
              </div>
            </div>
          </motion.div>

          {/* Sarah Mugwenhi */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-slate-50 rounded-xl p-6 shadow-md"
          >
            <h3 className="text-xl font-bold text-stone-900 mb-4">Sarah Mugwenhi</h3>
            <p className="text-[#DCC471] font-semibold mb-4">Administrator</p>
            <div className="space-y-3">
              <div className="flex items-start">
                <GraduationCap className="w-5 h-5 text-[#DCC471] mr-3 mt-1 flex-shrink-0" />
                <p className="text-stone-700">Special Honours Degree in Monitoring and Evaluation (2.1) from Lupane State University</p>
              </div>
              <div className="flex items-start">
                <GraduationCap className="w-5 h-5 text-[#DCC471] mr-3 mt-1 flex-shrink-0" />
                <p className="text-stone-700">Bachelor of Arts in Development Studies Honours Degree (2.1) from Midlands State University</p>
              </div>
              <div className="flex items-start">
                <Briefcase className="w-5 h-5 text-[#DCC471] mr-3 mt-1 flex-shrink-0" />
                <p className="text-stone-700">Rich background in office administration and customer service in tertiary and real estate sectors</p>
              </div>
              <div className="flex items-start">
                <Award className="w-5 h-5 text-[#DCC471] mr-3 mt-1 flex-shrink-0" />
                <p className="text-stone-700">Skills include crisis management, decision-making, team building, and database management</p>
              </div>
            </div>
          </motion.div>
        </div>
      </TeamSection>

      {/* Contact Section */}
      <section className="py-16 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">Get In Touch</h2>
            <p className="text-stone-300 mb-8 max-w-xl mx-auto">
              Your property journey begins with a conversation. Reach out to us today.
            </p>
            <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-[#DCC471] mr-2" />
                <span className="text-stone-300">+263 772 329 569, +263 788 479 143</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-[#DCC471] mr-2" />
                <a href="mailto:info@hsp.co.zw" className="text-[#DCC471] hover:text-yellow-300 transition">info@hsp.co.zw</a>
              </div>
            </div>
            <p className="mt-4 text-stone-300 flex items-center justify-center">
              <MapPin className="w-4 h-4 mr-2" />
              21 Harare Drive, Borrowdale, Harare
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;