import { Plugin } from 'obsidian';

export class StatusBarComponent {
  private statusBarEl: HTMLElement;
  private plugin: Plugin;

  constructor(plugin: Plugin) {
    this.plugin = plugin;
    this.statusBarEl = this.plugin.addStatusBarItem();
    this.statusBarEl.addClass('writer-status-bar');
    this.setStatus('Idle');
  }

  setStatus(status: string) {
    this.statusBarEl.setText(`Writer: ${status}`);
  }
}
