"use client";

import { PromptResponse } from "@/api/promptResponses/promptResponses.types";
import { List, ListItem } from "@mui/material";

import CircleIcon from "@mui/icons-material/Circle";

import { useCallback, useState } from "react";
import { PromptResponseCard } from "../PromptResponseCard";

interface Props {
  promptResponses: PromptResponse[];
}

export const PromptResponseList: React.FC<Props> = (props) => {
  const { promptResponses } = props;

  const [currentPromptResponses, setCurrentPromptResponses] =
    useState(promptResponses);

  const onDeleteSuccess = useCallback(
    (id: string) => {
      const newValues = currentPromptResponses.filter((v) => v.id !== id);
      setCurrentPromptResponses(newValues);
    },
    [currentPromptResponses]
  );

  return (
    <List>
      {currentPromptResponses.map((promptResponse) => {
        const { id } = promptResponse;
        return (
          <ListItem key={id}>
            <CircleIcon fontSize="small" />
            <PromptResponseCard
              promptResponse={promptResponse}
              onDeleteSuccess={onDeleteSuccess}
            />
          </ListItem>
        );
      })}
    </List>
  );
};
