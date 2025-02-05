import { getPrompts } from "@/api/prompts/prompts.api";
import Typography from "@mui/material/Typography";
import { PromptList } from "./_components/PromptList";

const PromptsPage = async () => {
  const prompts = await getPrompts();

  return (
    <>
      <Typography variant="h4">My Prompts</Typography>

      <PromptList prompts={prompts} />
    </>
  );
};

export default PromptsPage;
