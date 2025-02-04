import { getPrompt } from "@/api/prompts/prompts.api";
import { PromptResponseList } from "@/components/PromptResponseList";
import { Card, Divider } from "@mui/material";
import Typography from "@mui/material/Typography";

const PromptPage = async ({
  params,
}: {
  params: Promise<{ promptId: string }>;
}) => {
  const { promptId } = await params;
  const prompt = await getPrompt(promptId);

  const { promptResponses, title, content } = prompt;

  return (
    <>
      <Typography variant="h4">Prompt: {title}</Typography>
      <p>Title: {title}</p>
      <Card>{content}</Card>
      <Divider />
      <Typography variant="h4">Prompt Responses</Typography>
      <PromptResponseList promptResponses={promptResponses} />
    </>
  );
};

export default PromptPage;
