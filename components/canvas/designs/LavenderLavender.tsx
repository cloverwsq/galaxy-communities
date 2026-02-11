import React from 'react';
import * as THREE from 'three';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';

type LavenderLavenderProps = {
  marbleTexture?: THREE.Texture;
};

function LavenderLavender({ marbleTexture }: LavenderLavenderProps) {
  return (
    <Sphere args={[1, 100, 100]}>
      <MeshDistortMaterial
        color="#B28DFF"
        distort={0.3}
        roughness={0.2}
        speed={3.5}
        map={marbleTexture || null}
      />
    </Sphere>
  );
}

export default LavenderLavender;