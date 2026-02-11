'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import * as THREE from 'three';

// --- PEACH DESIGNS ---
const PeachClay = dynamic(() => import('./PeachClay'));
const PeachMoss = dynamic(() => import('./PeachMoss'));
const PeachSand = dynamic(() => import('./PeachSand'));
const PeachLavender = dynamic(() => import('./PeachLavender'));

// --- LAVENDER DESIGNS ---
const LavenderClay = dynamic(() => import('./LavenderClay'));
const LavenderMoss = dynamic(() => import('./LavenderMoss'));
const LavenderSand = dynamic(() => import('./LavenderSand'));
const LavenderLavender = dynamic(() => import('./LavenderLavender'));

// --- MINT DESIGNS ---
const MintClay = dynamic(() => import('./MintClay'));
const MintMoss = dynamic(() => import('./MintMoss'));
const MintSand = dynamic(() => import('./MintSand'));
const MintLavender = dynamic(() => import('./MintLavender'));

// --- SUNNY DESIGNS ---
const SunnyClay = dynamic(() => import('./SunnyClay'));
const SunnyMoss = dynamic(() => import('./SunnyMoss'));
const SunnySand = dynamic(() => import('./SunnySand'));
const SunnyLavender = dynamic(() => import('./SunnyLavender'));

// --- SKY DESIGNS ---
const SkyClay = dynamic(() => import('./SkyClay'));
const SkyMoss = dynamic(() => import('./SkyMoss'));
const SkySand = dynamic(() => import('./SkySand'));
const SkyLavender = dynamic(() => import('./SkyLavender'));

// Mapping of color hex codes to friendly names
const COLOR_MAP: Record<string, string> = {
  '#FFB7B2': 'Peach',
  '#B28DFF': 'Lavender',
  '#B2F2BB': 'Mint',
  '#FFEEAD': 'Sunny',
  '#AEC6CF': 'Sky',
};

interface DesignRegistryProps {
  color: string;
  surfaceType: string;
  marbleTexture?: THREE.Texture;
}

/**
 * @responsibility Design Switcher
 * @description Logic to pick the correct "Handmade" canvas design based on state.
 */
export default function DesignRegistry({ color, surfaceType, marbleTexture }: DesignRegistryProps) {
  const colorName = COLOR_MAP[color] || 'Peach';
  const designKey = `${colorName}${surfaceType.charAt(0).toUpperCase() + surfaceType.slice(1)}`;

  // Switch logic for the components
  switch (designKey) {
    // PEACH
    case 'PeachClay': return <PeachClay marbleTexture={marbleTexture} />;
    case 'PeachMoss': return <PeachMoss marbleTexture={marbleTexture} />;
    case 'PeachSand': return <PeachSand marbleTexture={marbleTexture} />;
    case 'PeachLavender': return <PeachLavender marbleTexture={marbleTexture} />;

    // LAVENDER
    case 'LavenderClay': return <LavenderClay marbleTexture={marbleTexture} />;
    case 'LavenderMoss': return <LavenderMoss marbleTexture={marbleTexture} />;
    case 'LavenderSand': return <LavenderSand marbleTexture={marbleTexture} />;
    case 'LavenderLavender': return <LavenderLavender marbleTexture={marbleTexture} />;

    // MINT
    case 'MintClay': return <MintClay marbleTexture={marbleTexture} />;
    case 'MintMoss': return <MintMoss marbleTexture={marbleTexture} />;
    case 'MintSand': return <MintSand marbleTexture={marbleTexture} />;
    case 'MintLavender': return <MintLavender marbleTexture={marbleTexture} />;

    // SUNNY
    case 'SunnyClay': return <SunnyClay marbleTexture={marbleTexture} />;
    case 'SunnyMoss': return <SunnyMoss marbleTexture={marbleTexture} />;
    case 'SunnySand': return <SunnySand marbleTexture={marbleTexture} />;
    case 'SunnyLavender': return <SunnyLavender marbleTexture={marbleTexture} />;

    // SKY
    case 'SkyClay': return <SkyClay marbleTexture={marbleTexture} />;
    case 'SkyMoss': return <SkyMoss marbleTexture={marbleTexture} />;
    case 'SkySand': return <SkySand marbleTexture={marbleTexture} />;
    case 'SkyLavender': return <SkyLavender marbleTexture={marbleTexture} />;
    
    default:
      return (
        <mesh>
          <sphereGeometry args={[1, 64, 64]} />
          <meshStandardMaterial color={color} roughness={0.5} />
        </mesh>
      );
  }
}
