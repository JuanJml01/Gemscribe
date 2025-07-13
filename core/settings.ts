import { Settings } from './types';
import { DEFAULT_SETTINGS } from './constants';

export const loadSettings = async (plugin: { loadData: () => any; saveData: (arg0: any) => any; }) => {
  return Object.assign({}, DEFAULT_SETTINGS, await plugin.loadData());
};

export const saveSettings = async (plugin: { saveData: (arg0: any) => any; }, settings: Settings) => {
  await plugin.saveData(settings);
};
