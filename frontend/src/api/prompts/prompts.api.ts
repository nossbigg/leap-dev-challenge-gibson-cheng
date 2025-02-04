export const getPrompt = async (promptId: string) => {
  const response = await fetch(`http://localhost:3000/prompts/${promptId}`, {
    method: "GET",
  });
  const result = await response.json();
  return result;
};
