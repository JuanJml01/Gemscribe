import { GeminiClient } from './geminiClient';
import { buildPrompt } from './buildPrompt';
import { Settings } from '../types';

export const callGemini = async (
  content: string,
  instruction: string,
  settings: Settings
) => {
  const client = new GeminiClient(settings);
  const prompt = buildPrompt(content, instruction);
  const response = await client.generateContent(prompt);
  return response;
};
