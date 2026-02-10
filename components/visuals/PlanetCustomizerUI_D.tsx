'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { Sparkles, Flower, Moon, Wind, Heart } from 'lucide-react';

const COZY_COLORS = [
  { name: 'Peach', hex: '#FFB7B2' },
  { name: 'Lavender', hex: '#B28DFF' },
  { name: 'Mint', hex: '#B2F2BB' },
  { name: 'Sunny', hex: '#FFEEAD' },
  { name: 'Sky', hex: '#AEC6CF' },
];

type Tab = 'Ground' | 'Decor' | 'Mood';

export default function PlanetCustomizerUI() {
  const [activeTab, setActiveTab] = useState<Tab>('Ground');
  const { 
    color, setColor, 
    surfaceType, setSurfaceType, 
    hasRings, toggleRings, 
    hasMoons, toggleMoons,
    rotationLevel, setRotationLevel 
  } = useAppStore();

  const tabs: { id: Tab, icon: any }[] = [
    { id: 'Ground', icon: Flower },
    { id: 'Decor', icon: Moon },
    { id: 'Mood', icon: Wind }
  ];

  return (
    <div className="flex flex-col h-full">
      {/* 1. Cozy Tab Switcher */}
      <div className="flex p-1 bg-[#FFF0E5] rounded-2xl mb-8 border-2 border-[#FFD8BE]">
        {tabs.map(({ id, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-bold transition-all ${
              activeTab === id ? 'bg-white text-[#6D4C41] shadow-sm' : 'text-[#D4A373] hover:text-[#6D4C41]'
            }`}
          >
            <Icon size={16} /> {id}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="space-y-8 flex-1"
        >
          {/* GROUND TAB */}
          {activeTab === 'Ground' && (
            <>
              <section>
                <h3 className="text-xs font-bold text-[#D4A373] uppercase tracking-widest mb-4">Choose a Base Color</h3>
                <div className="flex flex-wrap gap-4">
                  {COZY_COLORS.map((c) => (
                    <motion.button
                      key={c.hex}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setColor(c.hex)}
                      className={`w-12 h-12 rounded-full border-4 transition-all ${
                        color === c.hex ? 'border-[#6D4C41] scale-110 shadow-lg' : 'border-white shadow-sm'
                      }`}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-xs font-bold text-[#D4A373] uppercase tracking-widest mb-4">Surface Texture</h3>
                <div className="grid grid-cols-2 gap-3">
                  {['clay', 'moss', 'sand', 'lavender'].map((type) => (
                    <motion.button
                      key={type}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSurfaceType(type as any)}
                      className={`py-4 rounded-2xl text-sm font-bold capitalize border-2 transition-all ${
                        surfaceType === type 
                        ? 'bg-[#6D4C41] border-[#6D4C41] text-white' 
                        : 'bg-white border-[#FFD8BE] text-[#6D4C41]'
                      }`}
                    >
                      {type}
                    </motion.button>
                  ))}
                </div>
              </section>
            </>
          )}

          {/* DECOR TAB */}
          {activeTab === 'Decor' && (
            <div className="space-y-4">
              <section className="p-5 bg-white rounded-3xl border-2 border-[#FFD8BE] flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-[#6D4C41]">Star Rings</h4>
                  <p className="text-xs text-[#A1887F]">Encircles your home with light</p>
                </div>
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleRings}
                  className={`w-14 h-8 rounded-full flex items-center px-1 transition-colors ${hasRings ? 'bg-[#FFB7B2]' : 'bg-[#D6D3D1]'}`}
                >
                  <motion.div 
                    animate={{ x: hasRings ? 24 : 0 }}
                    className="w-6 h-6 bg-white rounded-full shadow-md"
                  />
                </motion.button>
              </section>

              <section className="p-5 bg-white rounded-3xl border-2 border-[#FFD8BE] flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-[#6D4C41]">Marshmallow Moon</h4>
                  <p className="text-xs text-[#A1887F]">A tiny friend to watch over</p>
                </div>
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleMoons}
                  className={`w-14 h-8 rounded-full flex items-center px-1 transition-colors ${hasMoons ? 'bg-[#FFB7B2]' : 'bg-[#D6D3D1]'}`}
                >
                  <motion.div 
                    animate={{ x: hasMoons ? 24 : 0 }}
                    className="w-6 h-6 bg-white rounded-full shadow-md"
                  />
                </motion.button>
              </section>
            </div>
          )}

          {/* MOOD TAB */}
          {activeTab === 'Mood' && (
            <section className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xs font-bold text-[#D4A373] uppercase tracking-widest">Rotation Flow</h3>
                  <span className="text-xs font-bold text-[#6D4C41]">Level {rotationLevel}</span>
                </div>
                <input 
                  type="range"
                  min="0"
                  max="10"
                  step="1"
                  value={rotationLevel}
                  onChange={(e) => setRotationLevel(parseInt(e.target.value))}
                  className="w-full accent-[#FFB7B2] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#A1887F] mt-2 font-bold uppercase">
                  <span>Peaceful</span>
                  <span>Energetic</span>
                </div>
              </div>

              <div className="p-6 bg-[#FFF9F5] rounded-3xl border-2 border-[#FFD8BE] text-center">
                 <Heart className="mx-auto text-[#FFB7B2] mb-3 fill-[#FFB7B2]" size={32} />
                 <p className="text-sm font-bold text-[#6D4C41]">Your planet is happy!</p>
                 <p className="text-xs text-[#A1887F] mt-1">Updates are saved automatically.</p>
              </div>
            </section>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
