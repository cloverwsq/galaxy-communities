/**
 * @responsibility Project Lead / Developer A
 * @description Landing Page & Entry Point for the Galaxy Experience.
 */
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation state
    let frame = 0;

    // Stars configuration
    const stars: Array<{ x: number; y: number; size: number; speed: number; opacity: number }> = [];
    for (let i = 0; i < 400; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.02 + 0.01,
        opacity: Math.random() * 0.5 + 0.3,
      });
    }

    // 4-point decorative stars
    const bigStars: Array<{ x: number; y: number; size: number; rotation: number; speed: number }> = [];
    for (let i = 0; i < 14; i++) {
      bigStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 15 + 10,
        rotation: Math.random() * Math.PI * 2,
        speed: (Math.random() - 0.5) * 0.003,
      });
    }

    // Orbiting planets - more variety in distance, size, and color
    const orbitPlanets: Array<{
      angle: number;
      distance: number;
      size: number;
      color: string;
      ringColor: string;
      speed: number;
    }> = [
      // Close orbit planets
      { angle: 0, distance: 250, size: 28, color: '#FFB6C1', ringColor: '#FFD1DC', speed: 0.00035 },
      { angle: Math.PI / 3, distance: 270, size: 32, color: '#E0BBE4', ringColor: '#F0DDF5', speed: 0.00032 },
      // Medium orbit planets
      { angle: Math.PI / 2, distance: 320, size: 38, color: '#B8A9E0', ringColor: '#D4C5F9', speed: 0.00028 },
      { angle: (2 * Math.PI) / 3, distance: 300, size: 35, color: '#9DB4E8', ringColor: '#C4D4F7', speed: 0.0003 },
      { angle: Math.PI, distance: 340, size: 42, color: '#7EB8E8', ringColor: '#AED4F7', speed: 0.00026 },
      { angle: (4 * Math.PI) / 3, distance: 310, size: 30, color: '#A7C7E7', ringColor: '#C9E4F7', speed: 0.00029 },
      // Far orbit planets
      { angle: (3 * Math.PI) / 2, distance: 380, size: 45, color: '#A89FDB', ringColor: '#C9C0F0', speed: 0.00022 },
      { angle: (5 * Math.PI) / 3, distance: 400, size: 36, color: '#DDA0DD', ringColor: '#F0C8F0', speed: 0.0002 },
      { angle: Math.PI / 6, distance: 420, size: 40, color: '#B19CD9', ringColor: '#D4BFEA', speed: 0.00018 },
      { angle: (7 * Math.PI) / 4, distance: 360, size: 33, color: '#8EABDD', ringColor: '#B8CBF2', speed: 0.00024 },
    ];

    // Shooting stars
    const shootingStars: Array<{
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      active: boolean;
    }> = [];
    for (let i = 0; i < 3; i++) {
      shootingStars.push({
        x: 0,
        y: 0,
        length: 0,
        speed: 0,
        angle: 0,
        active: false,
      });
    }

    const spawnShootingStar = (star: typeof shootingStars[0]) => {
      star.x = Math.random() * canvas.width;
      star.y = Math.random() * canvas.height * 0.5;
      star.length = Math.random() * 80 + 50;
      star.speed = Math.random() * 3 + 2;
      star.angle = Math.random() * Math.PI / 4 + Math.PI / 4;
      star.active = true;
    };

    // Draw 4-point star
    const draw4PointStar = (x: number, y: number, size: number, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.fillStyle = 'rgba(255, 248, 231, 0.9)';
      ctx.shadowBlur = 15;
      ctx.shadowColor = 'rgba(255, 248, 231, 0.8)';
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        const angle = (i * Math.PI) / 2;
        const outerX = Math.cos(angle) * size;
        const outerY = Math.sin(angle) * size;
        const innerAngle = angle + Math.PI / 4;
        const innerX = Math.cos(innerAngle) * (size * 0.3);
        const innerY = Math.sin(innerAngle) * (size * 0.3);
        if (i === 0) {
          ctx.moveTo(outerX, outerY);
        } else {
          ctx.lineTo(outerX, outerY);
        }
        ctx.lineTo(innerX, innerY);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    // Draw planet with ring
    const drawPlanet = (x: number, y: number, size: number, color: string, ringColor: string) => {
      // Ring behind
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(1, 0.3);
      ctx.strokeStyle = ringColor;
      ctx.lineWidth = 3;
      ctx.globalAlpha = 0.6;
      ctx.beginPath();
      ctx.arc(0, 0, size * 1.5, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Planet
      const gradient = ctx.createRadialGradient(x - size * 0.3, y - size * 0.3, 0, x, y, size);
      gradient.addColorStop(0, color + 'dd');
      gradient.addColorStop(0.6, color + '99');
      gradient.addColorStop(1, color + '55');
      ctx.fillStyle = gradient;
      ctx.shadowBlur = 20;
      ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();

      // Highlight
      const highlightGradient = ctx.createRadialGradient(x - size * 0.4, y - size * 0.4, 0, x, y, size);
      highlightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.5)');
      highlightGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.1)');
      highlightGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = highlightGradient;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    };

    // Animation loop
    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background gradient
      const bgGradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height) / 1.5
      );
      bgGradient.addColorStop(0, '#483D6F');
      bgGradient.addColorStop(0.35, '#2D2150');
      bgGradient.addColorStop(0.7, '#1B1230');
      bgGradient.addColorStop(1, '#0F0820');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Nebula clouds
      ctx.globalAlpha = 0.15;
      const nebula1 = ctx.createRadialGradient(canvas.width * 0.25, canvas.height * 0.3, 0, canvas.width * 0.25, canvas.height * 0.3, 300);
      nebula1.addColorStop(0, 'rgba(255, 150, 200, 0.6)');
      nebula1.addColorStop(1, 'transparent');
      ctx.fillStyle = nebula1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const nebula2 = ctx.createRadialGradient(canvas.width * 0.75, canvas.height * 0.65, 0, canvas.width * 0.75, canvas.height * 0.65, 250);
      nebula2.addColorStop(0, 'rgba(180, 150, 255, 0.5)');
      nebula2.addColorStop(1, 'transparent');
      ctx.fillStyle = nebula2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;

      // Light rays
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      ctx.globalCompositeOperation = 'lighter';
      for (let i = 0; i < 60; i++) {
        const angle = (i / 60) * Math.PI * 2;
        const colors = ['#FFB6E6', '#FFD682', '#9FD3FF', '#C4B5FD'];
        const color = colors[i % 4];
        const gradient = ctx.createLinearGradient(centerX, centerY, centerX + Math.cos(angle) * 1500, centerY + Math.sin(angle) * 1500);
        gradient.addColorStop(0, color + '88');
        gradient.addColorStop(0.3, color + '22');
        gradient.addColorStop(1, 'transparent');
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.15 + (i % 2) * 0.05;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + Math.cos(angle) * 1500, centerY + Math.sin(angle) * 1500);
        ctx.stroke();
      }
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;

      // Small stars
      stars.forEach((star) => {
        star.opacity += star.speed;
        if (star.opacity > 1 || star.opacity < 0.3) star.speed = -star.speed;
        ctx.fillStyle = `rgba(255, 248, 231, ${star.opacity})`;
        ctx.shadowBlur = 4;
        ctx.shadowColor = 'rgba(255, 248, 231, 0.6)';
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.shadowBlur = 0;

      // 4-point stars
      bigStars.forEach((star) => {
        star.rotation += star.speed;
        draw4PointStar(star.x, star.y, star.size, star.rotation);
      });

      // Shooting stars
      shootingStars.forEach((star) => {
        if (!star.active && Math.random() < 0.002) {
          spawnShootingStar(star);
        }
        if (star.active) {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.lineWidth = 2;
          ctx.shadowBlur = 10;
          ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
          ctx.beginPath();
          ctx.moveTo(star.x, star.y);
          ctx.lineTo(star.x - Math.cos(star.angle) * star.length, star.y - Math.sin(star.angle) * star.length);
          ctx.stroke();
          ctx.shadowBlur = 0;

          star.x += Math.cos(star.angle) * star.speed;
          star.y += Math.sin(star.angle) * star.speed;

          if (star.x > canvas.width || star.y > canvas.height) {
            star.active = false;
          }
        }
      });

      // Orbiting planets
      orbitPlanets.forEach((planet) => {
        planet.angle += planet.speed;
        const x = centerX + Math.cos(planet.angle) * planet.distance;
        const y = centerY + Math.sin(planet.angle) * planet.distance;
        drawPlanet(x, y, planet.size, planet.color, planet.ringColor);
      });

      // Central sun
      const sunSize = Math.min(canvas.width, canvas.height) * 0.32;
      const sunX = centerX;
      const sunY = centerY;

      // Outer glow
      const glowGradient = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunSize * 1.8);
      glowGradient.addColorStop(0, 'rgba(255, 235, 170, 0.4)');
      glowGradient.addColorStop(0.35, 'rgba(255, 220, 140, 0.25)');
      glowGradient.addColorStop(0.6, 'rgba(255, 200, 110, 0.12)');
      glowGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(sunX, sunY, sunSize * 1.8, 0, Math.PI * 2);
      ctx.fill();

      // Sun sphere
      const sunGradient = ctx.createRadialGradient(sunX - sunSize * 0.3, sunY - sunSize * 0.3, 0, sunX, sunY, sunSize);
      sunGradient.addColorStop(0, '#FFFEF8');
      sunGradient.addColorStop(0.2, '#FFF5D8');
      sunGradient.addColorStop(0.45, '#FFEBAD');
      sunGradient.addColorStop(0.7, '#FFD98A');
      sunGradient.addColorStop(1, '#FFC666');
      ctx.fillStyle = sunGradient;
      ctx.shadowBlur = 60;
      ctx.shadowColor = 'rgba(255, 235, 170, 0.8)';
      ctx.beginPath();
      ctx.arc(sunX, sunY, sunSize, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Highlight
      const highlightGradient = ctx.createRadialGradient(
        sunX - sunSize * 0.35,
        sunY - sunSize * 0.35,
        0,
        sunX,
        sunY,
        sunSize * 0.7
      );
      highlightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
      highlightGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.1)');
      highlightGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = highlightGradient;
      ctx.beginPath();
      ctx.arc(sunX, sunY, sunSize, 0, Math.PI * 2);
      ctx.fill();

      // Text on planet
      const baseFontSize = Math.min(canvas.width, canvas.height) * 0.09;
      ctx.font = `bold ${baseFontSize}px Arial, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowBlur = 20;
      ctx.shadowColor = 'rgba(255, 200, 120, 0.7)';
      ctx.fillText('Galaxy', sunX, sunY - baseFontSize * 0.55);
      ctx.fillText('Community', sunX, sunY + baseFontSize * 0.55);
      ctx.shadowBlur = 0;

      // Pulsing halo
      const haloOpacity = 0.3 + Math.sin(frame * 0.02) * 0.2;
      const haloScale = 1 + Math.sin(frame * 0.02) * 0.05;
      ctx.strokeStyle = `rgba(255, 240, 180, ${haloOpacity})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(sunX, sunY, sunSize * haloScale, 0, Math.PI * 2);
      ctx.stroke();

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [mounted]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/galaxy');
  };

  if (!mounted) return null;

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Canvas background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Glassmorphism Search Bar - positioned below center */}
      <form
        onSubmit={handleSearch}
        className="relative z-10"
        style={{
          width: 'min(75vw, 650px)',
          marginTop: 'min(28vw, 240px)',
        }}
      >
        <div
          className="relative flex items-center px-8 py-5 rounded-full"
          style={{
            background: 'rgba(255, 250, 255, 0.92)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            boxShadow:
              '0 8px 40px rgba(0, 0, 0, 0.15), 0 2px 8px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
            border: '1.5px solid rgba(255, 255, 255, 0.5)',
          }}
        >
          <Search className="flex-shrink-0 mr-4" size={26} strokeWidth={2} style={{ color: '#8B7BA8' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search your interest universe... (e.g., Bicycle)"
            className="flex-1 bg-transparent outline-none text-lg"
            style={{
              color: '#5A4A7A',
            }}
          />
        </div>
        <style jsx>{`
          input::placeholder {
            color: rgba(139, 123, 168, 0.65);
            font-weight: 400;
          }
        `}</style>
      </form>
    </main>
  );
}
