import React from 'react';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface MintClayProps {
  marbleTexture?: THREE.Texture;
}

const MintClay: React.FC<MintClayProps> = ({ marbleTexture }) => {
  return (
    <Sphere args={[1, 100, 100]}>
      <MeshDistortMaterial
        color="#B2F2BB"
        distort={0.1}
        speed={0.8}
        roughness={0.3}
        metalness={0.1}
        map={marbleTexture}
      />
    </Sphere>
  );
};

export default MintClay;