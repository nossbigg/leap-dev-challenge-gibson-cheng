"use client";

import Card from "@mui/material/Card";
import styles from "./EditableTextBox.module.css";
import { IconButton, TextField } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCallback, useState } from "react";

interface Props {
  content: string;
  onSave: (v: string) => Promise<boolean>;
  onDelete?: () => void;
  customEditMode?: {
    initialEditMode: boolean;
    showCancelButton: boolean;
  };
}
export const EditableTextBox: React.FC<Props> = (props) => {
  const { content, onSave, onDelete, customEditMode } = props;

  // for customEditMode
  const initialEditMode = customEditMode
    ? customEditMode.initialEditMode
    : false;
  const showCancelButton = customEditMode
    ? customEditMode.showCancelButton
    : true;

  const [isEditMode, setEditMode] = useState(initialEditMode);
  const [editedContent, setEditedContent] = useState(content);

  const onEditEnable = () => setEditMode(true);
  const onEditDisable = () => {
    setEditMode(false);
    setEditedContent(content);
  };

  const onSaveHandler = useCallback(async () => {
    const r = await onSave(editedContent);
    if (!r) {
      return;
    }

    setEditMode(false);
  }, [editedContent, onSave]);

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
          {showCancelButton && (
            <IconButton onClick={onEditDisable}>
              <CloseIcon />
            </IconButton>
          )}
          <IconButton onClick={onSaveHandler}>
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
        {!!onDelete && (
          <IconButton onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        )}
      </div>
    </Card>
  );
};
