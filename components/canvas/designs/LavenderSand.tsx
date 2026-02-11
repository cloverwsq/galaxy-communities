import React from 'react';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface LavenderSandProps {
  marbleTexture?: THREE.Texture;
}

function LavenderSand({ marbleTexture }: LavenderSandProps) {
  return (
    <Sphere args={[1, 100, 100]}>
      <MeshDistortMaterial
        color="#B28DFF"
        distort={0}
        speed={0}
        roughness={1.0}
        metalness={0}
        map={marbleTexture || null}
      />
    </Sphere>
  );
}

export default LavenderSand;