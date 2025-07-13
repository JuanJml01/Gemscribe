import { ButtonComponent } from 'obsidian';
import { MessageController } from '../../core/controller/messageController';
import { MessagesModel } from '../../core/messages/MessagesModel';
import { MessageParser } from '../../core/messages/MessageParser';

export class ToolbarComponent {
  private containerEl: HTMLElement;
  private messageController: MessageController;
  private messagesModel: MessagesModel;

  constructor(
    containerEl: HTMLElement,
    messageController: MessageController,
    messagesModel: MessagesModel
  ) {
    this.containerEl = containerEl;
    this.messageController = messageController;
    this.messagesModel = messagesModel;
    this.render();
  }

  private render() {
    new ButtonComponent(this.containerEl)
      .setButtonText('Clear Chat')
      .onClick(() => {
        this.messagesModel.clearMessages();
        // TODO: Trigger UI update
      });

    new ButtonComponent(this.containerEl)
      .setButtonText('Export Chat (Markdown)')
      .onClick(() => {
        const markdown = MessageParser.toMarkdown(this.messagesModel.getMessages());
        navigator.clipboard.writeText(markdown);
        // TODO: Show success message
      });

    new ButtonComponent(this.containerEl)
      .setButtonText('Export Chat (JSON)')
      .onClick(() => {
        const json = MessageParser.toJson(this.messagesModel.getMessages());
        navigator.clipboard.writeText(json);
        // TODO: Show success message
      });
  }
}
