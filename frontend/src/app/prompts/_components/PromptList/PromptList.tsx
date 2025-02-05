"use client";

import { Prompt } from "@/api/prompts/prompts.types";
import { Alert, Button, Card, List, ListItem } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import styles from "./PromptList.module.css";
import { makeTruncatedPromptContent } from "@/components/utils/promptsUtils";

interface Props {
  prompts: Prompt[];
}

export const PromptList: React.FC<Props> = (props) => {
  const { prompts } = props;
  const router = useRouter();

  const onPromptClick = useCallback(
    (promptId: string) => {
      router.push(`/prompts/${promptId}`);
    },
    [router]
  );

  if (prompts.length === 0) {
    return (
      <>
        <br />
        <Alert severity="info">
          <i>No existing prompts.</i>
          <br />
          <br />
          Tip: Add a new prompt by typing in the input above.
        </Alert>
      </>
    );
  }

  return (
    <List>
      {prompts.map((prompt) => {
        const { id, content } = prompt;
        return (
          <ListItem key={id}>
            <Card onClick={() => onPromptClick(id)} className={styles.card}>
              {makeTruncatedPromptContent(content)}
              <br />
              <Button>See more</Button>
            </Card>
          </ListItem>
        );
      })}
    </List>
  );
};
