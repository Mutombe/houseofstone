// src/pages/Management.jsx
import { motion } from 'framer-motion';
import React from 'react';
import {
  Users,
  Award,
  Briefcase,
  MapPin,
  Phone,
  Mail,
  BookOpen,
  GraduationCap,
  Heart,
  Calendar,
} from "lucide-react";

const Management = () => {
  const managementTeam = [
    {
      name: "George Maunganidze",
      position: "Head of Finance and HR",
      qualifications: "ACCA, Bachelor of Accountancy (UZ), MBA Candidate",
      experience: "Over 10 years in accounting and audit across multiple industries",
      specialties: "Accounting, Taxation, Corporate Advisory Services",
      personal: "Married with two daughters, avid reader, enjoys traveling",
      education: "University of Zimbabwe"
    },
    {
      name: "Nairgel Masiiwa",
      position: "Head of Sales Department",
      experience: "Seasoned sales professional with expertise in construction and architecture",
      specialties: "Revenue growth, building high-performing teams, real estate markets",
      achievements: "Consistently exceeded sales targets, solidified company's industry position",
      approach: "Passionate about innovative sales strategies and exceptional customer service"
    },
    {
      name: "Winnifilda Shadaya",
      position: "Head of Rentals",
      experience: "14+ years in Zimbabwean and South African real estate markets",
      specialties: "Exceptional negotiation skills, residential/commercial/industrial properties",
      network: "Extensive client and industry contacts throughout the region",
      reputation: "Trusted advisor known for navigating complex market conditions"
    },
    {
      name: "James Mudzikitiri",
      position: "Head of Marketing Executive",
      experience: "20+ years across business processes, manufacturing, insurance, FMCG",
      specialties: "Press and public relations, corporate affairs, strategic initiatives",
      competencies: "Project leadership, financial management, transformation programs",
      background: "Versatile professional with strategic and functional expertise"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-100 ">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-slate-800 to-slate-900 text-white pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Management Team</h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Experienced leaders dedicated to excellence in real estate and business operations
            </p>
          </motion.div>
        </div>
      </section>

      {/* Management Team */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {managementTeam.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 shadow-lg"
              >
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-12 h-12 text-slate-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">{member.name}</h2>
                  <p className="text-[#DCC471] font-semibold">{member.position}</p>
                </div>

                <div className="space-y-4">
                  {member.qualifications && (
                    <div className="flex items-start">
                      <Award className="w-5 h-5 text-[#DCC471] mr-3 mt-1 flex-shrink-0" />
                      <p className="text-slate-700">{member.qualifications}</p>
                    </div>
                  )}
                  
                  <div className="flex items-start">
                    <Briefcase className="w-5 h-5 text-[#DCC471] mr-3 mt-1 flex-shrink-0" />
                    <p className="text-slate-700">{member.experience}</p>
                  </div>
                  
                  {member.specialties && (
                    <div className="flex items-start">
                      <BookOpen className="w-5 h-5 text-[#DCC471] mr-3 mt-1 flex-shrink-0" />
                      <p className="text-slate-700"><strong>Specialties:</strong> {member.specialties}</p>
                    </div>
                  )}
                  
                  {member.achievements && (
                    <div className="flex items-start">
                      <Award className="w-5 h-5 text-[#DCC471] mr-3 mt-1 flex-shrink-0" />
                      <p className="text-slate-700"><strong>Achievements:</strong> {member.achievements}</p>
                    </div>
                  )}
                  
                  {member.approach && (
                    <div className="flex items-start">
                      <Heart className="w-5 h-5 text-[#DCC471] mr-3 mt-1 flex-shrink-0" />
                      <p className="text-slate-700"><strong>Approach:</strong> {member.approach}</p>
                    </div>
                  )}
                  
                  {member.personal && (
                    <div className="flex items-start">
                      <Users className="w-5 h-5 text-[#DCC471] mr-3 mt-1 flex-shrink-0" />
                      <p className="text-slate-700"><strong>Personal:</strong> {member.personal}</p>
                    </div>
                  )}
                  
                  {member.education && (
                    <div className="flex items-start">
                      <GraduationCap className="w-5 h-5 text-[#DCC471] mr-3 mt-1 flex-shrink-0" />
                      <p className="text-slate-700"><strong>Education:</strong> {member.education}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Get In Touch With Our Management</h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            Our leadership team is always available to discuss your real estate needs
          </p>
          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <div className="flex items-center">
              <Phone className="w-5 h-5 text-[#DCC471] mr-2" />
              <span>+263 772 329 569, +263 719 329 569</span>
            </div>
            <div className="flex items-center">
              <Mail className="w-5 h-5 text-[#DCC471] mr-2" />
              <a href="mailto:info@hsp.co.zw" className="text-[#DCC471] hover:text-yellow-300 transition">info@hsp.co.zw</a>
            </div>
          </div>
          <p className="mt-4 flex items-center justify-center">
            <MapPin className="w-4 h-4 mr-2" />
            21 Harare Drive, Borrowdale Harare
          </p>
        </div>
      </section>
    </div>
  );
};

export default Management;