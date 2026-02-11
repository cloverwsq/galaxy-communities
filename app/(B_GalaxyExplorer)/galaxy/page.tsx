/**
 * @responsibility Developer B (Galaxy Explorer)
 * @description The main discovery view where all planet communities are listed.
 */

"use client";

import React, { useMemo, useState, useEffect, Suspense } from 'react';

import { useRouter } from 'next/navigation';

import Link from 'next/link';

import { motion, useTime, useTransform } from 'framer-motion';

import { Users, MapPin, PlusCircle, Loader2 } from 'lucide-react';

import PlanetPreview from '@/components/visuals/PlanetPreview';



export default function GalaxySearchPage() {

const router = useRouter();

const [mounted, setMounted] = useState(false);

const time = useTime();



useEffect(() => { setMounted(true); }, []);



// 1. 严格配置 8 个不同色彩和人数的星球

const planets = useMemo(() => {

const dStyles = [

{ name: "Urban Oasis", activity: "Rooftop Gardening", color: "#FFB7B2", hue: 0 },

{ name: "Midnight Echo", activity: "Night Coding", color: "#B2B7FF", hue: 240 },

{ name: "Analog Soul", activity: "Film Photography", color: "#FFEEAD", hue: 50 },

{ name: "Nomad Pulse", activity: "Digital Nomad", color: "#96E6B3", hue: 140 },

{ name: "Kindness Core", activity: "Neighborhood Help", color: "#FFD8BE", hue: 30 },

{ name: "Neon Valley", activity: "Cyberpunk Art", color: "#B2E2F2", hue: 190 },

{ name: "Silent Peak", activity: "Zen Meditation", color: "#A1887F", hue: 10 },

{ name: "Cloud Seven", activity: "Dream Journaling", color: "#D4A373", hue: 40 }

];



return dStyles.map((style, i) => {

const memberCount = Math.floor(Math.random() * 980) + 20; // 💡 人数调整：20-1000

return {

...style,

id: `p-${i}`,

members: memberCount,

radiusX: 280 + (i * 45),

radiusZ: 140 + (i * 20),

speed: 0.00007 - (i * 0.000004),

startAngle: (i / 8) * Math.PI * 2,

sizeScale: 0.75 + (memberCount / 1000) * 0.85, // 💡 大小随人数改变

};

});

}, []);



if (!mounted) return <div className="bg-black w-full h-screen" />;



return (

<main className="relative w-full h-screen overflow-hidden bg-black text-white">

<div className="absolute inset-0 z-0 bg-black" />



{/* 2. 3D 纵深轨道系统 */}

<div className="relative w-full h-full flex items-center justify-center z-10" style={{ perspective: '1200px' }}>

{planets.map((p) => (

<PlanetOrbitItem key={p.id} p={p} time={time} router={router} />

))}

</div>



<div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-50">

<Link href="/create">

<motion.button

whileHover={{ scale: 1.05, letterSpacing: '0.4em' }}

className="px-12 py-4 bg-[#FFB7B2] text-white rounded-full font-bold text-[11px] uppercase transition-all shadow-2xl"

>

<PlusCircle size={18} className="inline mr-2" />

Create Your Planet

</motion.button>

</Link>

</div>

</main>

);

}



function PlanetOrbitItem({ p, time, router }: any) {

const angle = useTransform(time, (t: number) => p.startAngle + t * p.speed);

const x = useTransform(angle, (a) => Math.cos(a) * p.radiusX);

const z = useTransform(angle, (a) => Math.sin(a) * p.radiusZ);


const zScale = useTransform(z, [-p.radiusZ, p.radiusZ], [0.8, 1.2]);

const zOpacity = useTransform(z, [-p.radiusZ, p.radiusZ], [0.5, 1]);



return (

<motion.div

className="absolute flex flex-col items-center group pointer-events-none"

style={{ x, z, scale: zScale, opacity: zOpacity, pointerEvents: 'auto' }}

>

{/* 💡 核心修复：添加 3D 光影遮罩，让它看起来是一个真实的球体 */}

<div

className="cursor-pointer relative rounded-full transition-transform duration-500 group-hover:scale-125 hover:z-50"

onClick={() => router.push(`/community/${p.id}`)}

style={{

width: `${85 * p.sizeScale}px`,

height: `${85 * p.sizeScale}px`,

// 物理裁剪

clipPath: 'circle(50% at 50% 50%)',

WebkitClipPath: 'circle(50% at 50% 50%)',

background: 'transparent',

filter: `hue-rotate(${p.hue}deg) drop-shadow(0 0 30px ${p.color}44)`

}}

>

{/* 1. 底层：自转的星球 3D 模型 */}

<motion.div

animate={{ rotate: 360 }}

transition={{ duration: 30, repeat: Infinity, ease: "linear" }}

className="w-full h-full relative z-0"

>

<Suspense fallback={<Loader2 className="animate-spin text-white/5 w-full h-full p-8" />}>

<PlanetPreview />

</Suspense>

</motion.div>



{/* 2. 💡 增强层：3D 球形光影罩（手动补齐高光和暗部阴影） */}

<div

className="absolute inset-0 z-10 pointer-events-none"

style={{

background: `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.2) 0%, transparent 50%),

radial-gradient(circle at 50% 50%, transparent 60%, rgba(0,0,0,0.6) 100%)`,

boxShadow: `inset -10px -10px 20px rgba(0,0,0,0.4), inset 10px 10px 20px rgba(255,255,255,0.1)`

}}

/>

</div>



<div className="mt-4 text-center px-4 py-1.5 bg-black/40 backdrop-blur-xl rounded-full border border-white/5 shadow-xl">

<p className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/80">{p.name}</p>

</div>



{/* 3. MVP: 半透明详细卡片 */}

<div className="absolute top-1/2 left-full ml-10 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 w-64 z-[9999] pointer-events-none text-left">

<div className="p-5 bg-black/80 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-2xl border-l-4" style={{ borderLeftColor: p.color }}>

<div className="flex items-center gap-2 mb-2">

<MapPin size={16} style={{ color: p.color }} />

<h4 className="text-[14px] font-bold text-white uppercase">{p.name}</h4>

</div>

<p className="text-[12px] text-white/80 leading-relaxed mb-4 italic font-light font-serif">

"Primary activity: <span style={{ color: p.color }} className="font-bold">{p.activity}</span>. Together we heal urban isolation."

</p>

<div className="flex items-center gap-2 pt-3 border-t border-white/10 text-[10px] font-bold text-white/40 uppercase tracking-widest">

<Users size={14} /> <span>{p.members} Citizens</span>

</div>

</div>

</div>

</motion.div>

);

}