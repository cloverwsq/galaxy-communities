'use client';

import React from 'react';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

/**
 * @design Lavender Moss
 */
export default function LavenderMoss({ marbleTexture }: { marbleTexture?: THREE.Texture }) {
  return (
    <Sphere args={[1, 100, 100]}>
      <MeshDistortMaterial 
        color="#B28DFF"
        map={marbleTexture}
        roughness={1.0}
        metalness={0.1}
        distort={0.4}
        speed={4}
      />
    </Sphere>
  );
}
