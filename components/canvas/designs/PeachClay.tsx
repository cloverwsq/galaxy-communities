'use client';

import React from 'react';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

/**
 * @design Peach Clay
 * @description Smooth, clay-like texture in a soft peach hue.
 */
export default function PeachClay({ marbleTexture }: { marbleTexture?: THREE.Texture }) {
  return (
    <Sphere args={[1, 100, 100]}>
      <MeshDistortMaterial 
        color="#FFB7B2"
        map={marbleTexture}
        roughness={0.3}
        metalness={0.1}
        distort={0.05}
        speed={1}
      />
    </Sphere>
  );
}
