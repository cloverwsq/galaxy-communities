'use client';

import React from 'react';
import PlanetPreview from '@/components/visuals/PlanetPreview';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Bike, MapPin, Sparkles, Rocket, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function MockCommunityC() {
  const mockData = {
    name: "Velofemme Collective",
    location: "Singapore, East Coast",
    tags: ["Female Only", "Weekend Rides", "Beginners"],
    memberCount: 128,
    description: "A safe and empowering space designed for women to explore the city on two wheels. Whether you are a total beginner who just bought your first bike or a seasoned cyclist looking for a squad, you belong here. We gather every Saturday morning for coastal breezes, sweat, and post-ride coffee chats."
  };

  return (
    <main className="relative flex h-screen w-full overflow-hidden bg-[#FFF9F5]">
      
      {/* 1. Left: Floating Planet Preview */}
      <motion.section 
        className="absolute left-[-10%] top-0 w-[75%] h-full z-0 flex items-center justify-center"
        animate={{ 
          y: [0, -25, 0],
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        <div className="w-[800px] h-[800px] opacity-100">
           <PlanetPreview />
        </div>
      </motion.section>

      {/* 2. Top Navigation */}
      <Link href="/" className="absolute top-10 left-10 z-20 flex items-center gap-2 text-[#6D4C41] font-bold hover:opacity-70 transition-opacity">
        <ArrowLeft size={20} /> Back to Galaxy
      </Link>

      {/* 3. Right: Profile Block (Adjusted Size & English Content) */}
      <section className="relative z-10 w-full h-full flex items-center justify-end px-[6%]">
        
        {/* Sleeker Glass Panel */}
        <motion.div 
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md bg-white/75 backdrop-blur-2xl rounded-[3rem] border border-white shadow-[0_25px_50px_rgba(109,76,65,0.08)] p-10 flex flex-col h-[85vh] max-h-[700px]"
        >
          {/* Header */}
          <header className="mb-6">
            <div className="flex items-center gap-2 text-[#FFB7B2] mb-3">
              <Sparkles size={18} fill="#FFB7B2" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Planet Identity</span>
            </div>
            <h1 className="text-4xl font-serif font-bold text-[#6D4C41] leading-tight mb-4">
              {mockData.name}
            </h1>
            <div className="flex flex-wrap gap-2">
              {mockData.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-white/50 text-[#6D4C41] text-[10px] font-bold rounded-full border border-[#FFD8BE]">
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Description - Scrollable to prevent button overflow */}
          <div className="flex-1 overflow-y-auto pr-2 mb-6 custom-scrollbar space-y-6">
            <p className="text-[#6D4C41] text-lg leading-relaxed font-medium">
              {mockData.description}
            </p>
            
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center gap-3 text-[#A1887F] font-bold text-sm">
                <div className="w-8 h-8 rounded-full bg-[#FFF0E5] flex items-center justify-center text-[#FFB7B2]">
                  <MapPin size={16} />
                </div>
                <span>{mockData.location}</span>
              </div>
              <div className="flex items-center gap-3 text-[#A1887F] font-bold text-sm">
                <div className="w-8 h-8 rounded-full bg-[#FFF0E5] flex items-center justify-center text-[#FFB7B2]">
                  <Users size={16} />
                </div>
                <span>{mockData.memberCount} Explorers Joined</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#FFD8BE]/50 space-y-2">
               <div className="flex items-center gap-2 text-[#6D4C41] text-xs font-bold">
                  <CheckCircle2 size={14} className="text-[#FFB7B2]" /> 100% Female-Led
               </div>
               <div className="flex items-center gap-2 text-[#6D4C41] text-xs font-bold">
                  <CheckCircle2 size={14} className="text-[#FFB7B2]" /> Safe Space Verified
               </div>
            </div>
          </div>

          {/* Call to Action Button */}
          <footer className="mt-auto">
            <button className="group relative w-full py-5 bg-[#6D4C41] text-white font-bold rounded-2xl overflow-hidden transition-all hover:shadow-xl active:scale-95">
              <motion.div 
                className="absolute inset-0 bg-[#FFB7B2] translate-y-full group-hover:translate-y-0 transition-transform duration-500" 
              />
              <span className="relative z-10 flex items-center justify-center gap-3 text-base">
                <Rocket size={18} />
                Join this Community
              </span>
            </button>
          </footer>
        </motion.div>
      </section>

      {/* Decorative Branding */}
      <div className="absolute bottom-10 right-10 text-[#D4A373] text-[9px] font-black tracking-[0.4em] uppercase opacity-40">
        Galaxy Communities • Collective Orbit
      </div>
    </main>
  );
}