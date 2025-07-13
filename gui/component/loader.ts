export const createLoader = (): HTMLElement => {
  const loaderEl = document.createElement('div');
  loaderEl.addClass('writer-loader');
  loaderEl.textContent = 'Loading...'; // Simple text loader for now
  return loaderEl;
};
