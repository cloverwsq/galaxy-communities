/**
 * @responsibility Developer B (Galaxy Explorer)
 * @description The main discovery view where all planet communities are listed.
 */

'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Users, MapPin, PlusCircle, Sparkles } from 'lucide-react';

export default function GalaxySearchPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Cute pastel planet palette + clean composition
  const planets = useMemo(() => {
    const dStyles = [
      { name: 'Urban Oasis', activity: 'Rooftop Gardening', from: '#DFF7D8', to: '#AEE5BF', glow: '#DBFFD8', blush: '#FFD2E2', top: '16%', left: '12%', size: 120, ring: true },
      { name: 'Midnight Echo', activity: 'Night Coding', from: '#D8E7FF', to: '#B7C8FF', glow: '#DBE7FF', blush: '#FFD8EE', top: '15%', left: '42%', size: 132 },
      { name: 'Analog Soul', activity: 'Film Photography', from: '#FFF1CC', to: '#FFDCA8', glow: '#FFF5D8', blush: '#FFD9C5', top: '19%', left: '72%', size: 114 },
      { name: 'Nomad Pulse', activity: 'Digital Nomad', from: '#D7FBF8', to: '#AFEDE4', glow: '#D8FFFA', blush: '#FFD5E7', top: '46%', left: '16%', size: 128 },
      { name: 'Kindness Core', activity: 'Neighborhood Help', from: '#FFE0F1', to: '#FFC4E1', glow: '#FFE3F3', blush: '#FFD3D3', top: '46%', left: '41%', size: 108, ring: true },
      { name: 'Neon Valley', activity: 'Cyberpunk Art', from: '#E8D8FF', to: '#CEB4FF', glow: '#E9DCFF', blush: '#FFD4ED', top: '43%', left: '70%', size: 124 },
      { name: 'Silent Peak', activity: 'Zen Meditation', from: '#DBEBFF', to: '#BDD9FF', glow: '#DCEBFF', blush: '#FFDCEB', top: '69%', left: '28%', size: 116 },
      { name: 'Cloud Seven', activity: 'Dream Journaling', from: '#FFE7F8', to: '#E9C9F5', glow: '#FFE9FA', blush: '#FFD9EA', top: '69%', left: '59%', size: 122 }
    ];

    return dStyles.map((style, i) => {
      const memberCount = Math.floor(Math.random() * 980) + 20;
      return {
        ...style,
        id: `p-${i}`,
        members: memberCount,
        tags: ['community', style.activity.toLowerCase().split(' ')[0], memberCount > 550 ? 'active' : 'growing']
      };
    });
  }, []);

  if (!mounted) return <div className="bg-[#100b24] w-full h-screen" />;

  return (
    <main className="relative w-full h-screen overflow-hidden bg-[#110b2a] text-white">
      <div className="absolute inset-0 z-0 bg-[linear-gradient(145deg,#130735_0%,#221255_48%,#372979_100%)]" />
      <div className="absolute inset-0 z-0 opacity-75 [background-image:radial-gradient(circle,rgba(255,255,255,0.9)_0.8px,transparent_1.2px)] [background-size:48px_48px]" />
      <div className="absolute inset-0 z-0 opacity-45 [background-image:radial-gradient(circle,rgba(255,255,255,0.95)_0.5px,transparent_1px)] [background-size:22px_22px]" />
      <div className="absolute inset-0 z-0 opacity-35 [background-image:repeating-radial-gradient(140%_100%_at_140%_40%,transparent_0_36px,rgba(185,174,255,0.18)_36px_38px,transparent_38px_72px)]" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_88%_8%,rgba(196,184,255,0.22),transparent_36%),radial-gradient(circle_at_18%_18%,rgba(158,154,255,0.18),transparent_40%)]" />

      <div className="pointer-events-none absolute left-[20%] top-[22%] z-0 h-8 w-8 bg-white/95 [clip-path:polygon(50%_0%,61%_39%,100%_50%,61%_61%,50%_100%,39%_61%,0%_50%,39%_39%)] [filter:drop-shadow(0_0_8px_rgba(255,255,255,0.85))]" />
      <div className="pointer-events-none absolute left-[12%] top-[52%] z-0 h-12 w-12 bg-white/95 [clip-path:polygon(50%_0%,61%_39%,100%_50%,61%_61%,50%_100%,39%_61%,0%_50%,39%_39%)] [filter:drop-shadow(0_0_10px_rgba(255,255,255,0.85))]" />
      <div className="pointer-events-none absolute left-[43%] top-[48%] z-0 h-7 w-7 bg-white/90 [clip-path:polygon(50%_0%,61%_39%,100%_50%,61%_61%,50%_100%,39%_61%,0%_50%,39%_39%)] [filter:drop-shadow(0_0_7px_rgba(255,255,255,0.8))]" />

      <div className="relative mx-auto h-full w-full max-w-[1400px] z-10 px-3 sm:px-6">
        {planets.map((p) => (
          <PlanetOrbitItem key={p.id} p={p} router={router} />
        ))}
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-50">
        <Link href="/create">
          <motion.button
            whileHover={{ scale: 1.05, letterSpacing: '0.3em' }}
            className="px-12 py-4 bg-[#FFB7D8] text-white rounded-full font-bold text-[11px] uppercase transition-all shadow-[0_10px_30px_rgba(255,170,220,0.35)]"
          >
            <PlusCircle size={18} className="inline mr-2" />
            Create Your Planet
          </motion.button>
        </Link>
      </div>
    </main>
  );
}

function PlanetOrbitItem({ p, router }: any) {
  return (
    <motion.div
      className="absolute group"
      style={{ top: p.top, left: p.left }}
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 6 + (p.members % 5), repeat: Infinity, ease: 'easeInOut', delay: (p.members % 7) * 0.2 }}
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className="relative cursor-pointer"
        onClick={() => router.push(`/community/${p.id}`)}
        aria-label={`Enter ${p.name}`}
      >
        <div
          className="relative rounded-full border-[3px] border-white/85 transition-all duration-300 group-hover:brightness-105"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: `radial-gradient(circle at 28% 26%, #fffdf7 0%, ${p.from} 42%, ${p.to} 100%)`,
            boxShadow: `0 8px 22px rgba(12, 7, 38, 0.22), 0 0 26px ${p.glow}88, 0 0 44px ${p.glow}55`
          }}
        >
          <div className="pointer-events-none absolute left-[18%] top-[16%] h-[22%] w-[32%] rotate-[-24deg] rounded-full bg-white/50" />
          <div
            className="pointer-events-none absolute right-[18%] bottom-[20%] h-[28%] w-[28%] rounded-full"
            style={{ background: `${p.blush}66` }}
          />
          <div className="pointer-events-none absolute left-[22%] top-[58%] h-3.5 w-3.5 rounded-full bg-white/25" />
          <div className="pointer-events-none absolute left-[42%] top-[68%] h-2.5 w-2.5 rounded-full bg-white/20" />
          <div className="pointer-events-none absolute right-[28%] top-[52%] h-2 w-2 rounded-full bg-white/25" />
        </div>

        {p.ring && (
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/65"
            style={{
              width: `${Math.round(p.size * 1.48)}px`,
              height: `${Math.round(p.size * 0.44)}px`,
              transform: 'translate(-50%, -50%) rotate(-16deg)',
              boxShadow: `0 0 12px ${p.glow}66`
            }}
          />
        )}

        <span className="pointer-events-none absolute -right-3 top-2 text-white/85">
          <Sparkles size={12} />
        </span>
        <span className="pointer-events-none absolute -left-3 bottom-6 text-white/70">
          <Sparkles size={10} />
        </span>
      </motion.button>

      <div className="pointer-events-none absolute top-1/2 left-full ml-4 sm:ml-6 -translate-y-1/2 w-[198px] sm:w-60 opacity-90 group-hover:opacity-100 transition-all duration-300 text-left">
        <div className="rounded-xl border border-white/35 bg-white/20 p-4 shadow-[0_8px_26px_rgba(16,9,39,0.25)] backdrop-blur-md">
          <div className="flex items-center gap-2 mb-2">
            <MapPin size={15} style={{ color: p.to }} />
            <h4 className="text-[13px] font-semibold text-white tracking-wide">{p.name}</h4>
          </div>
          <p className="text-[12px] text-white/90 leading-relaxed mb-3">
            Primary activity: <span className="font-semibold" style={{ color: p.from }}>{p.activity}</span>.
          </p>
          <div className="mb-3 flex flex-wrap gap-1.5">
            {p.tags.map((tag: string) => (
              <span
                key={tag}
                className="rounded-full border border-white/45 bg-white/40 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-[#4B3C7A]"
              >
                #{tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 pt-2 border-t border-white/35 text-[10px] font-semibold text-white/80 uppercase tracking-wider">
            <Users size={14} /> <span>{p.members} Citizens</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
