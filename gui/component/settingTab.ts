import { App, PluginSettingTab, Setting } from 'obsidian';
import { WriterPlugin } from '../../writer';
import { GEMINI_MODELS } from '../../core/constants';

export class SettingTab extends PluginSettingTab {
  plugin: WriterPlugin;

  constructor(app: App, plugin: WriterPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;

    containerEl.empty();
    containerEl.addClass('writer-setting-tab');

    new Setting(containerEl)
      .setName('API Key')
      .setDesc('Your Google Gemini API key.')
      .addText(text =>
        text
          .setPlaceholder('Enter your API key')
          .setValue(this.plugin.settings.apiKey)
          .onChange(async value => {
            this.plugin.settings.apiKey = value;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName('Gemini Model')
      .setDesc('The Gemini model to use.')
      .addDropdown(dropdown =>
        dropdown
          .addOptions(Object.fromEntries(GEMINI_MODELS.map(model => [model, model])))
          .setValue(this.plugin.settings.modelGemini)
          .onChange(async value => {
            this.plugin.settings.modelGemini = value;
            await this.plugin.saveSettings();
          })
      );
  }
}
