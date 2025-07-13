import { ButtonComponent } from 'obsidian';
import { MessageController } from '../../core/controller/messageController';
import { MessagesModel } from '../../core/messages/MessagesModel';

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
        this.messageController.updateView();
      });

  }
}
