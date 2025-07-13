import { Message } from '../types';

export class MessageParser {
  static toMarkdown(messages: Message[]): string {
    return messages
      .map(msg => `**${msg.role}**: ${msg.content}`)
      .join('\n\n');
  }

  static toJson(messages: Message[]): string {
    return JSON.stringify(messages, null, 2);
  }
}
