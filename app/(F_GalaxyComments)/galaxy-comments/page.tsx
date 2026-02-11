/**
 * @responsibility Developer F (Galaxy Comments)
 * @description Galaxy-wide floating comment bubbles (system events + user messages).
 *
 * Features:
 * - Floating bubbles (random drift/wobble)
 * - Drag bubbles to reposition (release to continue floating) ✅ FIXED (no getBoundingClientRect on null)
 * - Star dust + shooting stars canvas layer
 * - Tap bubble to open modal (dark glass + bright text)
 * - Bottom fixed input to post new comments
 *
 * Route: /galaxy/comments
 */
'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send, Sparkles, Users, X, ChevronDown } from 'lucide-react';

type CommentType = 'SYSTEM' | 'USER';

type GalaxyComment = {
  id: string;
  type: CommentType;
  author: string;
  content: string;
  timeLabel: string;
  accent?: string;
  likes: number;

  // bubble motion seeds + position
  xPct: number; // 0..100
  yPct: number; // 0..100
  floatDur: number; // seconds
  drift: number; // px drift
  wobble: number; // degrees
};

function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

function clamp(v: number, a: number, b: number) {
  return Math.max(a, Math.min(b, v));
}

function shortText(s: string, max = 68) {
  const t = s.trim();
  if (t.length <= max) return t;
  return t.slice(0, max - 1) + '…';
}

function makeBubble(
  partial: Omit<GalaxyComment, 'id' | 'xPct' | 'yPct' | 'floatDur' | 'drift' | 'wobble'>
): GalaxyComment {
  // keep bubbles inside a nice band
  const xPct = clamp(10 + Math.random() * 80, 8, 92);
  const yPct = clamp(18 + Math.random() * 62, 16, 86);
  const floatDur = 7 + Math.random() * 8; // 7..15s
  const drift = 22 + Math.random() * 28; // 22..50px
  const wobble = 2 + Math.random() * 3.5; // 2..5.5deg

  return { id: uid(), ...partial, xPct, yPct, floatDur, drift, wobble };
}

type ShootingStar = {
  x: number;
  y: number;
  len: number;
  speed: number;
  angle: number;
  life: number;
};

export default function GalaxyCommentsPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const [input, setInput] = useState('');
  const [activeId, setActiveId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [draggingId, setDraggingId] = useState<string | null>(null);

  // IMPORTANT: ref for immediate drag state (avoids click-block issues due to state timing)
  const isDraggingRef = useRef(false);

  const [comments, setComments] = useState<GalaxyComment[]>(() => [
    makeBubble({
      type: 'SYSTEM',
      author: 'System',
      content: '✨ “Food & Café” planet was founded. A cozy place for late-night suppers.',
      timeLabel: 'just now',
      accent: '#FFD682',
      likes: 24,
    }),
    makeBubble({
      type: 'USER',
      author: 'Nova_27',
      content: 'This is such a nice place. I felt less lonely after joining.',
      timeLabel: '3m ago',
      accent: '#FFB6E6',
      likes: 18,
    }),
    makeBubble({
      type: 'SYSTEM',
      author: 'System',
      content: '🚀 “Outdoor Activities” welcomed 30 new stars today. Say hi to someone new!',
      timeLabel: '10m ago',
      accent: '#7EB8E8',
      likes: 11,
    }),
    makeBubble({
      type: 'USER',
      author: 'StudyLamp',
      content: 'Anyone up for a Pomodoro circle later? Quiet company helps a lot.',
      timeLabel: '22m ago',
      accent: '#B19CD9',
      likes: 9,
    }),
    makeBubble({
      type: 'USER',
      author: 'MochiTrail',
      content: 'I joined for hiking but stayed for the wholesome vibes 🌙',
      timeLabel: '45m ago',
      accent: '#E0BBE4',
      likes: 14,
    }),
  ]);

  const active = useMemo(() => comments.find((c) => c.id === activeId) ?? null, [comments, activeId]);
  const onlineCount = useMemo(() => 57, []);

  // bubble field bounds ref (drag constraints)
  const fieldRef = useRef<HTMLDivElement>(null);

  // star dust / shooting stars canvas
  const fxCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => setMounted(true), []);

  // System pulse (glow)
  const [systemPulse, setSystemPulse] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setSystemPulse((x) => x + 1), 6500);
    return () => clearInterval(t);
  }, []);

  const toggleLike = (id: string) => {
    setComments((prev) => prev.map((c) => (c.id === id ? { ...c, likes: c.likes + 1 } : c)));
  };

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;

    const newC = makeBubble({
      type: 'USER',
      author: 'You',
      content: text,
      timeLabel: 'now',
      accent: '#FFB7B2',
      likes: 0,
    });

    setComments((prev) => [...prev, newC]);
    setInput('');
    setActiveId(newC.id);
  };

  // ✅ FIXED: commit drag based on framer-motion info.point (no DOM currentTarget needed)
  const commitDragToPercentByPoint = (id: string, clientX: number, clientY: number) => {
    const field = fieldRef.current;
    if (!field) return;

    const f = field.getBoundingClientRect();
    const xPct = clamp(((clientX - f.left) / f.width) * 100, 6, 94);
    const yPct = clamp(((clientY - f.top) / f.height) * 100, 10, 90);

    setComments((prev) => prev.map((c) => (c.id === id ? { ...c, xPct, yPct } : c)));
  };

  // ----------------------------
  // FX: star dust + shooting stars
  // ----------------------------
  useEffect(() => {
    if (!mounted) return;
    const canvas = fxCanvasRef.current;
    const host = fieldRef.current;
    if (!canvas || !host) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;

    const resize = () => {
      const rect = host.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const W = () => host.getBoundingClientRect().width;
    const H = () => host.getBoundingClientRect().height;

    const dust = Array.from({ length: 260 }).map(() => ({
      x: Math.random() * W(),
      y: Math.random() * H(),
      r: Math.random() * 1.6 + 0.2,
      tw: Math.random() * 0.02 + 0.004,
      a: Math.random() * 0.55 + 0.15,
      vx: (Math.random() - 0.5) * 0.08,
      vy: (Math.random() - 0.5) * 0.08,
    }));

    const shooting: ShootingStar[] = [];

    const spawnShooting = () => {
      const w = W();
      const h = H();
      shooting.push({
        x: Math.random() * w,
        y: Math.random() * h * 0.35,
        len: 70 + Math.random() * 90,
        speed: 3 + Math.random() * 3.5,
        angle: Math.random() * (Math.PI / 6) + Math.PI / 3, // ~60deg
        life: 0,
      });
    };

    let t = 0;
    const tick = () => {
      t += 1;
      ctx.clearRect(0, 0, W(), H());

      // dust
      for (const s of dust) {
        s.a += Math.sin(t * s.tw) * 0.006;
        s.a = clamp(s.a, 0.12, 0.9);

        s.x += s.vx;
        s.y += s.vy;
        if (s.x < -10) s.x = W() + 10;
        if (s.x > W() + 10) s.x = -10;
        if (s.y < -10) s.y = H() + 10;
        if (s.y > H() + 10) s.y = -10;

        ctx.fillStyle = `rgba(255, 248, 231, ${s.a})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // spawn shooting star occasionally
      if (Math.random() < 0.012) spawnShooting();

      // shooting stars
      for (let i = shooting.length - 1; i >= 0; i--) {
        const st = shooting[i];
        st.life += 1;

        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        ctx.strokeStyle = 'rgba(255,255,255,0.85)';
        ctx.lineWidth = 2;
        ctx.shadowBlur = 12;
        ctx.shadowColor = 'rgba(255,255,255,0.75)';
        ctx.beginPath();
        ctx.moveTo(st.x, st.y);
        ctx.lineTo(st.x - Math.cos(st.angle) * st.len, st.y - Math.sin(st.angle) * st.len);
        ctx.stroke();
        ctx.restore();

        st.x += Math.cos(st.angle) * st.speed;
        st.y += Math.sin(st.angle) * st.speed;

        if (st.x > W() + 200 || st.y > H() + 200 || st.life > 160) {
          shooting.splice(i, 1);
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#3B2D66_0%,#231A44_45%,#140E2E_75%,#0B071A_100%)]" />
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute -top-24 left-10 h-72 w-72 rounded-full bg-pink-300 blur-3xl opacity-30" />
        <div className="absolute top-56 right-10 h-72 w-72 rounded-full bg-violet-300 blur-3xl opacity-25" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-sky-300 blur-3xl opacity-20" />
      </div>

      {/* Top bar */}
      <header className="relative z-30 flex items-center justify-between px-6 py-5">
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2 text-white border border-white/15 backdrop-blur-md hover:bg-white/14 transition"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="flex items-center gap-3 rounded-2xl bg-white/12 px-5 py-2 border border-white/18 backdrop-blur-md text-white">
          <Sparkles size={18} className="opacity-90" />
          <div className="leading-tight">
            <p className="font-semibold">Galaxy Comment Wall</p>
            <p className="text-xs text-white/70">Drag bubbles. Tap to read.</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2 text-white border border-white/15 backdrop-blur-md">
          <Users size={16} className="opacity-80" />
          <span className="text-sm text-white/85">{onlineCount} online</span>
        </div>
      </header>

      {/* Bubble field */}
      <section className="relative z-10 mx-auto w-[min(1200px,96vw)]">
        <div className="px-6 pb-2 text-white/70 text-sm">
          Tip: Drag bubbles to rearrange your sky. Release to let them float again.
        </div>

        <div ref={fieldRef} className="relative h-[78vh]">
          {/* FX canvas layer (dust + meteors) */}
          <canvas ref={fxCanvasRef} className="absolute inset-0 pointer-events-none z-0" />

          {/* soft center glow */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl opacity-25 z-0" />

          {/* bubbles */}
          {comments.map((c, idx) => {
            const isSystem = c.type === 'SYSTEM';
            const isActive = c.id === activeId;
            const isDragging = c.id === draggingId;

            const bubbleW = isSystem ? 320 : 280;
            const bubbleMaxW = isSystem ? 'min(78vw, 360px)' : 'min(72vw, 320px)';
            const delay = (idx % 7) * 0.12;

            // float animation pauses while dragging
            const floatAnimate = isDragging
              ? {}
              : {
                  y: [0, -c.drift, 0],
                  x: [0, c.drift * 0.35, 0],
                  rotate: [0, c.wobble, 0],
                };

            return (
              <motion.div
                key={c.id}
                className="absolute z-10"
                style={{
                  left: `${c.xPct}%`,
                  top: `${c.yPct}%`,
                  transform: 'translate(-50%, -50%)',
                  width: bubbleW,
                  maxWidth: bubbleMaxW as any,
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: 1,
                  scale: isActive ? 1.03 : 1,
                  ...floatAnimate,
                }}
                transition={{
                  opacity: { duration: 0.6, delay },
                  scale: { duration: 0.25 },
                  ...(isDragging
                    ? {}
                    : {
                        y: { duration: c.floatDur, repeat: Infinity, ease: 'easeInOut', delay },
                        x: { duration: c.floatDur + 2.2, repeat: Infinity, ease: 'easeInOut', delay },
                        rotate: { duration: c.floatDur + 1.5, repeat: Infinity, ease: 'easeInOut', delay },
                      }),
                }}
                drag
                dragConstraints={fieldRef}
                dragElastic={0.12}
                onDragStart={() => {
                  isDraggingRef.current = true;
                  setDraggingId(c.id);
                }}
                onDragEnd={(event, info) => {
                  // always recover states first
                  isDraggingRef.current = false;
                  setDraggingId(null);

                  // ✅ no DOM currentTarget; use pointer point
                  commitDragToPercentByPoint(c.id, info.point.x, info.point.y);
                }}
              >
                <motion.button
                  type="button"
                  onClick={() => {
                    // prevent accidental click after drag
                    if (isDraggingRef.current) return;
                    setActiveId(c.id);
                  }}
                  className="w-full text-left"
                >
                  <motion.div
                    className={[
                      'rounded-[2rem] border backdrop-blur-md px-5 py-4 shadow-[0_20px_60px_rgba(0,0,0,0.28)]',
                      isSystem
                        ? 'bg-white/14 border-white/20'
                        : 'bg-white/10 border-white/16 hover:bg-white/12',
                      isActive ? 'ring-2 ring-white/30' : '',
                    ].join(' ')}
                    animate={
                      isSystem
                        ? {
                            boxShadow: [
                              '0 20px 60px rgba(0,0,0,0.28)',
                              `0 20px 70px ${c.accent ?? 'rgba(255,255,255,0.25)'}`,
                              '0 20px 60px rgba(0,0,0,0.28)',
                            ],
                          }
                        : {}
                    }
                    transition={
                      isSystem
                        ? { duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay: (systemPulse % 3) * 0.12 }
                        : undefined
                    }
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span
                          className="mt-1 h-3 w-3 rounded-full"
                          style={{ background: c.accent ?? 'rgba(255,255,255,0.8)' }}
                        />
                        <div className="leading-tight">
                          <p className="font-semibold text-white/95">
                            {c.author}
                            {isSystem && (
                              <span className="ml-2 text-xs rounded-full bg-white/12 border border-white/15 px-2 py-0.5 text-white/80">
                                SYSTEM
                              </span>
                            )}
                          </p>
                          <p className="text-xs text-white/65">{c.timeLabel}</p>
                        </div>
                      </div>

                      <div className="text-xs rounded-full bg-white/10 border border-white/15 px-3 py-1 text-white/80">
                        👍 {c.likes}
                      </div>
                    </div>

                    <p className="mt-3 text-sm text-white/90 leading-relaxed">
                      {expanded[c.id] ? c.content : shortText(c.content, isSystem ? 90 : 74)}
                    </p>

                    <div className="mt-3 flex items-center justify-between text-white/70">
                      <span className="text-xs">{isSystem ? 'Galaxy broadcast' : 'Community note'}</span>
                      <span className="text-xs flex items-center gap-1">
                        Tap to open <ChevronDown size={14} className="opacity-70" />
                      </span>
                    </div>
                  </motion.div>
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Active bubble modal (dark glass + bright text) */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center px-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveId(null)}
            />

            <motion.div
              className="relative w-[min(760px,92vw)] rounded-[2rem] bg-white/10 border border-white/18 backdrop-blur-xl shadow-[0_30px_90px_rgba(0,0,0,0.55)] p-6"
              initial={{ y: 18, scale: 0.98, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 18, scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.22 }}
            >
              <button
                className="absolute right-5 top-5 rounded-xl bg-white/10 hover:bg-white/15 p-2 text-white/90 transition"
                onClick={() => setActiveId(null)}
                aria-label="Close"
              >
                <X size={18} />
              </button>

              <div className="flex items-start justify-between gap-4 pr-10">
                <div className="flex items-start gap-3">
                  <span
                    className="mt-2 h-3.5 w-3.5 rounded-full"
                    style={{ background: active.accent ?? '#FFB7B2' }}
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-lg font-bold text-white">{active.author}</p>
                      {active.type === 'SYSTEM' && (
                        <span className="text-xs rounded-full bg-white/10 border border-white/18 px-2 py-0.5 text-white/90 font-semibold">
                          SYSTEM
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-white/70">{active.timeLabel}</p>
                  </div>
                </div>

                <button
                  onClick={() => toggleLike(active.id)}
                  className="rounded-2xl bg-white/90 px-4 py-2 font-bold text-[#1B1230] hover:bg-white transition"
                >
                  👍 Like ({active.likes})
                </button>
              </div>

              <p className="mt-5 text-white/90 leading-relaxed text-base">
                {active.content}
              </p>

              <div className="mt-5 flex items-center justify-between">
                <button
                  onClick={() => setExpanded((p) => ({ ...p, [active.id]: !p[active.id] }))}
                  className="text-sm font-semibold text-white/80 hover:text-white transition"
                >
                  {expanded[active.id] ? 'Collapse bubble preview' : 'Expand bubble preview'}
                </button>

                <span className="text-xs text-white/70">
                  Warm messages help people feel seen.
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom input (fixed) */}
      <footer className="fixed bottom-0 left-0 right-0 z-50">
        <div className="mx-auto w-[min(1200px,96vw)] pb-5">
          <div className="rounded-[1.8rem] bg-white/88 border border-white/50 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.25)] px-4 py-3">
            <div className="flex items-center gap-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSend();
                }}
                placeholder='Write a comment… (e.g., "This is a nice place!")'
                className="w-full bg-transparent outline-none text-[#5A4A7A] placeholder:text-[#8B7BA8]/70"
              />
              <button
                onClick={handleSend}
                className="flex items-center gap-2 rounded-2xl bg-[#6D4C41] px-4 py-2 font-bold text-white hover:opacity-95 transition"
              >
                <Send size={16} />
                Post
              </button>
            </div>

            <p className="mt-2 text-xs text-[#8B7BA8]">
              Be kind. Simple words can carry someone through a hard day.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
