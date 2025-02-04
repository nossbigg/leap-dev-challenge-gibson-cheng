import { getPrompt } from "@/api/prompts/prompts.api";
import { Card, Divider, List, ListItem } from "@mui/material";
import Typography from "@mui/material/Typography";
import CircleIcon from "@mui/icons-material/Circle";
import { PromptResponseCard } from "@/components/PromptResponseCard";

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
      <List>
        {promptResponses.map((promptResponse) => {
          const { id } = promptResponse;
          return (
            <ListItem key={id}>
              <CircleIcon fontSize="small" />
              <PromptResponseCard promptResponse={promptResponse} />
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export default PromptPage;
