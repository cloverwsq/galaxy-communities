'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Float, Stars, OrbitControls, ContactShadows, MeshDistortMaterial } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, DepthOfField } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useAppStore } from '@/store/useAppStore';
import DesignRegistry from '@/components/canvas/designs/DesignRegistry';

function CozyPlanet() {
  const groupRef = useRef<THREE.Group>(null);
  const { color, isPulsing, surfaceType, hasRings, hasMoons, rotationLevel } = useAppStore();

  // Convert friendly 0-10 level to 3D rotation speed
  const actualRotationSpeed = rotationLevel * 0.005;

  // Expert Trick: Creating a "Mist" texture procedurally
  const marbleTexture = useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const context = canvas.getContext('2d');
    if (context) {
      // 1. Fill base color
      context.fillStyle = '#ffffff';
      context.fillRect(0, 0, 512, 256);
      
      // 2. Add very soft, airy blobs to create a "Mist" or "Aurora" feel
      for (let i = 0; i < 30; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 256;
        const radius = 60 + Math.random() * 120;
        
        // Create radial gradients for soft edges
        const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
        // Use very low alpha ratios for a smoky, layered look
        const opacity = 0.05 + Math.random() * 0.1;
        gradient.addColorStop(0, `rgba(0, 0, 0, ${opacity})`);
        gradient.addColorStop(0.5, `rgba(128, 128, 128, ${opacity / 2})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        context.fillStyle = gradient;
        context.fillRect(0, 0, 512, 256);
      }
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += actualRotationSpeed;
      
      if (isPulsing) {
        const s = 1 + Math.sin(state.clock.getElapsedTime() * 1.5) * 0.02;
        groupRef.current.scale.set(s, s, s);
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* The Core Planet - Now Switched by DesignRegistry */}
      <DesignRegistry 
        color={color} 
        surfaceType={surfaceType} 
        marbleTexture={marbleTexture || undefined} 
      />

      {/* Atmospheric Glow */}
      <Sphere args={[1.15, 32, 32]}>
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.1}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>

      {/* Optional: Cozy Rings */}
      {hasRings && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.6, 0.03, 16, 100]} />
          <meshStandardMaterial color={color} transparent opacity={0.6} />
        </mesh>
      )}

      {/* Optional: Tiny Marshmallow Moons */}
      {hasMoons && (
        <group>
          <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <mesh position={[1.8, 0.3, 0]}>
              <sphereGeometry args={[0.12, 16, 16]} />
              <meshStandardMaterial 
                color="#FFF9F5" 
                roughness={1} 
                emissive="#FFF9F5" 
                emissiveIntensity={0.2} 
              />
            </mesh>
          </Float>
        </group>
      )}
    </group>
  );
}

/**
 * @description A persistent starry background with faint "neighbor" planets 
 * across the available color palette.
 */
function BackgroundGalaxy() {
  const PALETTE = ['#FFB7B2', '#B28DFF', '#B2F2BB', '#FFEEAD', '#AEC6CF'];
  
  // Generate a fixed set of background planets
  const backgroundPlanets = useMemo(() => {
    const planets = [];
    for (let i = 0; i < 30; i++) {
        const radius = 40 + Math.random() * 60;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        
        planets.push({
            position: [
                radius * Math.sin(phi) * Math.cos(theta),
                radius * Math.sin(phi) * Math.sin(theta),
                radius * Math.cos(phi)
            ] as [number, number, number],
            size: 0.8 + Math.random() * 2.5,
            // 💡 TWEAK: Increase these values to make background planets more visible
            opacity: 0.15 + Math.random() * 0.25, 
            color: PALETTE[Math.floor(Math.random() * PALETTE.length)]
        });
    }
    return planets;
  }, []);

  return (
    <group>
      <Stars 
        radius={200} 
        depth={50} 
        count={6000} 
        factor={5} 
        saturation={0} 
        fade={false} 
        speed={0.5} 
      />
      
      {/* Distant planets using random palette colors */}
      {backgroundPlanets.map((p, i) => (
        <mesh key={i} position={p.position}>
          <sphereGeometry args={[p.size, 16, 16]} />
          <meshBasicMaterial 
            color={p.color} 
            transparent 
            opacity={p.opacity} 
            depthWrite={false} 
          />
        </mesh>
      ))}

      {/* 💡 TWEAK: Lower the opacity here to make the overall space clearer/brighter */}
      <Sphere args={[190, 32, 32]}>
        <meshBasicMaterial 
          color="#120A08" 
          side={THREE.BackSide} 
          transparent 
          opacity={0.15} 
        />
      </Sphere>
    </group>
  );
}

export default function PlanetPreview() {
  return (
    <div className="w-full h-full cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 40 }} shadows>
        {/* Soft fill light from the front */}
        <ambientLight intensity={0.4} />
        
        {/* 💡 TWEAK: Brighten this hex code (e.g. #15100d) to make the space less pitch-black */}
        <color attach="background" args={['#110c0a']} /> 
        
        {/* The "Sun": A strong, warm directional light to create dramatic depth */}
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={2.8} 
          color="#FFF4E0"
          castShadow 
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0001}
        />

        {/* The "Backlight": A soft pinkish glow from the opposite side to highlight edges */}
        <pointLight position={[-5, -5, -5]} intensity={2.0} color="#FFE0F0" />

        {/* A soft "Rim Light" to pull the planet out of the dark background */}
        <spotLight position={[0, 10, 0]} intensity={1.5} angle={0.5} penumbra={1} color="#ffffff" />

        {/* 2. Drag Fix: We add damping (inertia) so the spin feels heavy and premium */}
        <OrbitControls 
          enablePan={false} 
          enableZoom={false} 
          rotateSpeed={0.8}
          enableDamping={true} // This adds the inertia "drift"
          dampingFactor={0.05} // How long it takes to stop
          makeDefault 
        />

        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.8}>
          <CozyPlanet />
        </Float>

        <BackgroundGalaxy />
        <ContactShadows position={[0, -1.5, 0]} opacity={0.3} scale={10} blur={2.5} far={4} />

        {/* Phase 4: Dreamy Post-Processing */}
        <EffectComposer enableNormalPass={false}>
          <Bloom 
            luminanceThreshold={0.2} 
            mipmapBlur 
            intensity={0.5} 
            radius={0.4} 
          />
          <DepthOfField 
            focusDistance={0} 
            focalLength={0.02} 
            bokehScale={1.0} // 💡 TWEAK: Lower means the background is sharper/clearer
            height={480} 
          />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

