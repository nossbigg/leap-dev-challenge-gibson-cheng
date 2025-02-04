"use client";

import { PromptResponse } from "@/api/promptResponses/promptResponses.types";
import Card from "@mui/material/Card";
import styles from "./PromptResponseCard.module.css";
import { IconButton, TextField } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCallback, useState } from "react";
import {
  deletePromptResponse,
  updatePromptResponse,
} from "@/api/promptResponses/promptResponses.api";

interface Props {
  promptResponse: PromptResponse;
  onDeleteSuccess: (id: string) => void;
  onUpdateSuccess: (v: PromptResponse) => void;
}
export const PromptResponseCard: React.FC<Props> = (props) => {
  const { promptResponse, onDeleteSuccess, onUpdateSuccess } = props;
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

  const onSave = useCallback(async () => {
    await updatePromptResponse(id, editedContent);
    onUpdateSuccess({ ...promptResponse, content: editedContent });
    setEditMode(false);
  }, [editedContent, id, onUpdateSuccess, promptResponse]);

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
          <IconButton onClick={onSave}>
            <DoneIcon />
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
