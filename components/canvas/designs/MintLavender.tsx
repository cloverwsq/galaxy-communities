import * as THREE from 'three';
import React from 'react';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';

interface MintLavenderProps {
  marbleTexture?: THREE.Texture;
}

const MintLavender: React.FC<MintLavenderProps> = ({ marbleTexture }) => {
  return (
    <Sphere args={[1, 100, 100]}>
      <MeshDistortMaterial
        color="#B2F2BB"
        distort={0.3}
        speed={3.5}
        roughness={0.2}
        metalness={0}
        map={marbleTexture || null}
      />
    </Sphere>
  );
};

export default MintLavender;