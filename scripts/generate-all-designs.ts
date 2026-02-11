import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs';
import path from 'path';
import readline from 'readline';

const COLORS = [
  { name: 'Peach', hex: '#FFB7B2' },
  { name: 'Lavender', hex: '#B28DFF' },
  { name: 'Mint', hex: '#B2F2BB' },
  { name: 'Sunny', hex: '#FFEEAD' },
  { name: 'Sky', hex: '#AEC6CF' },
];

const TEXTURES = [
  { 
    type: 'Clay', 
    spec: 'Smooth, subtle shine, slightly irregular hand-molded shape. Technical: low distort (0.1), medium roughness (0.3). Like wet pottery or play-dough.' 
  },
  { 
    type: 'Moss', 
    spec: 'Fuzzy, organic, very bumpy, "blobby". Technical: high distort (0.4), high roughness (0.9), slow speed (1). Like a soft hedge, felted wool, or a mossy rock.' 
  },
  { 
    type: 'Sand', 
    spec: 'Grainy, very matte, stable spherical shape. Technical: no distort (0), maximum roughness (1.0). Like a dry desert, fine sand, or a matte terracotta pot.' 
  },
  { 
    type: 'Lavender', 
    spec: 'Ethereal mist, soft aurora glow, gas-giant feel. Technical: medium distort (0.2), very low roughness (0.1), medium speed (1.5). Focus on smooth, overlapping gradients and a "subsurface" light effect. Should feel like a soft, floating cloud of color.' 
  }
];

const getApiKey = async (): Promise<string> => {
  if (process.env.GOOGLE_AI_STUDIO_API_KEY) return process.env.GOOGLE_AI_STUDIO_API_KEY;
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question('🔑 Enter your Google AI Studio API Key: ', (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
};

async function generateAll() {
  const apiKey = await getApiKey();
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ 
    model: "gemini-2.5-flash",
    generationConfig: { temperature: 0.4 } // Lower temperature for higher consistency
  });

  console.log(`🚀 Starting consistency-focused batch generation for ${COLORS.length * TEXTURES.length} designs...\n`);

  for (const texture of TEXTURES) {
    console.log(`--- 📦 Starting Texture Family: ${texture.type} ---`);
    for (const color of COLORS) {
      const componentName = `${color.name}${texture.type}`;
      const filePath = path.join(process.cwd(), 'components', 'canvas', 'designs', `${componentName}.tsx`);

      // Overwrite for consistency
      console.log(`🌀 Generating ${componentName} (${color.hex})...`);

      const prompt = `
        Act as a React and Three.js expert specializing in "Cozy Cosmic" aesthetics (think Animal Crossing or Sky: Children of the Light).
        
        You are creating a series of planets for the "${texture.type}" family. All planets in this family MUST be visually consistent in their tactile feel.
        
        Requirements for ${componentName}:
        - Component name: ${componentName}
        - Base Color: ${color.hex}
        - Texture Spec (MUST FOLLOW): ${texture.spec}
        - Technical: Use <Sphere args={[1, 100, 100]}> and <MeshDistortMaterial /> from '@react-three/drei'.
        - Props: Should accept { marbleTexture }: { marbleTexture?: THREE.Texture }.
        - Export: Must include "export default ${componentName};" at the end.
        
        Ensure the MeshDistortMaterial settings (distort, speed, roughness, metalness) strictly match the ${texture.type} spec to differentiate it from other surface types.
        
        Return ONLY valid TypeScript React code (.tsx). No markdown, no comments.
      `;

      try {
        const result = await model.generateContent(prompt);
        const text = result.response.text().replace(/```tsx|```javascript|```/g, '').trim();
        fs.writeFileSync(filePath, text);
        console.log(`✅ Created ${componentName}`);
      } catch (error) {
        console.error(`❌ Failed ${componentName}:`, error);
      }
      
      await new Promise(r => setTimeout(r, 1500)); // Slightly longer delay for stability
    }
  }

  console.log("\n✨ Consistency Batch complete!");
}

generateAll();
