// src/pages/PropertyManagement.jsx
import { motion } from 'framer-motion';
import { Shield, Clock, Users, BarChart } from 'lucide-react';
import { 
  HomeModernIcon, 
  ShieldCheckIcon, 
  CurrencyDollarIcon,
  ClipboardDocumentCheckIcon
} from '@heroicons/react/24/outline';

const PropertyManagementHero = () => {
  // Animation configuration for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Core property management services
  const managementServices = [
    {
      Icon: HomeModernIcon,
      title: "Comprehensive Maintenance",
      description: "Proactive property upkeep and rapid issue resolution"
    },
    {
      Icon: ShieldCheckIcon,
      title: "Tenant Screening",
      description: "Rigorous tenant selection to ensure quality occupancy"
    },
    {
      Icon: CurrencyDollarIcon,
      title: "Financial Optimization",
      description: "Maximizing rental income and minimizing operational costs"
    },
    {
      Icon: ClipboardDocumentCheckIcon,
      title: "Regulatory Compliance",
      description: "Navigating complex legal and regulatory requirements"
    }
  ];

  return (
    <section className="relative bg-stone-900 text-white py-20 overflow-hidden">
      {/* Gradient Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 opacity-80"></div>
      
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
            Professional Property Management
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent"></span>
          </h1>
          
          {/* Subheading */}
          <p className="text-xl text-stone-300 max-w-3xl mx-auto mb-12">
            Maximize your property's potential with our comprehensive management solutions
          </p>
          
          {/* Services Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          >
            {managementServices.map((service) => (
              <motion.div 
                key={service.title}
                variants={itemVariants}
                className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-white/30 transition-all duration-300 group"
              >
                <div className="bg-white/10 p-4 rounded-full inline-block mb-4 group-hover:bg-white/20 transition-all">
                  <service.Icon className="w-10 h-10 text-white group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">
                  {service.title}
                </h3>
                <p className="text-stone-400 text-sm">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const PropertyManagement = () => {
  const services = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Maintenance & Repairs",
      description: "24/7 property maintenance and swift repair services to keep your property in prime condition."
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Tenant Management",
      description: "Comprehensive tenant screening, rent collection, and relationship management."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Property Marketing",
      description: "Strategic marketing to minimize vacancy rates and maximize rental income."
    },
    {
      icon: <BarChart className="w-8 h-8" />,
      title: "Financial Reporting",
      description: "Detailed monthly financial reports and performance analytics."
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <PropertyManagementHero />

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 bg-stone-50 rounded-xl"
              >
                <div className="text-stone-800 mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-stone-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-stone-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-stone-900 mb-6">
              Ready to get started?
            </h2>
            <p className="text-stone-600 mb-8 max-w-2xl mx-auto">
              Contact us today to learn how our property management services can help you achieve your goals.
            </p>
            <button className="bg-stone-900 text-white px-8 py-3 rounded-lg hover:bg-stone-800 transition-colors">
              Schedule a Consultation
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PropertyManagement;