import { getPrompts } from "@/api/prompts/prompts.api";
import { List, ListItem } from "@mui/material";
import Typography from "@mui/material/Typography";

const PromptsPage = async () => {
  const prompts = await getPrompts();

  return (
    <>
      <Typography variant="h4">My Prompts</Typography>

      <List>
        {prompts.map((prompt) => {
          const { id, content } = prompt;
          return <ListItem key={id}>{content}</ListItem>;
        })}
      </List>
    </>
  );
};

export default PromptsPage;
