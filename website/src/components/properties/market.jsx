// src/pages/MarketAnalysis.jsx
import { motion } from 'framer-motion';
import { LineChart, PieChart, BarChart2, Map, TrendingUp } from 'lucide-react';
import { 
  ChartBarIcon, 
  DocumentMagnifyingGlassIcon, 
} from '@heroicons/react/24/outline';


const MarketAnalysisHero = () => {
  // Staggered animation configuration
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

  // Key analysis features
  const analysisFeatures = [
    {
      Icon: ChartBarIcon,
      title: "Comprehensive Market Insights",
      description: "Deep-dive analysis of local and regional real estate trends"
    },
    {
      Icon: DocumentMagnifyingGlassIcon,
      title: "Predictive Modeling",
      description: "Advanced statistical forecasting of market movements"
    },
    {
      Icon: TrendingUp,
      title: "Investment Strategy",
      description: "Data-powered recommendations for optimal investment decisions"
    }
  ];

  return (
    <section className="relative bg-stone-900 text-white py-20 overflow-hidden">
      {/* Gradient Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 opacity-80">
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
          {/* Main Heading with Accent */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 relative inline-block">
            Market Analysis Services
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent"></span>
          </h1>
          
          {/* Subheading */}
          <p className="text-xl text-stone-300 max-w-3xl mx-auto mb-12">
            Data-driven insights for informed real estate decisions
          </p>
          
          {/* Analysis Features Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {analysisFeatures.map((feature) => (
              <motion.div 
                key={feature.title}
                variants={itemVariants}
                className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-white/30 transition-all duration-300 group"
              >
                <div className="bg-white/10 p-4 rounded-full inline-block mb-4 group-hover:bg-white/20 transition-all">
                  <feature.Icon className="w-10 h-10 text-white group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">
                  {feature.title}
                </h3>
                <p className="text-stone-400 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};


const MarketAnalysis = () => {
  const features = [
    {
      icon: <LineChart className="w-8 h-8" />,
      title: "Trend Analysis",
      description: "Comprehensive analysis of market trends and price movements."
    },
    {
      icon: <PieChart className="w-8 h-8" />,
      title: "Demographics Study",
      description: "Detailed insights into population and consumer behavior."
    },
    {
      icon: <BarChart2 className="w-8 h-8" />,
      title: "Competition Analysis",
      description: "Assessment of market competition and positioning strategies."
    },
    {
      icon: <Map className="w-8 h-8" />,
      title: "Location Intelligence",
      description: "In-depth analysis of location-based factors and opportunities."
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <MarketAnalysisHero />

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 bg-stone-50 rounded-xl"
              >
                <div className="text-stone-800 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-stone-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-stone-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reports Section */}
      <section className="py-20 bg-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-stone-900 mb-4">
              Our Analysis Reports
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Comprehensive reports tailored to your specific needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              'Market Overview',
              'Investment Analysis',
              'Growth Projections'
            ].map((report, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <h3 className="text-xl font-bold text-stone-900 mb-4">{report}</h3>
                <ul className="space-y-2 text-stone-600">
                  <li>• Detailed market statistics</li>
                  <li>• Trend analysis</li>
                  <li>• Comparative studies</li>
                  <li>• Future projections</li>
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MarketAnalysis;