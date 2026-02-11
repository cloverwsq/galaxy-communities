import React from 'react';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const LavenderClay = ({ marbleTexture }: { marbleTexture?: THREE.Texture }) => {
  return (
    <Sphere args={[1, 100, 100]}>
      <MeshDistortMaterial
        color="#B28DFF"
        distort={0.1}
        speed={0}
        roughness={0.3}
        metalness={0}
        map={marbleTexture || null}
      />
    </Sphere>
  );
};

export default LavenderClay;