import { Message, Role } from '../types';

export class MessagesModel {
  private messages: Message[] = [];

  addMessage(role: Role, content: string): void {
    this.messages.push({
      role,
      content,
      timestamp: new Date(),
    });
  }

  getMessages(): Message[] {
    return this.messages;
  }

  clearMessages(): void {
    this.messages = [];
  }
}
