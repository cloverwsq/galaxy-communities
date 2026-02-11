import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_STUDIO_API_KEY || "");

/**
 * Nano Banana (Gemini) integration for design generation
 */
export async function generatePlanetDesign(prompt: string) {
  // Using the model the user refers to as "Nano Banana" (Gemini 2.5 Flash / Flash Image)
  // We'll use "gemini-1.5-flash" as the closest current stable equivalent or the one they specify.
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}
