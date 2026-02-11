import * as THREE from 'three';
import React from 'react';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';

interface SkySandProps {
  marbleTexture?: THREE.Texture;
}

const SkySand: React.FC<SkySandProps> = ({ marbleTexture }) => {
  return (
    <Sphere args={[1, 100, 100]}>
      <MeshDistortMaterial
        color="#AEC6CF"
        distort={0}
        speed={0}
        roughness={1.0}
        metalness={0}
        map={marbleTexture || null}
      />
    </Sphere>
  );
};

export default SkySand;