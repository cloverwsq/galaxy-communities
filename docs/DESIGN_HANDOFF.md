# 🎨 Visual Design & Resource Guide

This guide explains how to create and integrate the "Handmade" planetary designs into the Galaxy Communities website.

---

## 📐 Design Specifications
Each design should follow the "Cozy Cosmic" aesthetic: soft edges, tactile textures, and warm lighting.

### 1. The Matrix (20 Combinations)
You need to create a unique 3D component or texture set for each intersection:

| Color (5) | Texture Types (4) |
| :--- | :--- |
| **Peach** (#FFB7B2) | **Clay** (Smooth, subtle shine) |
| **Lavender** (#B28DFF) | **Moss** (Fuzzy, organic, bumpy) |
| **Mint** (#B2F2BB) | **Sand** (Grainy, matte, low detail) |
| **Sunny** (#FFEEAD) | **Lavender** (Swirly, artistic, glowing) |
| **Sky** (#AEC6CF) | |

### 2. Tools to Use
- **Spline / Three.js Editor**: Best for exporting JSX components directly.
- **Canva / Photoshop**: Use for creating the "Surface Map" (512x256 seamless textures).
- **Nano Banana**: If using for voxel-style or low-poly assets, export as `.gltf`.

---

## 🛠 How to Update the Website

### Step 1: Create the Component
Create a new file in `components/canvas/designs/`. Example: `SkySand.tsx`

```tsx
'use client';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';

export default function SkySand({ marbleTexture }) {
  return (
    <Sphere args={[1, 100, 100]}>
      <MeshDistortMaterial 
        color="#AEC6CF"
        map={marbleTexture}
        roughness={0.9} // Matte sand feel
        distort={0}     // Stable shape
      />
    </Sphere>
  );
}
```

### Step 2: Register the New Design
Open `components/canvas/designs/DesignRegistry.tsx` and follow these three sub-steps:

1.  **Import**: Add the dynamic import at the top:
    ```javascript
    const SkySand = dynamic(() => import('./SkySand'));
    ```
2.  **Map Color**: Ensure the hex code is in the `COLOR_MAP` (if it's a new color).
3.  **Add Switch Case**: Add the logic to the `switch` statement:
    ```javascript
    case 'SkySand':
      return <SkySand marbleTexture={marbleTexture} />;
    ```

---

## 🚀 Advanced: Using External Assets (GLTF/OBJ)
If you designed a complex planet in an external tool:
1.  Place the `.gltf` file in the `public/assets/` folder.
2.  In your design component, use the `useGLTF` hook from `@react-three/drei`:
    ```tsx
    import { useGLTF } from '@react-three/drei';
    
    export default function MyCustomPlanet() {
      const { scene } = useGLTF('/assets/planet-model.gltf');
      return <primitive object={scene} scale={1.5} />;
    }
    ```

---

## 📝 Checklist for Quality
- [ ] **Seamless**: If using a texture map, ensure there is no visible "seam" line.
- [ ] **Performance**: Keep sphere segments around 64-100 for a balance of smoothness and speed.
- [ ] **Cozy Factor**: Avoid harsh blacks or neon greens. Stick to the pastel/cream palette.
