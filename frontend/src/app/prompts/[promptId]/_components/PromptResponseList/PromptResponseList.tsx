"use client";

import { PromptResponse } from "@/api/promptResponses/promptResponses.types";
import { Alert, List, ListItem } from "@mui/material";

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

  const onUpdateSuccess = useCallback(
    (newPromptResponse: PromptResponse) => {
      const newValues = currentPromptResponses.map((v) => {
        if (v.id !== newPromptResponse.id) {
          return v;
        }

        return newPromptResponse;
      });
      setCurrentPromptResponses(newValues);
    },
    [currentPromptResponses]
  );

  if (currentPromptResponses.length === 0) {
    return (
      <>
        <br />
        <Alert severity="info">
          <i>No existing prompt responses.</i>
          <br />
          <br />
          Tip: Try updating the prompt above to generate new prompt responses.
        </Alert>
      </>
    );
  }

  return (
    <List>
      {currentPromptResponses.map((promptResponse) => {
        const { id } = promptResponse;
        return (
          <ListItem key={id}>
            <CircleIcon fontSize="small" className='mr-2' />
            <PromptResponseCard
              promptResponse={promptResponse}
              onDeleteSuccess={onDeleteSuccess}
              onUpdateSuccess={onUpdateSuccess}
            />
          </ListItem>
        );
      })}
    </List>
  );
};
