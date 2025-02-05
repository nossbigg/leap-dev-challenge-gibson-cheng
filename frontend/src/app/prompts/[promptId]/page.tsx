import { getPrompt } from "@/api/prompts/prompts.api";
import { PromptCard } from "./_components/PromptCard";
import { PromptResponseList } from "./_components/PromptResponseList";
import { Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import { CommonLayout } from "@/components/CommonLayout";
import { makeTruncatedPromptContent } from "@/components/utils/promptsUtils";
import { Redirect } from "@/components/Redirect";
import { Metadata } from "next/types";
import { makePageTitle } from "@/components/utils/pageCommonUtils";

export const metadata: Metadata = {
  title: makePageTitle('Prompt'),
};

const PromptPage = async ({
  params,
}: {
  params: Promise<{ promptId: string }>;
}) => {
  const { promptId } = await params;
  const prompt = await getPrompt(promptId);

  if (!prompt) {
    return (
      <CommonLayout title={`Prompt:`} showBackIcon>
        Prompt: {promptId} not found. Redirecting...
        <Redirect path="/prompts" wait={2000} />
      </CommonLayout>
    );
  }

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
