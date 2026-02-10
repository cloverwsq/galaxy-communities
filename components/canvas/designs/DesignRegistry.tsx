'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import * as THREE from 'three';

// Import all designs dynamically for performance
const PeachClay = dynamic(() => import('./PeachClay'));
const PeachMoss = dynamic(() => import('./PeachMoss'));
const LavenderMoss = dynamic(() => import('./LavenderMoss'));
// ... other imports will go here

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
    case 'PeachClay':
      return <PeachClay marbleTexture={marbleTexture} />;
    case 'PeachMoss':
      return <PeachMoss marbleTexture={marbleTexture} />;
    case 'LavenderMoss':
      return <LavenderMoss marbleTexture={marbleTexture} />;
    
    // Fallback while you upload other designs
    default:
      return (
        <mesh>
          <sphereGeometry args={[1, 64, 64]} />
          <meshStandardMaterial color={color} roughness={0.5} />
        </mesh>
      );
  }
}
