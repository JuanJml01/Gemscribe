import { Settings } from '../types';
import { callGemini } from '../gemini/geminiCall';
import { ContentController } from './contentController';
import { MessagesModel } from '../messages/MessagesModel';
import { UiController } from './uiController';

export class MessageController {
  private settings: Settings;
  private contentController: ContentController;
  private messagesModel: MessagesModel;
  private uiController: UiController;

  constructor(
    settings: Settings,
    contentController: ContentController,
    messagesModel: MessagesModel,
    uiController: UiController
  ) {
    this.settings = settings;
    this.contentController = contentController;
    this.messagesModel = messagesModel;
    this.uiController = uiController;
  }

  async sendUserInstruction(instruction: string) {
    this.uiController.setLoading(true);
    this.messagesModel.addMessage('user', instruction);

    try {
      const content = await this.contentController.getActiveFileContent();
      if (content === null) {
        this.uiController.showError('No active file to process.');
        return;
      }

      const response = await callGemini(content, instruction, this.settings);
      const assistantResponse = response.text;

      if (assistantResponse === undefined) {
        this.uiController.showError('Failed to get a valid response from Gemini (response text was undefined).');
        return;
      }

      this.messagesModel.addMessage('assistant', assistantResponse);
      this.uiController.renderMessages(); // Update UI with new message
      await this.contentController.updateActiveFileContent(assistantResponse);
    } catch (error) {
      console.error(error);
      this.uiController.showError('Failed to get response from Gemini.');
    } finally {
      this.uiController.setLoading(false);
    }
  }

  rehydrateFromHistory() {
    // TODO: Implement
  }

  updateView() {
    this.uiController.renderMessages();
  }
}
