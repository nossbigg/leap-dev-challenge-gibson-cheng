export const deletePromptResponse = async (
  promptResponseId: string
): Promise<void> => {
  await fetch(`http://localhost:3000/promptResponses/${promptResponseId}`, {
    method: "DELETE",
  });
};

export const updatePromptResponse = async (
  promptResponseId: string,
  content: string
): Promise<void> => {
  const payload = { content };

  await fetch(`http://localhost:3000/promptResponses/${promptResponseId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};
