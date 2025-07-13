import { WriterView } from '../../gui/component/panelMessages';
import { StatusBarComponent } from '../../gui/component/statusBar';

export class UiController {
  private view: WriterView | null = null;
  private statusBar: StatusBarComponent;

  constructor(statusBar: StatusBarComponent) {
    this.statusBar = statusBar;
  }

  setView(view: WriterView) {
    this.view = view;
  }

  setLoading(loading: boolean) {
    if (this.view) {
      this.view.setLoading(loading);
    }
    this.statusBar.setStatus(loading ? 'Processing...' : 'Idle');
  }

  showError(message: string) {
    if (this.view) {
      this.view.showError(message);
    }
    this.statusBar.setStatus('Error');
  }

  clearError() {
    if (this.view) {
      this.view.clearError();
    }
    this.statusBar.setStatus('Idle');
  }

  renderMessages() {
    if (this.view) {
      this.view.renderMessages();
    }
  }
}
