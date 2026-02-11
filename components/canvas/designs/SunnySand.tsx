import React from 'react';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface SunnySandProps {
  marbleTexture?: THREE.Texture;
}

const SunnySand: React.FC<SunnySandProps> = ({ marbleTexture }) => {
  return (
    <Sphere args={[1, 100, 100]}>
      <MeshDistortMaterial
        color="#FFEEAD"
        distort={0}
        speed={0}
        roughness={1.0}
        metalness={0}
        map={marbleTexture || null}
      />
    </Sphere>
  );
};

export default SunnySand;