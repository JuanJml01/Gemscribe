export const buildPrompt = (content: string, instruction: string): string => {
  return `You are an AI assistant specialized in manipulating text notes. Your task is to process the provided note content based on the given instruction.

---
${content}
---

Instruction:
${instruction}

Your response must contain ONLY the manipulated note content or the direct result of the instruction. Absolutely no other text, explanations, or conversational elements are allowed.`;
};
