'use client';

import React from 'react';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

/**
 * @design Peach Moss
 * @description Fuzzy, organic moss-like texture in a soft peach hue.
 */
export default function PeachMoss({ marbleTexture }: { marbleTexture?: THREE.Texture }) {
  return (
    <Sphere args={[1, 100, 100]}>
      <MeshDistortMaterial 
        color="#FFB7B2"
        map={marbleTexture}
        roughness={1.0}
        metalness={0}
        distort={0.4}
        speed={4}
      />
    </Sphere>
  );
}
