import React from 'react';
import { Sphere } from '@react-three/drei';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface SkyLavenderProps {
  marbleTexture?: THREE.Texture;
}

function SkyLavender({ marbleTexture }: SkyLavenderProps) {
  return (
    <mesh>
      <Sphere args={[1, 100, 100]}>
        <MeshDistortMaterial
          color="#AEC6CF"
          distort={0.3}
          roughness={0.2}
          speed={3.5}
          metalness={0}
          map={marbleTexture || null}
        />
      </Sphere>
    </mesh>
  );
}

export default SkyLavender;