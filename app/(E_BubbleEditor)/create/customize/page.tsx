'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import PlanetPreview from '@/components/visuals/PlanetPreview';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sparkles, Rocket, MessageSquare, Quote } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CustomizeLaunchPage() {
  const { color, setPlanetDescription } = useAppStore(); // Assuming setPlanetDescription exists in your store
  const [description, setDescription] = useState('');
  const [isLaunching, setIsLaunching] = useState(false);
  const router = useRouter();

  const handleFinalLaunch = () => {
    if (description.length < 10) return; // Basic validation
    
    // 1. Save the description to global store
    setPlanetDescription(description);
    
    // 2. Trigger launch animation
    setIsLaunching(true);
    
    // 3. Redirect to the main galaxy page after animation
    setTimeout(() => {
      router.push('/galaxy'); 
    }, 3000);
  };

  return (
    <main className="relative flex h-screen w-full overflow-hidden bg-[#FFF9F5]">
      {/* 🚀 Final Launch Animation Overlay */}
      <AnimatePresence>
        {isLaunching && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-[#6D4C41] flex flex-col items-center justify-center text-white"
          >
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Rocket size={80} className="text-[#FFB7B2] mb-6" />
            </motion.div>
            <h2 className="text-3xl font-serif font-bold mb-2">Joining the Constellations...</h2>
            <p className="text-[#D4A373]">Your community is finding its orbit.</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Back */}
      <Link href="/create" className="absolute top-8 left-8 z-10 flex items-center gap-2 text-[#D4A373] hover:text-[#6D4C41] transition-colors font-bold">
        <ArrowLeft size={20} /> Back to Style
      </Link>

      {/* Left: 3D Preview */}
      <section className="relative h-full w-[60%] border-r border-[#FFD8BE]">
        <PlanetPreview />
        
        {/* Floating Bubble Preview (Real-time) */}
        {description && (
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute top-1/4 right-20 bg-white/90 backdrop-blur-md p-6 rounded-[2rem] rounded-bl-none shadow-xl border border-[#FFB7B2] max-w-xs"
          >
            <Quote className="text-[#FFB7B2] mb-2" size={16} />
            <p className="text-[#6D4C41] text-sm italic line-clamp-4">{description}</p>
          </motion.div>
        )}

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-white/40 backdrop-blur-md px-6 py-2 rounded-full border border-white/50 text-[#6D4C41] text-sm font-medium">
          Step 2: Add Your Community Vibe
        </div>
      </section>

      {/* Right: The Description Editor */}
      <section className="h-full w-[40%] p-12 flex flex-col">
        <header className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="text-[#FFB7B2]" size={24} />
            <h1 className="text-4xl font-bold text-[#6D4C41] font-serif">Welcome Home</h1>
          </div>
          <p className="text-[#A1887F] text-lg">
            What makes your community special? Write a welcoming whisper for fellow explorers.
          </p>
        </header>

        <div className="flex-1 flex flex-col gap-6">
          <div className="relative flex-1">
            <div className="absolute top-4 left-4 text-[#FFB7B2]">
              <MessageSquare size={20} />
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell the galaxy about your community... (e.g., 'A cozy space for pixel art lovers to share their tiny masterpieces.')"
              className="w-full h-full p-10 pt-4 bg-white rounded-[2rem] border-2 border-[#FFD8BE] focus:border-[#FFB7B2] focus:ring-0 text-[#6D4C41] placeholder:text-[#D4A373]/50 resize-none transition-all shadow-inner font-medium"
            />
            <div className="absolute bottom-4 right-6 text-xs font-bold text-[#D4A373]">
              {description.length} characters
            </div>
          </div>
          
          <div className="bg-[#FFF0E5] p-4 rounded-2xl border border-[#FFD8BE]/50">
            <p className="text-xs text-[#A1887F]">
              <strong>Pro tip:</strong> Describe the "vibe" of your planet. This will appear as a floating bubble in the Galaxy view!
            </p>
          </div>
        </div>

        <footer className="mt-10">
          <button 
            onClick={handleFinalLaunch}
            disabled={description.length < 10}
            className={`w-full py-5 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 shadow-lg ${
              description.length >= 10 
              ? 'bg-[#FFB7B2] hover:bg-[#FF9AA2] text-white transform hover:scale-[1.02] active:scale-95 shadow-[#FFB7B2]/30' 
              : 'bg-[#6D4C41]/10 text-[#6D4C41]/30 cursor-not-allowed'
            }`}
          >
            <Rocket size={20} />
            Launch My Planet
          </button>
        </footer>
      </section>
    </main>
  );
}
