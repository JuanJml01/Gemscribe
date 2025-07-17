import { Plugin } from 'obsidian';
import { SettingTab } from './gui/component/settingTab';
import { Settings } from './core/types';
import { loadSettings, saveSettings } from './core/settings';
import { WriterView, VIEW_TYPE_WRITER } from './gui/component/panelMessages';
import { MessageController } from './core/controller/messageController';
import { ContentController } from './core/controller/contentController';
import { UiController } from './core/controller/uiController';
import { MessagesModel } from './core/messages/MessagesModel';
import { StatusBarComponent } from './gui/component/statusBar';

export default class MyPlugin extends Plugin {
  settings: Settings;
  messageController: MessageController;
  uiController: UiController;
  contentController: ContentController;
  messagesModel: MessagesModel;
  statusBar: StatusBarComponent;

  async onload() {
    this.settings = await loadSettings(this);
    try {
      const cssContent = await this.app.vault.adapter.read(this.manifest.dir + "/styles.css");
      this.app.workspace.containerEl.createEl('style', { text: cssContent });
    } catch (e) {
      console.error("Failed to load styles.css:", e);
    }

    this.messagesModel = new MessagesModel();
    this.contentController = new ContentController(this.app);
    this.statusBar = new StatusBarComponent(this);
    this.uiController = new UiController(this.statusBar);
    this.messageController = new MessageController(
      this.settings,
      this.contentController,
      this.messagesModel,
      this.uiController
    );

    this.registerView(
      VIEW_TYPE_WRITER,
      (leaf) => {
        const view = new WriterView(leaf, this.messagesModel, this.messageController, this.contentController);
        this.uiController.setView(view);
        return view;
      }
    );

    this.addRibbonIcon('pencil', 'Open Writer', () => {
      this.activateView();
    });

    this.addSettingTab(new SettingTab(this.app, this));
  }

  async onunload() {
    await saveSettings(this, this.settings);
  }

  async saveSettings() {
    await saveSettings(this, this.settings);
  }

  async activateView() {
    this.app.workspace.detachLeavesOfType(VIEW_TYPE_WRITER);

    const rightLeaf = this.app.workspace.getRightLeaf(false);
    if (rightLeaf) {
      await rightLeaf.setViewState({
        type: VIEW_TYPE_WRITER,
        active: true,
      });
    }

    const leaves = this.app.workspace.getLeavesOfType(VIEW_TYPE_WRITER);
    if (leaves.length > 0) {
      this.app.workspace.revealLeaf(leaves[0]);
    }
  }
}
