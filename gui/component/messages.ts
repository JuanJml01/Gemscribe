import { Message } from '../../core/types';

export const createMessageElement = (
  message: Message,
  onMessageClick: (content: string) => void,
  onReplaceClick: (content: string) => void
): HTMLElement => {
  const el = document.createElement('div');
  el.addClass('writer-message');
  el.addClass(`writer-message-${message.role}`);

  const role = el.createEl('div', { cls: 'writer-message-role' });
  role.textContent = message.role;

  const content = el.createEl('div', { cls: 'writer-message-content' });
  content.textContent = message.content;

  el.addEventListener('click', () => onMessageClick(message.content));

  const replaceButton = el.createEl('button', { cls: 'writer-replace-button' });
  replaceButton.textContent = 'Replace'; // Or use an icon
  replaceButton.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent message click event from firing
    onReplaceClick(message.content);
  });

  return el;
};
