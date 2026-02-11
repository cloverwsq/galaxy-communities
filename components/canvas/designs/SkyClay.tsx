import * as THREE from 'three';
import React from 'react';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';

interface SkyClayProps {
  marbleTexture?: THREE.Texture;
}

const SkyClay: React.FC<SkyClayProps> = ({ marbleTexture }) => {
  return (
    <Sphere args={[1, 100, 100]}>
      <MeshDistortMaterial
        color="#AEC6CF"
        distort={0.1}
        speed={1}
        roughness={0.3}
        metalness={0}
        map={marbleTexture || null}
      />
    </Sphere>
  );
};

export default SkyClay;