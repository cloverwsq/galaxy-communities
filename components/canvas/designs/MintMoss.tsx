import * as THREE from 'three';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';

interface MintMossProps {
  marbleTexture?: THREE.Texture;
}

function MintMoss({ marbleTexture }: MintMossProps) {
  return (
    <Sphere args={[1, 100, 100]}>
      <MeshDistortMaterial
        color="#B2F2BB"
        distort={0.4}
        roughness={0.9}
        speed={1}
        metalness={0}
        map={marbleTexture || null}
      />
    </Sphere>
  );
}

export default MintMoss;