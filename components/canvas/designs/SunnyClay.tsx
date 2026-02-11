import * as THREE from 'three';
import React from 'react';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';

type SunnyClayProps = {
  marbleTexture?: THREE.Texture;
};

const SunnyClay = ({ marbleTexture }: SunnyClayProps) => {
  return (
    <Sphere args={[1, 100, 100]}>
      <MeshDistortMaterial
        color="#FFEEAD"
        distort={0.1}
        speed={0.5}
        roughness={0.3}
        metalness={0}
        map={marbleTexture || null}
      />
    </Sphere>
  );
};

export default SunnyClay;