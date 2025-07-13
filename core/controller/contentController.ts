import { App, TFile, Vault } from 'obsidian';

export class ContentController {
  private app: App;
  private vault: Vault;

  constructor(app: App) {
    this.app = app;
    this.vault = app.vault;
  }

  async getActiveFileContent(): Promise<string | null> {
    const activeFile = this.getActiveFile();
    if (activeFile) {
      return this.vault.read(activeFile);
    }
    return null;
  }

  async updateActiveFileContent(newContent: string): Promise<void> {
    const activeFile = this.getActiveFile();
    if (activeFile) {
      await this.vault.modify(activeFile, newContent);
    }
  }

  private getActiveFile(): TFile | null {
    const activeFile = this.app.workspace.getActiveFile();
    return activeFile instanceof TFile ? activeFile : null;
  }
}
