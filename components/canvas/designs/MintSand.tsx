import React from 'react';
import * as THREE from 'three';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';

type MintSandProps = {
  marbleTexture?: THREE.Texture;
};

const MintSand: React.FC<MintSandProps> = ({ marbleTexture }) => {
  return (
    <Sphere args={[1, 100, 100]}>
      <MeshDistortMaterial
        color="#B2F2BB"
        distort={0}
        speed={0}
        roughness={1.0}
        metalness={0}
        map={marbleTexture}
      />
    </Sphere>
  );
};

export default MintSand;