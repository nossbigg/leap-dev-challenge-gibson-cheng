export const deletePromptResponse = async (
  promptResponseId: string
): Promise<void> => {
  await fetch(`http://localhost:3000/promptResponses/${promptResponseId}`, {
    method: "DELETE",
  });
};
