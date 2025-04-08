// src/pages/About.jsx
import { motion } from 'framer-motion';
import React from 'react';
import { Building2, Users, BookOpen, Award, Home, BriefcaseBusiness, Phone, Mail } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative py-20 bg-stone-900 text-white overflow-hidden">
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 filter brightness-50"
        style={{ 
          backgroundImage: "url('/mar.webp')", 
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      />
      
      {/* Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center relative z-20"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 relative">
            About House of Stone Properties
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-gradient-to-r from-transparent via-amber-800 to-transparent"></div>
          </h1>
          <p className="text-xl text-stone-300 max-w-2xl mx-auto">
            Your Property, Our Priority — Takavimbika ~ Sithembekile
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const ValuesSection = () => {
  // Values data from company profile
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
          className="bg-white p-6 rounded-lg shadow-md border-l-4 border-amber-800"
        >
          <div className="flex items-start">
            <div className="bg-amber-800/10 p-3 rounded-full mr-4">
              <item.icon className="w-6 h-6 text-amber-800" />
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
      title: "Letting",
      description: "Legal expertise in drafting lease agreements that protect both lessors and lessees, with all documentation carefully scrutinized for legality."
    },
    {
      title: "Management",
      description: "Hands-on approach to property management, implementing preventive and corrective measures to preserve and grow rental and capital values."
    },
    {
      title: "Valuations",
      description: "Specialist property valuations for all types of properties with years of experience in valuation techniques and methods."
    },
    {
      title: "Project Management",
      description: "Expert services from inception to completion including financial studies, contract drafting, supervision, and handover of defect-free projects."
    },
    {
      title: "Auctions & More",
      description: "Additional services including property auctions, with further information available on request."
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
          <div key={index} className="bg-stone-100 p-4 rounded-md hover:shadow-md transition duration-300">
            <h3 className="text-lg font-semibold text-amber-800 mb-2">{service.title}</h3>
            <p className="text-stone-600 text-sm">{service.description}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const About = () => {
  return (
    <div className="min-h-screen pt-16 bg-stone-50">
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
                  House of Stone Properties is a young and dynamic Real Estate Agency, which boasts of some of the best minds 
                  on the local Real Estate and Property Market. It possesses individuals with vast experience in excess of 35 years 
                  consultancy property negotiation encompassing identification of parties, negotiation and conclusion of sales; 
                  lease administration and property management as well as valuations.
                </p>
                <p className="mb-4">
                  We are a boutique team of full-time real estate professionals and trusted advisors. Our singular focus is 
                  achieving the highest value for our clients through expert strategy, market insight and skilled negotiations, 
                  while ensuring our clients are comfortable, well-informed and patiently guided throughout the process.
                </p>
                <p className="mb-4">
                  The huge legal experience in Property Law should suffice to give an assurance that all property dealings are done in 
                  conformity with the law. HSP is setting the new standard for exceptional real estate service across Zimbabwe.
                </p>
              </div>
              <div className="mt-8">
                <h3 className="text-2xl font-bold text-stone-900 mb-4">Our Origin</h3>
                <p className="text-stone-600 mb-4">
                  HSP was established in 2017 with a vision to create an elite, professional boutique real estate company unlike any other. 
                  HSP was founded on the word of God, Matthew 7: 24-27, where its name came from.
                </p>
                <blockquote className="italic border-l-4 border-amber-800 pl-4 py-2 text-stone-700 bg-stone-100 rounded-r-md">
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
                className="bg-stone-800 rounded-xl p-8 text-white shadow-xl mt-8"
              >
                <h3 className="text-2xl font-bold mb-4">Our Points of Difference</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="bg-amber-800 rounded-full p-1 mr-3 mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <p className="text-sm text-stone-300">Strong links with the business community and unwavering commitment to industry regulations and professional codes of conduct.</p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-amber-800 rounded-full p-1 mr-3 mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <p className="text-sm text-stone-300">A quality team of dedicated real estate professionals delivering complete real estate services.</p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-amber-800 rounded-full p-1 mr-3 mt-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <p className="text-sm text-stone-300">Results driven, continually outperforming competitors in the management, marketing, selling and leasing of property.</p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-amber-800 rounded-full p-1 mr-3 mt-1">
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

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-stone-900 mb-4">Our Management</h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Meet the experienced professionals leading House of Stone Properties
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="col-span-1 md:col-span-3 bg-stone-50 rounded-xl p-6 shadow-md border-t-4 border-amber-800"
            >
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="w-24 h-24 bg-stone-200 rounded-full flex-shrink-0 overflow-hidden">
                  <img src="/icon.png" alt="Leonita Mhishi" className="w-full h-full object-cover" />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-bold text-stone-900 mb-2">Leonita Mhishi</h3>
                  <p className="text-amber-800 font-semibold mb-2">Managing Director & Founder</p>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    Leonita is the founder of House of Stone Properties, one of the top real estate agencies in the country. 
                    She has worked for various organizations holding key positions in Zimbabwe, Australia, China and various other countries.
                    Experienced Property Consultant with a demonstrated history of working in the Real Estate industry.
                    Skilled in Commercial Property Sales, Negotiation, Real Property, Diplomatic History, and International Relations,
                    Leonita thrives in building business relationships grounded in adherence to the principles of honesty, transparency,
                    integrity and legality, giving an assurance to all clients that all property dealings are done in conformity with the law.
                  </p>
                  <p className="text-stone-600 text-sm mt-2">
                    She holds International Marketing Management, Topflight Secretarial, ICSA, International Relations and Diplomacy, 
                    Bachelor of Laws (LLB) UNISA. A Committee member of the Diplomat Business Networking Group.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-stone-50 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition duration-300"
            >
              <h3 className="text-xl font-bold text-stone-900 mb-4">Team HSP</h3>
              <p className="text-stone-600 mb-6">
                The HSP team has Sales Negotiators and permanent members of staff with an unwavering commitment to 
                servicing the needs of astute property investors based on their experiences during their time in the industry.
              </p>
              <p className="text-stone-600 font-semibold">
                Our ability to analyse the real estate situations and finding the most satisfactory resolution is one of our strongest attributes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-stone-50 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition duration-300"
            >
              <h3 className="text-xl font-bold text-stone-900 mb-4">Marketing Platform</h3>
              <ul className="text-stone-600 text-sm space-y-2 text-left">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-amber-800 rounded-full mr-2"></span>
                  <span>Emails Marketing - Target based email blast to registered clients</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-amber-800 rounded-full mr-2"></span>
                  <span>Virtual Tours - 360° tours for bespoke properties</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-amber-800 rounded-full mr-2"></span>
                  <span>Open House - View your property in person</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-amber-800 rounded-full mr-2"></span>
                  <span>Online Exposure - Web, online sites, blogs, social networks</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-amber-800 rounded-full mr-2"></span>
                  <span>Print Media - Magazine, brochure, newspapers</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-stone-50 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition duration-300"
            >
              <h3 className="text-xl font-bold text-stone-900 mb-4">Corporate Social Responsibility</h3>
              <p className="text-stone-600">
                We currently donate food stuffs and clothing to various orphanages in Hatcliff and Hatfield. 
                House of Stone Properties is a good corporate citizen and revolves in good leadership, sustainability 
                and corporate citizenship.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-stone-900 mb-4">Get In Touch</h2>
            <p className="text-stone-600 mb-8 max-w-xl mx-auto">
              Your property journey begins with a conversation. Reach out to us today.
            </p>
            <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-amber-800 mr-2" />
                <span className="text-stone-700">+263 772 329 569, +263 719 329 569</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-amber-800 mr-2" />
                <a href="mailto:info@hsp.co.zw" className="text-stone-700 hover:text-amber-800">info@hsp.co.zw</a>
              </div>
            </div>
            <p className="mt-4 text-stone-600">
              Suite 2, First Floor Ballantyne Park Shopping Centre, Wellburn Drive, Ballantyne Park, Harare
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;