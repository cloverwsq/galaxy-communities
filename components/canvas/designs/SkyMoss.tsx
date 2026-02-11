import * as THREE from 'three';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import React from 'react';

const SkyMoss = ({ marbleTexture }: { marbleTexture?: THREE.Texture }) => {
  return (
    <Sphere args={[1, 100, 100]}>
      <MeshDistortMaterial
        color="#AEC6CF"
        distort={0.4}
        speed={1}
        roughness={0.9}
        metalness={0}
        map={marbleTexture}
      />
    </Sphere>
  );
};

export default SkyMoss;