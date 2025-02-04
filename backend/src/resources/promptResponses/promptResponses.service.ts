import { v4 as uuidv4 } from 'uuid';
import { promptResponsesTable } from 'src/db/schema/promptResponses';
import { PromptResponseEntity } from './promptResponses.entity';
import { pgDb } from 'src/db/constants';
import { eq } from 'drizzle-orm';

export const createPromptResponse = async (
  content: string,
  displayOrder: number,
  promptId: string,
): Promise<PromptResponseEntity> => {
  const newItem = {
    id: uuidv4(),
    content,
    displayOrder,
    promptId,
  };
  await pgDb.insert(promptResponsesTable).values(newItem);

  return newItem;
};
export const deletePromptResponse = async (
  promptResponseId: string,
): Promise<void> => {
  await pgDb
    .delete(promptResponsesTable)
    .where(eq(promptResponsesTable.id, promptResponseId));
};
