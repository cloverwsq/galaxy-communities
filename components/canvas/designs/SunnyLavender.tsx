import React from 'react';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface SunnyLavenderProps {
  marbleTexture?: THREE.Texture;
}

const SunnyLavender: React.FC<SunnyLavenderProps> = ({ marbleTexture }) => {
  return (
    <Sphere args={[1, 100, 100]}>
      <MeshDistortMaterial
        color="#FFEEAD"
        distort={0.3}
        roughness={0.2}
        metalness={0}
        speed={3.5}
        map={marbleTexture || null}
      />
    </Sphere>
  );
};

export default SunnyLavender;