import { v4 as uuidv4 } from 'uuid';
import { promptsTable } from 'src/db/schema/prompts';
import { PromptEntity, PromptEntityWithResponses } from './prompts.entity';
import { pgDb } from 'src/db/constants';
import {
  addFormattingPrompt,
  doGoogleGeminiPrompt,
  GPTModelMessage as GeminiMessage,
  processFormattedGeminiResponse,
} from 'src/integrations/googleGemini';
import {
  createPromptResponse,
  deletePromptResponsesByPromptId,
} from '../promptResponses/promptResponses.service';
import { eq } from 'drizzle-orm';

const generateResponsesFromPrompt = async (
  promptId: string,
  content: string,
) => {
  const geminiMessage: GeminiMessage = {
    contentSource: 'user',
    content: addFormattingPrompt(content),
  };
  const geminiResponse = await doGoogleGeminiPrompt([geminiMessage]);
  const responseParts = processFormattedGeminiResponse(geminiResponse);

  const promptResponses = await Promise.all(
    responseParts.map((content, idx) => {
      return createPromptResponse(content, idx + 1, promptId);
    }),
  );

  return { promptResponses };
};

export const createPromptAndGenerateResponse = async (
  title: string,
  content: string,
) => {
  const prompt = await createPrompt(title, content);

  const promptResponses = await generateResponsesFromPrompt(prompt.id, content);
  return { prompt, promptResponses };
};

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

export const getPrompt = async (
  promptId: string,
): Promise<PromptEntityWithResponses | undefined> => {
  const r = await pgDb.query.promptsTable.findFirst({
    where: eq(promptsTable.id, promptId),
    with: {
      promptResponses: {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        orderBy: (promptResponsesTable, { asc }) => [
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
          asc(promptResponsesTable.displayOrder),
        ],
      },
    },
  });
  return r;
};

export const getAllPrompts = async (): Promise<PromptEntity[]> => {
  const r = await pgDb.select().from(promptsTable);
  return r;
};

export const updatePrompt = async (promptId: string, content: string) => {
  await pgDb
    .update(promptsTable)
    .set({ content })
    .where(eq(promptsTable.id, promptId));
};

export const updatePromptAndRegenerateResponses = async (
  promptId: string,
  content: string,
) => {
  await updatePrompt(promptId, content);
  await deletePromptResponsesByPromptId(promptId);

  await generateResponsesFromPrompt(promptId, content);
};
