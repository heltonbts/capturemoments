// src/gemini.ts
import { GoogleGenAI } from '@google/genai';
import * as dotenv from 'dotenv';
dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function run() {
  const response = await ai.models.generateContent({
    model: 'gemini-1.5-flash', // ou 'gemini-1.5-pro' se quiser mais precisão
    contents: 'Me explique resumidamente o que é REST API com um exemplo.',
  });

  console.log('Resposta:', response.text);
}

run();
