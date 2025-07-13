import { Message } from '../../core/types';

export const createMessageElement = (message: Message): HTMLElement => {
  const el = document.createElement('div');
  el.addClass('writer-message');
  el.addClass(`writer-message-${message.role}`);

  const role = el.createEl('div', { cls: 'writer-message-role' });
  role.textContent = message.role;

  const content = el.createEl('div', { cls: 'writer-message-content' });
  content.textContent = message.content;

  return el;
};
