"use client";

import { PromptResponse } from "@/api/promptResponses/promptResponses.types";
import Card from "@mui/material/Card";
import styles from "./PromptResponseCard.module.css";
import { IconButton, TextField } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCallback, useState } from "react";
import { deletePromptResponse } from "@/api/promptResponses/promptResponses.api";

interface Props {
  promptResponse: PromptResponse;
  onDeleteSuccess: (id: string) => void;
}
export const PromptResponseCard: React.FC<Props> = (props) => {
  const { promptResponse, onDeleteSuccess } = props;
  const { content, id } = promptResponse;

  const [isEditMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const onEditEnable = () => setEditMode(true);
  const onEditDisable = () => {
    setEditMode(false);
    setEditedContent(content);
  };

  const onDelete = useCallback(async () => {
    await deletePromptResponse(id);
    alert("Prompt response deleted");
    onDeleteSuccess(id);
  }, [id, onDeleteSuccess]);

  if (isEditMode) {
    return (
      <Card className={styles.card}>
        <div className={styles.cardContents}>
          <TextField
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            fullWidth
            multiline
          />
        </div>
        <div className={styles.cardControls}>
          <IconButton onClick={onEditDisable}>
            <CloseIcon />
          </IconButton>
        </div>
      </Card>
    );
  }

  return (
    <Card className={styles.card}>
      <div className={styles.cardContents}>{content}</div>
      <div className={styles.cardControls}>
        <IconButton onClick={onEditEnable}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </div>
    </Card>
  );
};
