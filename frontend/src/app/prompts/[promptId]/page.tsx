import { getPrompt } from "@/api/prompts/prompts.api";
import { PromptCard } from "./_components/PromptCard";
import { PromptResponseList } from "./_components/PromptResponseList";
import { Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import { CommonLayout } from "@/components/CommonLayout";
import { makeTruncatedPromptContent } from "@/components/utils/promptsUtils";

const PromptPage = async ({
  params,
}: {
  params: Promise<{ promptId: string }>;
}) => {
  const { promptId } = await params;
  const prompt = await getPrompt(promptId);

  const { promptResponses } = prompt;

  return (
    <CommonLayout
      title={`Prompt: ${makeTruncatedPromptContent(prompt.content)}`}
      showBackIcon
    >
      <br />
      <Typography variant="h4">Prompt:</Typography>
      <br />
      <PromptCard prompt={prompt} />

      <br />
      <Divider />
      <br />

      <Typography variant="h4">Prompt Responses</Typography>
      <PromptResponseList promptResponses={promptResponses} />
    </CommonLayout>
  );
};

export default PromptPage;
