export type Role = 'user' | 'assistant';

export interface Message {
  role: Role;
  content: string;
  timestamp: Date;
}

export interface Settings {
  apiKey: string;
  modelGemini: string;
}
