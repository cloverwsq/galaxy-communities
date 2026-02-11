'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import PlanetPreview from '@/components/visuals/PlanetPreview';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Users, MapPin, Sparkles, Rocket, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function CommunityDetailPage() {
  const params = useParams();
  const router = useRouter();
  
  // 1. Hook into the Global Store for shared data
  const { color, description } = useAppStore();
  
  const [isJoining, setIsJoining] = useState(false);

  // 2. Logic to determine which data to show
  // If the ID matches 'my-planet', show store data. Otherwise, show mock data.
  const isMyPlanet = params.id === 'my-planet';
  
  const displayData = {
    name: isMyPlanet ? "My New Colony" : "Velofemme Collective",
    location: isMyPlanet ? "Unknown Nebula" : "Singapore, East Coast",
    tags: isMyPlanet ? ["New", "Custom"] : ["Female Only", "Weekend Rides"],
    memberCount: isMyPlanet ? 1 : 128,
    description: isMyPlanet && description ? description : "A safe and empowering space designed for women to explore the city on two wheels."
  };

  const handleJoin = () => {
    setIsJoining(true);
    // Simulate landing logic
    setTimeout(() => {
      // Navigate to Page A-1 (Main Galaxy with Highlight)
      router.push('/?joined=' + params.id);
    }, 2000);
  };

  return (
    <main className="relative flex h-screen w-full overflow-hidden bg-[#FFF9F5]">
      
      {/* 🚀 Landing Overlay Animation */}
      <AnimatePresence>
        {isJoining && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-50 bg-[#6D4C41] flex flex-col items-center justify-center text-white"
          >
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity }}>
              <Rocket size={60} className="text-[#FFB7B2] mb-4" />
            </motion.div>
            <h2 className="text-2xl font-serif">Landing on {displayData.name}...</h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Left: The Planet (Using Global Color) */}
      <motion.section 
        className="absolute left-[-15%] top-0 w-[75%] h-full z-0 flex items-center justify-center"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-[700px] h-[700px]">
           {/* PlanetPreview will automatically use the 'color' from useAppStore */}
           <PlanetPreview />
        </div>
      </motion.section>

      {/* Top Navigation */}
      <button 
        onClick={() => router.back()} 
        className="absolute top-10 left-10 z-20 flex items-center gap-2 text-[#6D4C41] font-bold hover:opacity-70 transition-opacity"
      >
        <ArrowLeft size={20} /> Back
      </button>

      {/* 4. Right: Profile Block */}
      <section className="relative z-10 w-full h-full flex items-center justify-end px-[6%]">
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md bg-white/75 backdrop-blur-2xl rounded-[3rem] border border-white shadow-[0_25px_50px_rgba(109,76,65,0.08)] p-10 flex flex-col h-[85vh] max-h-[700px]"
        >
          <header className="mb-6">
            <div className="flex items-center gap-2 text-[#FFB7B2] mb-3">
              <Sparkles size={18} fill="#FFB7B2" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Community Profile</span>
            </div>
            <h1 className="text-4xl font-serif font-bold text-[#6D4C41] leading-tight mb-4">
              {displayData.name}
            </h1>
            <div className="flex flex-wrap gap-2">
              {displayData.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-white/50 text-[#6D4C41] text-[10px] font-bold rounded-full border border-[#FFD8BE]">
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div className="flex-1 overflow-y-auto pr-2 mb-6 custom-scrollbar space-y-6">
            <p className="text-[#6D4C41] text-lg leading-relaxed font-medium">
              {displayData.description}
            </p>
            
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center gap-3 text-[#A1887F] font-bold text-sm">
                <div className="w-8 h-8 rounded-full bg-[#FFF0E5] flex items-center justify-center text-[#FFB7B2]">
                  <MapPin size={16} />
                </div>
                <span>{displayData.location}</span>
              </div>
              <div className="flex items-center gap-3 text-[#A1887F] font-bold text-sm">
                <div className="w-8 h-8 rounded-full bg-[#FFF0E5] flex items-center justify-center text-[#FFB7B2]">
                  <Users size={16} />
                </div>
                <span>{displayData.memberCount} Explorers</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#FFD8BE]/50 space-y-2 text-[#6D4C41] text-xs font-bold">
               <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#FFB7B2]" /> Active Constellation
               </div>
               <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#FFB7B2]" /> Community Verified
               </div>
            </div>
          </div>

          <footer className="mt-auto">
            <button 
              onClick={handleJoin}
              className="group relative w-full py-5 bg-[#6D4C41] text-white font-bold rounded-2xl overflow-hidden transition-all hover:shadow-xl active:scale-95"
            >
              <motion.div className="absolute inset-0 bg-[#FFB7B2] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative z-10 flex items-center justify-center gap-3 text-base">
                <Rocket size={18} />
                Join this Planet
              </span>
            </button>
          </footer>
        </motion.div>
      </section>
    </main>
  );
}
