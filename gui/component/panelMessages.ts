import { ItemView, WorkspaceLeaf } from 'obsidian';
import { MessagesModel } from '../../core/messages/MessagesModel';
import { createMessageElement } from './messages';
import { InputComponent } from './input';
import { MessageController } from '../../core/controller/messageController';
import { ToolbarComponent } from './toolbar';

export const VIEW_TYPE_WRITER = 'writer-view';

export class WriterView extends ItemView {
  private messagesModel: MessagesModel;
  private messageController: MessageController;
  private messagesContainer: HTMLElement;
  private inputComponent: InputComponent;
  private loadingEl: HTMLElement;
  private errorBanner: HTMLElement;

  constructor(leaf: WorkspaceLeaf, messagesModel: MessagesModel, messageController: MessageController) {
    super(leaf);
    this.messagesModel = messagesModel;
    this.messageController = messageController;
  }

  getViewType() {
    return VIEW_TYPE_WRITER;
  }

  getDisplayText() {
    return 'Writer';
  }

  async onOpen() {
    const container = this.containerEl.children[1];
    container.empty();
    container.addClass('writer-view-container');

    this.errorBanner = container.createEl('div', { cls: 'writer-error-banner' });
    this.errorBanner.style.display = 'none';

    const toolbarContainer = container.createEl('div', { cls: 'writer-toolbar-container' });
    new ToolbarComponent(toolbarContainer, this.messageController, this.messagesModel);

    this.messagesContainer = container.createEl('div', { cls: 'writer-messages-container' });
    this.renderMessages();

    const inputContainer = container.createEl('div', { cls: 'writer-input-container' });
    this.inputComponent = new InputComponent(inputContainer, (instruction) => {
      this.messageController.sendUserInstruction(instruction);
    });

    this.loadingEl = container.createEl('div', { cls: 'writer-loading-spinner' });
    this.loadingEl.style.display = 'none';
    this.loadingEl.textContent = 'Loading...'; // Simple loader for now
  }

  renderMessages() {
    this.messagesContainer.empty();
    const messages = this.messagesModel.getMessages();
    messages.forEach(message => {
      this.messagesContainer.appendChild(createMessageElement(message));
    });
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight; // Scroll to bottom
  }

  setLoading(state: boolean) {
    this.loadingEl.style.display = state ? 'block' : 'none';
    this.inputComponent.setDisabled(state);
  }

  showError(message: string) {
    this.errorBanner.textContent = message;
    this.errorBanner.style.display = 'block';
  }

  clearError() {
    this.errorBanner.style.display = 'none';
    this.errorBanner.textContent = '';
  }
}
