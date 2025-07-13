import { ContentController } from './controller/contentController';

export const updateContent = async (
  contentController: ContentController,
  newContent: string
) => {
  await contentController.updateActiveFileContent(newContent);
};
