import { v4 as uuidv4 } from 'uuid';
import { promptResponsesTable } from '../../db/schema/promptResponses';
import { PromptResponseEntity } from './promptResponses.entity';
import { pgDb } from '../../db/constants';
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

export const updatePromptResponse = async (
  promptResponseId: string,
  content: string,
): Promise<void> => {
  await pgDb
    .update(promptResponsesTable)
    .set({ content })
    .where(eq(promptResponsesTable.id, promptResponseId));
};

export const deletePromptResponsesByPromptId = async (promptId: string) => {
  await pgDb
    .delete(promptResponsesTable)
    .where(eq(promptResponsesTable.promptId, promptId));
};
