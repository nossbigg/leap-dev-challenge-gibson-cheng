import { Prompt } from "./prompts.types";

export const getPrompts = async (): Promise<Prompt[]> => {
  const response = await fetch(`http://localhost:3000/prompts`, {
    method: "GET",
  });
  const result = await response.json();
  return result;
};

export const getPrompt = async (
  promptId: string
): Promise<Prompt | undefined> => {
  const response = await fetch(`http://localhost:3000/prompts/${promptId}`, {
    method: "GET",
  });
  if (response.status !== 200) {
    return undefined;
  }

  const result = await response.json();
  return result;
};

export const updatePrompt = async (
  promptId: string,
  content: string
): Promise<void> => {
  const payload = { content };

  await fetch(`http://localhost:3000/prompts/${promptId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};

export const createPrompt = async (content: string): Promise<string> => {
  const payload = { title: "My New Prompt", content };

  const response = await fetch(`http://localhost:3000/prompts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const result = await response.json();
  const { id } = result;
  return id;
};
