/**
 * @responsibility Developer E (Bubble Editor)
 * @description Stage 2 of the planet creation flow.
 * Allows users to add specific interaction "bubbles" or details.
 */
'use client';

import React from 'react';
import { useAppStore } from '@/store/useAppStore';
import PlanetPreview from '@/components/visuals/PlanetPreview';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, Send } from 'lucide-react';
import Link from 'next/link';

export default function CustomizeLaunchPage() {
  const { color } = useAppStore();

  return (
    <main className="relative flex h-screen w-full overflow-hidden bg-[#FFF9F5]">
      {/* Navigation Back */}
      <Link href="/create" className="absolute top-8 left-8 z-10 flex items-center gap-2 text-[#D4A373] hover:text-[#6D4C41] transition-colors font-bold">
        <ArrowLeft size={20} /> Back to Style
      </Link>

      {/* Left: Enhanced 3D Preview */}
      <section className="relative h-full w-[60%] border-r border-[#FFD8BE]">
        <PlanetPreview />
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-white/40 backdrop-blur-md px-6 py-2 rounded-full border border-white/50 text-[#6D4C41] text-sm font-medium">
          Step 2: Add Your Community Vibe
        </div>
      </section>

      {/* Right: The Bubble Editor / Launch Panel */}
      <section className="h-full w-[40%] p-12 flex flex-col justify-center">
        <header className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="text-[#FFB7B2]" size={24} />
            <h1 className="text-4xl font-bold text-[#6D4C41] font-serif">Welcome Home</h1>
          </div>
          <p className="text-[#A1887F] text-lg leading-relaxed">
            Your planet looks beautiful! Now, imagine the voices of your community 
            floating around it like warm whispers.
          </p>
        </header>

        {/* Placeholder for the next developer's bubble editor */}
        <div className="flex-1 space-y-6">
           <div className="p-8 bg-white rounded-[2rem] border-2 border-dashed border-[#FFD8BE] flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-[#FFF0E5] rounded-full flex items-center justify-center mb-4">
                <Send className="text-[#FFB7B2]" />
              </div>
              <p className="text-[#D4A373] font-bold">Bubble Editor Space</p>
              <p className="text-[#A1887F] text-sm max-w-[200px] mt-2">
                This area belongs to Developer E. Your planet is ready for them!
              </p>
           </div>
        </div>

        <footer className="mt-12">
          <button className="w-full py-5 bg-[#6D4C41] text-white font-bold rounded-2xl opacity-50 cursor-not-allowed flex items-center justify-center gap-3">
            Wait for Community Launch
          </button>
        </footer>
      </section>
    </main>
  );
}
