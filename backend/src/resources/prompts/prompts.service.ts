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
import { createPromptResponse } from '../promptResponses/promptResponses.service';
import { eq } from 'drizzle-orm';

export const createPromptAndGenerateResponse = async (
  title: string,
  content: string,
) => {
  const prompt = await createPrompt(title, content);

  const geminiMessage: GeminiMessage = {
    contentSource: 'user',
    content: addFormattingPrompt(prompt.content),
  };
  const geminiResponse = await doGoogleGeminiPrompt([geminiMessage]);
  const responseParts = processFormattedGeminiResponse(geminiResponse);

  const promptResponses = await Promise.all(
    responseParts.map((content, idx) => {
      return createPromptResponse(content, idx + 1, prompt.id);
    }),
  );

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
    with: { promptResponses: true },
  });
  return r;
};
