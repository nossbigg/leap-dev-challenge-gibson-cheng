"use client";

import { Prompt } from "@/api/prompts/prompts.types";
import { Button, Card, List, ListItem } from "@mui/material";
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
