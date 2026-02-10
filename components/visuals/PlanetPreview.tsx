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

  // Expert Trick: Creating a "Marbling" texture procedurally
  const marbleTexture = useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const context = canvas.getContext('2d');
    if (context) {
      context.fillStyle = '#ffffff';
      context.fillRect(0, 0, 512, 256);
      for (let i = 0; i < 20; i++) {
        context.globalAlpha = 0.1;
        context.fillStyle = i % 2 === 0 ? '#000000' : '#ffffff';
        context.beginPath();
        context.arc(Math.random() * 512, Math.random() * 256, Math.random() * 100, 0, Math.PI * 2);
        context.fill();
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


export default function PlanetPreview() {
  return (
    <div className="w-full h-full cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 40 }} shadows>
        {/* Soft fill light from the front */}
        <ambientLight intensity={0.4} />
        
        {/* The "Sun": A strong, warm directional light to create dramatic depth */}
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={2.5} 
          color="#FFF4E0"
          castShadow 
        />

        {/* The "Backlight": A soft pinkish glow from the opposite side to highlight edges */}
        <pointLight position={[-5, -5, -5]} intensity={1.5} color="#FFE0F0" />

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

        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        <ContactShadows position={[0, -1.5, 0]} opacity={0.3} scale={10} blur={2.5} far={4} />

        {/* Phase 4: Dreamy Post-Processing */}
        <EffectComposer disableNormalPass>
          <Bloom 
            luminanceThreshold={0.2} 
            mipmapBlur 
            intensity={0.5} 
            radius={0.4} 
          />
          <DepthOfField 
            focusDistance={0} 
            focalLength={0.02} 
            bokehScale={2} 
            height={480} 
          />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

