"use client";

import { PromptResponse } from "@/api/promptResponses/promptResponses.types";
import Card from "@mui/material/Card";
import styles from "./PromptResponseCard.module.css";
import { IconButton } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import { useCallback } from "react";
import { deletePromptResponse } from "@/api/promptResponses/promptResponses.api";

interface Props {
  promptResponse: PromptResponse;
  onDeleteSuccess: (id: string) => void;
}
export const PromptResponseCard: React.FC<Props> = (props) => {
  const { promptResponse, onDeleteSuccess } = props;
  const { content, id } = promptResponse;

  const onDelete = useCallback(async () => {
    await deletePromptResponse(id);
    alert("Prompt response deleted");
    onDeleteSuccess(id);
  }, [id, onDeleteSuccess]);

  return (
    <Card className={styles.card}>
      <div className={styles.cardContents}>{content}</div>
      <div className={styles.cardControls}>
        <IconButton onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </div>
    </Card>
  );
};
