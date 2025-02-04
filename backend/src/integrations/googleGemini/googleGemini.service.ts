import { Content, GoogleGenerativeAI } from '@google/generative-ai';
import { PROMPT_3_POINT_AND_SPACER_FORMATTER } from 'src/integrations/googleGemini/constants';

export interface GPTModelMessage {
  content: string;
  contentSource: 'model' | 'user';
}

export const doGoogleGeminiPrompt = async (messages: GPTModelMessage[]) => {
  // refs:
  // https://ai.google.dev/gemini-api/docs/text-generation?lang=node
  // https://ai.google.dev/gemini-api/docs/quickstart?lang=node

  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const googleGeminiContents = transformToGoogleGeminiContents(messages);
  const result = await model.generateContent({
    contents: googleGeminiContents,
  });

  const { text } = result.response;
  const resultText = text();
  return resultText;
};

const transformToGoogleGeminiContents = (
  messages: GPTModelMessage[],
): Content[] => {
  const googleGeminiContents = messages.map((message) => {
    const { content, contentSource } = message;
    const result: Content = { role: contentSource, parts: [{ text: content }] };
    return result;
  });
  return googleGeminiContents;
};

export const addFormattingPrompt = (prompt: string) =>
  `${prompt}${PROMPT_3_POINT_AND_SPACER_FORMATTER}`;

export const processFormattedGeminiResponse = (text: string): string[] => {
  const result = text.split('<SPACER>').map((v) => v.trim());
  return result;
};
