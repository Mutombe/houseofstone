// src/pages/Consulting.jsx
import { motion } from 'framer-motion';
import { Lightbulb, Target, TrendingUp, Building } from 'lucide-react';
import React from 'react';
import { PresentationChartLineIcon, BuildingOfficeIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const ConsultingHeroSection = () => {
  // Animation variants for staggered icon entrance
  const iconVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section className="relative bg-gray-800 text-white py-20 overflow-hidden">
      {/* Subtle Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-75">
        {/* Background Image */}
        <div className="absolute inset-0 bg-cover bg-center opacity-30 filter brightness-50"
          style={{ backgroundImage: "url('/mar.webp')" }}
        />
      </div>
      
      {/* Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center relative"
        >
          {/* Main Heading with Subtle Accent */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 relative inline-block">
            Real Estate Consulting Services
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></span>
          </h1>
          
          {/* Subheading */}
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            Strategic guidance for optimal real estate investments and decisions
          </p>
          
          {/* Consulting Focus Icons */}
          <motion.div 
            initial="hidden"
            animate="visible"
            className="flex justify-center space-x-8 mb-6"
          >
            {[
              { 
                Icon: PresentationChartLineIcon, 
                title: "Investment Strategy",
                description: "Data-driven investment recommendations"
              },
              { 
                Icon: BuildingOfficeIcon, 
                title: "Portfolio Management",
                description: "Comprehensive property portfolio optimization"
              },
              { 
                Icon: ChartBarIcon, 
                title: "Market Analysis",
                description: "In-depth market trend insights"
              }
            ].map((item, index) => (
              <motion.div 
                key={item.title}
                variants={iconVariants}
                custom={index}
                className="text-center group"
              >
                <div className="bg-yellow-500/20 hover:bg-yellow-500/30 transition-all duration-300 p-4 rounded-full mb-3 inline-block">
                  <item.Icon 
                    className="w-10 h-10 text-yellow-400 group-hover:scale-110 transition-transform" 
                  />
                </div>
                <h3 className="text-sm font-semibold text-gray-300 group-hover:text-yellow-400 transition-colors">
                  {item.title}
                </h3>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const Consulting = () => {
  const services = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Investment Strategy",
      description: "Expert guidance on real estate investment opportunities and portfolio optimization."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Market Research",
      description: "In-depth analysis of market trends, demographics, and investment potential."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Value Enhancement",
      description: "Strategic recommendations for property value maximization."
    },
    {
      icon: <Building className="w-8 h-8" />,
      title: "Development Planning",
      description: "Comprehensive planning and feasibility studies for property development."
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <ConsultingHeroSection />

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Our Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Providing accurate and sound advice and assistance to customers using the highest standards of professionalism, excellence and efficiency
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 bg-gray-50 rounded-xl border-t-4 border-yellow-400 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-yellow-500 mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Our Consulting Process
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A systematic approach to understanding and achieving your real estate goals
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: 'Discovery',
                description: 'Understanding your goals and requirements',
                quote: '"Our clients always come first and continually striving to meet and exceed client needs and expectations remains our priority."'
              },
              {
                step: 'Analysis', 
                description: 'Detailed market and opportunity analysis',
                quote: '"We are committed to providing the highest level of service through expert strategy, market insight and skilled negotiations."'
              },
              {
                step: 'Implementation',
                description: 'Strategic execution of recommendations',
                quote: '"Your Property, Our Priority"'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-yellow-400 text-white flex items-center justify-center text-xl font-bold mr-3">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">{item.step}</h3>
                </div>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <blockquote className="italic text-sm text-gray-500 border-l-2 border-yellow-400 pl-3">
                  {item.quote}
                </blockquote>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-2/3 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">Ready to optimize your real estate investments?</h2>
              <p className="text-gray-300">
                Contact us today to schedule a consultation with our experienced team.
              </p>
            </div>
            <div>
              <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-6 rounded-md transition-colors">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Consulting;