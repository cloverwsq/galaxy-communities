import * as THREE from 'three';
import React from 'react';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';

interface SunnyMossProps {
  marbleTexture?: THREE.Texture;
}

function SunnyMoss({ marbleTexture }: SunnyMossProps) {
  return (
    <Sphere args={[1, 100, 100]}>
      <MeshDistortMaterial
        color="#FFEEAD"
        distort={0.4}
        speed={1}
        roughness={0.9}
        metalness={0}
        map={marbleTexture || null}
      />
    </Sphere>
  );
}

export default SunnyMoss;