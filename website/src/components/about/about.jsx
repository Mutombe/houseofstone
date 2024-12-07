// src/pages/About.jsx
import { motion } from 'framer-motion';
import React from 'react';
import { Building2, Users, Globe, Award } from 'lucide-react';

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
            About House of Stone
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-gradient-to-r from-transparent via-white to-transparent"></div>
          </h1>
          <p className="text-xl text-stone-300 max-w-2xl mx-auto">
            Leading the way in luxury real estate for over two decades
          </p>
        </motion.div>
      </div>
    </section>
  );
};


const AchievementsSection = () => {
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
    hidden: { x: 20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Achievements data with additional context
  const achievements = [
    { 
      icon: Building2, 
      title: '500+', 
      subtitle: 'Properties Sold',
      description: 'Extensive portfolio of successful real estate transactions'
    },
    { 
      icon: Users, 
      title: '1000+', 
      subtitle: 'Happy Clients',
      description: 'Trusted by a diverse range of property owners and investors'
    },
    { 
      icon: Globe, 
      title: '50+', 
      subtitle: 'Cities',
      description: 'Comprehensive market presence across multiple regions'
    },
    { 
      icon: Award, 
      title: '10+', 
      subtitle: 'Industry Awards',
      description: 'Recognized for excellence and innovation in real estate'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 rounded-xl p-8 text-white shadow-2xl overflow-hidden"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {achievements.map((item, index) => (
          <motion.div 
            key={index}
            variants={itemVariants}
            className="text-center group transition-all duration-300 transform hover:scale-105 hover:bg-white/5 p-4 rounded-lg"
          >
            <div className="bg-white/10 p-4 rounded-full inline-block mb-4 group-hover:bg-white/20 transition-all">
              <item.icon 
                className="w-10 h-10 mx-auto text-stone-300 group-hover:text-white transition-colors" 
              />
            </div>
            <h3 className="text-3xl font-bold mb-2 text-white group-hover:text-stone-200 transition-colors">
              {item.title}
            </h3>
            <p className="text-stone-400 mb-2 font-medium">
              {item.subtitle}
            </p>
            <p className="text-xs text-stone-500 group-hover:text-stone-300 transition-colors">
              {item.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-stone-900 mb-6">Our Story</h2>
              <p className="text-stone-600 mb-6">
                Founded in 2000, House of Stone has grown from a small local agency to one of the most 
                respected names in luxury real estate. Our commitment to excellence and dedication to our 
                clients has earned us numerous accolades and a reputation for exceptional service.
              </p>
              <p className="text-stone-600">
                We believe that finding the perfect home is about more than just property - it's about 
                understanding our clients' dreams and helping them build their future.
              </p>
            </motion.div>
                      <AchievementsSection />
                      
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
            <h2 className="text-3xl font-bold text-stone-900 mb-4">Our Leadership Team</h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Meet the experienced professionals leading House of Stone
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Leonita',
                position: 'CEO & Founder',
                    bio: '20+ years in luxury real estate',
                image: '/icon.png'
              },
              {
                name: 'Sarah',
                position: 'Head of Sales',
                  bio: 'Former top producer with $500M+ in sales',
                image: '/icon.png'
              },
              {
                name: 'James',
                position: 'Chief Operating Officer',
                  bio: 'Expert in real estate operations',
                image: '/icon.png'
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-stone-50 rounded-xl p-6 text-center"
              >
                    <div className="w-24 h-24 bg-stone-200 rounded-full mx-auto mb-4" >
                        <img src={member.image} alt="Team Member" className="w-full h-full object-cover rounded-full" />
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-2">{member.name}</h3>
                <p className="text-stone-500 mb-2">{member.position}</p>
                <p className="text-stone-600">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;