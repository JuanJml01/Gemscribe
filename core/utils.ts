export const debounce = <T extends (...args: any[]) => any>(func: T, delay: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>): void => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

export const isValidApiKey = (apiKey: string): boolean => {
  return apiKey.trim().length > 0; // Basic validation
};
