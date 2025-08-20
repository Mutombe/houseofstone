// src/pages/OurStaff.jsx
import { motion } from 'framer-motion';
import React from 'react';
import {
  Users,
  Award,
  BookOpen,
  MapPin,
  Phone,
  Mail,
  Heart,
  Calendar,
  GraduationCap,
  Shield,
} from "lucide-react";

const OurStaff = () => {
  const staffMembers = [
    {
      name: "Tanaka Maforimbo",
      position: "Letting Executive",
      education: "BSc with Honors in Real Estate Management (University of Zimbabwe)",
      experience: "3 years in real estate sector",
      skills: "Excellent customer service, strong communication, organizational talents, market expertise",
      approach: "Provides exceptional client care while guiding clients through the housing market"
    },
    {
      name: "Arthur Tumbwe",
      position: "Executive Personal Assistant to CEO",
      experience: "Over a decade in commercial industry",
      passion: "Sustainable business growth and innovation, transforming business and technology into ground-breaking solutions",
      activities: "Dedicated mentor and speaker, hiking, playing chess, reading science books, learning car mechanics",
      philosophy: "Encourages aspiring creators to embrace their unique talents and voices"
    },
    {
      name: "Sarah Mugwenhi",
      position: "Administrator",
      education: "Special Honours Degree in Monitoring and Evaluation (2.1 - Lupane State University), Bachelor of Arts in Development Studies Honours Degree (2.1 - Midlands State University)",
      experience: "Rich background in office administration and customer service in tertiary and real estate sectors",
      skills: "Crisis management, decision-making, team building, database management",
      strengths: "Strong organizational skills, meticulous attention to detail, friendly and multitasking nature",
      goal: "To utilize technical skills and provide professional service to customers by applying and honing abilities"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-slate-800 to-slate-900 text-white pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Support Staff</h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              The dedicated professionals who ensure our operations run smoothly and efficiently
            </p>
          </motion.div>
        </div>
      </section>

      {/* Staff Members */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {staffMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300"
              >
                <div className="text-center mb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-10 h-10 text-[#DCC471]" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">{member.name}</h2>
                  <p className="text-[#DCC471] font-semibold">{member.position}</p>
                </div>

                <div className="space-y-3">
                  {member.education && (
                    <div className="flex items-start">
                      <GraduationCap className="w-4 h-4 text-[#DCC471] mr-2 mt-1 flex-shrink-0" />
                      <p className="text-slate-700 text-sm"><strong>Education:</strong> {member.education}</p>
                    </div>
                  )}
                  
                  {member.experience && (
                    <div className="flex items-start">
                      <Award className="w-4 h-4 text-[#DCC471] mr-2 mt-1 flex-shrink-0" />
                      <p className="text-slate-700 text-sm"><strong>Experience:</strong> {member.experience}</p>
                    </div>
                  )}
                  
                  {member.skills && (
                    <div className="flex items-start">
                      <BookOpen className="w-4 h-4 text-[#DCC471] mr-2 mt-1 flex-shrink-0" />
                      <p className="text-slate-700 text-sm"><strong>Skills:</strong> {member.skills}</p>
                    </div>
                  )}
                  
                  {member.strengths && (
                    <div className="flex items-start">
                      <Shield className="w-4 h-4 text-[#DCC471] mr-2 mt-1 flex-shrink-0" />
                      <p className="text-slate-700 text-sm"><strong>Strengths:</strong> {member.strengths}</p>
                    </div>
                  )}
                  
                  {member.approach && (
                    <div className="flex items-start">
                      <Heart className="w-4 h-4 text-[#DCC471] mr-2 mt-1 flex-shrink-0" />
                      <p className="text-slate-700 text-sm"><strong>Approach:</strong> {member.approach}</p>
                    </div>
                  )}
                  
                  {member.philosophy && (
                    <div className="flex items-start">
                      <Heart className="w-4 h-4 text-[#DCC471] mr-2 mt-1 flex-shrink-0" />
                      <p className="text-slate-700 text-sm"><strong>Philosophy:</strong> {member.philosophy}</p>
                    </div>
                  )}
                  
                  {member.activities && (
                    <div className="flex items-start">
                      <Calendar className="w-4 h-4 text-[#DCC471] mr-2 mt-1 flex-shrink-0" />
                      <p className="text-slate-700 text-sm"><strong>Activities:</strong> {member.activities}</p>
                    </div>
                  )}
                  
                  {member.goal && (
                    <div className="flex items-start">
                      <Award className="w-4 h-4 text-[#DCC471] mr-2 mt-1 flex-shrink-0" />
                      <p className="text-slate-700 text-sm"><strong>Goal:</strong> {member.goal}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Support Section */}
      <section className="py-16 bg-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Behind the Scenes Excellence</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Our support staff ensures that every aspect of our operation runs smoothly, allowing our agents to focus on serving you better
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#DCC471] rounded-full mx-auto mb-4 flex items-center justify-center">
                <Shield className="w-8 h-8 text-slate-900" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Administrative Support</h3>
              <p className="text-slate-300">
                Ensuring smooth office operations, scheduling, client records management, and marketing coordination
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#DCC471] rounded-full mx-auto mb-4 flex items-center justify-center">
                <Heart className="w-8 h-8 text-slate-900" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Client Service</h3>
              <p className="text-slate-300">
                Providing exceptional service to both real estate agents and clients, contributing to company success
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#DCC471] rounded-full mx-auto mb-4 flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-slate-900" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Guidance</h3>
              <p className="text-slate-300">
                Leveraging specialized knowledge to guide clients through the complexities of the housing market
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Get In Touch</h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">
            Our support team is here to assist you with any administrative needs or questions
          </p>
          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <div className="flex items-center">
              <Phone className="w-5 h-5 text-[#DCC471] mr-2" />
              <span className="text-slate-700">+263 772 329 569, +263 719 329 569</span>
            </div>
            <div className="flex items-center">
              <Mail className="w-5 h-5 text-[#DCC471] mr-2" />
              <a href="mailto:info@hsp.co.zw" className="text-[#DCC471] hover:text-yellow-600 transition">info@hsp.co.zw</a>
            </div>
          </div>
          <p className="mt-4 text-slate-600 flex items-center justify-center">
            <MapPin className="w-4 h-4 mr-2" />
            21 Harare Drive, Borrowdale Harare
          </p>
        </div>
      </section>
    </div>
  );
};

export default OurStaff;