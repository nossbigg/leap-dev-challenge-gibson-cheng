import { v4 as uuidv4 } from 'uuid';
import { promptsTable } from 'src/db/schema/prompts';
import { PromptEntity } from './prompts.entity';
import { pgDb } from 'src/db/constants';

export const createPrompt = async (
  title: string,
  content: string,
): Promise<PromptEntity> => {
  const newItem = {
    id: uuidv4(),
    title,
    content,
  };
  await pgDb.insert(promptsTable).values(newItem);

  return newItem;
};
