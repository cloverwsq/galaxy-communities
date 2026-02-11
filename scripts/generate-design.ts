import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs';
import path from 'path';
import readline from 'readline';

/**
 * CLI Tool to generate "Cozy Cosmic" planet designs using Nano Banana (Gemini)
 * Usage: npx ts-node scripts/generate-design.ts [ColorName] [TextureType] [HexCode]
 */

const getApiKey = async (): Promise<string> => {
  if (process.env.GOOGLE_AI_STUDIO_API_KEY) {
    return process.env.GOOGLE_AI_STUDIO_API_KEY;
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question('🔑 Enter your Google AI Studio API Key: ', (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
};

async function generate(colorName: string, textureType: string, hex: string) {
  const apiKey = await getApiKey();
  
  if (!apiKey) {
    console.error("❌ Error: API Key is required.");
    process.exit(1);
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const componentName = `${colorName}${textureType.charAt(0).toUpperCase() + textureType.slice(1)}`;
  const filePath = path.join(process.cwd(), 'components', 'canvas', 'designs', `${componentName}.tsx`);

  console.log(`🌀 Generating design for ${componentName} (${hex})...`);

  const model = genAI.getGenerativeModel({ 
    model: "gemini-2.5-flash", // Updated to the latest "Nano Banana" Gemini 2.5 Flash model
    generationConfig: { temperature: 0.7 } 
  });

  const prompt = `
    Act as a React and Three.js expert. Generate a "Cozy Cosmic" planet component for a React Three Fiber project.
    
    Requirements:
    - Component Name: ${componentName}
    - Color: ${hex}
    - Texture Vibe: ${textureType}
    - Aesthetics: Handmade, soft, tactile, "Animal Crossing" style. 
    - Technical: Use <Sphere args={[1, 100, 100]}> and <MeshDistortMaterial /> from '@react-three/drei'.
    - Props: Should accept { marbleTexture }: { marbleTexture?: THREE.Texture }.
    - Export: Must include "export default ${componentName};" at the end.
    
    Return ONLY the valid TypeScript React code (.tsx). No markdown blocks, no explanations.
  `;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text().replace(/```tsx|```javascript|```/g, '').trim();

    fs.writeFileSync(filePath, text);
    console.log(`✅ Success! Component created at: ${filePath}`);
    console.log(`👉 Next step: Register "${componentName}" in DesignRegistry.tsx`);
  } catch (error: any) {
    if (error.status === 404) {
      console.error("❌ Model not found. Your API key might not have access to 'gemini-1.5-flash-latest'.");
      console.log("💡 Try changing the model name in scripts/generate-design.ts to 'gemini-1.5-flash' or 'gemini-pro'.");
    } else {
      console.error("❌ Generation failed:", error);
    }
  }
}

const [argColor, argTexture, argHex] = process.argv.slice(2);
if (!argColor || !argTexture || !argHex) {
  console.log("Usage: npx ts-node scripts/generate-design.ts [Color] [Texture] [Hex]");
  console.log("Example: npx ts-node scripts/generate-design.ts Lavender Sand #B28DFF");
} else {
  generate(argColor, argTexture, argHex);
}
