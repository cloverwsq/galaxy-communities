import React from 'react';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface PeachSandProps {
  marbleTexture?: THREE.Texture;
}

const PeachSand: React.FC<PeachSandProps> = ({ marbleTexture }) => {
  return (
    <Sphere args={[1, 100, 100]}>
      <MeshDistortMaterial
        color="#FFB7B2"
        distort={0}
        speed={0}
        roughness={1.0}
        metalness={0}
        map={marbleTexture || null}
      />
    </Sphere>
  );
};

export default PeachSand;