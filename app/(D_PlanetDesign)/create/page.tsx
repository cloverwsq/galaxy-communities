/**
 * @responsibility Developer D (Planet Design)
 * @description Stage 1 of the planet creation flow. 
 * Allows users to customize the base planet visuals (Colors, Surface, Moons).
 */
'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import PlanetPreview from '@/components/visuals/PlanetPreview';
import PlanetCustomizerUI from '@/components/visuals/PlanetCustomizerUI_D';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Rocket, Heart, Sparkles } from 'lucide-react';

export default function CreatePlanetPage() {
  const { color } = useAppStore();
  const [isLaunching, setIsLaunching] = useState(false);
  const router = useRouter();

  const handleLaunch = () => {
    setIsLaunching(true);
    // Simulate "Launching" to the Galaxy
    setTimeout(() => {
      router.push('/create/customize');
    }, 2500);
  };

  return (
    <main className="relative flex h-screen w-full overflow-hidden bg-[#FFF9F5]">
      {/* 🚀 Launch Overlay */}
      <AnimatePresence>
        {isLaunching && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-50 bg-[#6D4C41] flex flex-col items-center justify-center text-white"
          >
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="mb-8"
            >
              <Rocket size={80} className="text-[#FFB7B2]" />
            </motion.div>
            <h2 className="text-4xl font-bold font-serif mb-2">Preparing for Launch...</h2>
            <p className="text-[#FFD8BE] animate-pulse">Your cozy home is joining the galaxy.</p>
            
            {/* Sparkle particles */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{ 
                  scale: [0, 1, 0],
                  x: (Math.random() - 0.5) * 400,
                  y: (Math.random() - 0.5) * 400,
                }}
                transition={{ repeat: Infinity, duration: 2, delay: i * 0.1 }}
                className="absolute"
              >
                <Sparkles className="text-[#FFEEAD]" size={24} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. The 3D Preview (65% of screen) */}
      <section className="relative h-full w-[65%]">
        <PlanetPreview />
      </section>

      {/* 2. The Cozy Customization Panel (35% of screen) */}
      <section className="h-full w-[35%] bg-white/80 backdrop-blur-xl border-l border-[#FFD8BE] p-8 flex flex-col shadow-[-10px_0_30px_rgba(255,183,178,0.1)]">
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="text-[#FFB7B2] fill-[#FFB7B2]" size={20} />
            <span className="text-xs font-bold text-[#D4A373] uppercase tracking-widest">Step 1: Outer Style</span>
          </div>
          <h1 className="text-4xl font-bold text-[#6D4C41] mb-2 font-serif">Create Your Home</h1>
          <p className="text-[#A1887F] italic text-sm">Every planet starts with a little bit of love.</p>
        </header>

        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
           <PlanetCustomizerUI />
        </div>

        <footer className="mt-8">
          <button 
            onClick={handleLaunch}
            className="w-full py-5 bg-[#FFB7B2] hover:bg-[#FF9AA2] text-white font-bold rounded-2xl transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-[#FFB7B2]/20 flex items-center justify-center gap-3 group"
          >
            Go to Decorations
            <motion.div
              whileHover={{ x: 5 }}
              className="transition-transform"
            >
              <Rocket size={20} className="group-hover:rotate-12 transition-transform" />
            </motion.div>
          </button>
        </footer>
      </section>
    </main>
  );
}
