export const buildPrompt = (content: string, instruction: string): string => {
  return `File content:\n\n${content}\n\nInstruction: ${instruction}`;
};
