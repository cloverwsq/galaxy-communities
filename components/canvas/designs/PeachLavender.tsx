import * as THREE from 'three';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';

interface PeachLavenderProps {
  marbleTexture?: THREE.Texture;
}

const PeachLavender = ({ marbleTexture }: PeachLavenderProps) => {
  return (
    <Sphere args={[1, 100, 100]}>
      <MeshDistortMaterial
        color="#FFB7B2"
        distort={0.3}
        roughness={0.2}
        speed={3.5}
        metalness={0}
        map={marbleTexture}
      />
    </Sphere>
  );
};

export default PeachLavender;