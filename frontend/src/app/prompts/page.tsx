import { getPrompts } from "@/api/prompts/prompts.api";
import Typography from "@mui/material/Typography";
import { PromptList } from "./_components/PromptList";
import { CommonLayout } from "@/components/CommonLayout";

const PromptsPage = async () => {
  const prompts = await getPrompts();

  return (
    <CommonLayout title="Prompts">
      <br />
      <Typography variant="h4">My Prompts</Typography>

      <PromptList prompts={prompts} />
    </CommonLayout>
  );
};

export default PromptsPage;
