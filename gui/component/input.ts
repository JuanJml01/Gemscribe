import { TextAreaComponent } from 'obsidian';

export class InputComponent {
  private containerEl: HTMLElement;
  private textArea: TextAreaComponent;
  private onEnterCallback: (instruction: string) => void;

  constructor(containerEl: HTMLElement, onEnter: (instruction: string) => void) {
    this.containerEl = containerEl;
    this.onEnterCallback = onEnter;
    this.render();
  }

  private render() {
    this.textArea = new TextAreaComponent(this.containerEl)
      .setPlaceholder('Type your instruction here...')
      .setValue('')
      .onChange(value => {
        // Optional: handle input changes if needed
      });

    this.textArea.inputEl.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        const instruction = this.textArea.getValue();
        if (instruction.trim()) {
          this.onEnterCallback(instruction.trim());
          this.textArea.setValue('');
        }
      }
    });
  }

  setDisabled(disabled: boolean) {
    this.textArea.inputEl.disabled = disabled;
  }
}
