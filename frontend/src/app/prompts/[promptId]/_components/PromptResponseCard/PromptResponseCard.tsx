"use client";

import { PromptResponse } from "@/api/promptResponses/promptResponses.types";
import { useCallback } from "react";
import {
  deletePromptResponse,
  updatePromptResponse,
} from "@/api/promptResponses/promptResponses.api";
import { EditableTextBox } from "../EditableTextBox";

interface Props {
  promptResponse: PromptResponse;
  onDeleteSuccess: (id: string) => void;
  onUpdateSuccess: (v: PromptResponse) => void;
}
export const PromptResponseCard: React.FC<Props> = (props) => {
  const { promptResponse, onDeleteSuccess, onUpdateSuccess } = props;
  const { content, id } = promptResponse;

  const onDelete = useCallback(async () => {
    await deletePromptResponse(id);
    alert("Prompt response deleted");
    onDeleteSuccess(id);
  }, [id, onDeleteSuccess]);

  const onSave = useCallback(
    async (newValue: string) => {
      await updatePromptResponse(id, newValue);
      onUpdateSuccess({ ...promptResponse, content: newValue });
      return true;
    },
    [id, onUpdateSuccess, promptResponse]
  );

  return (
    <EditableTextBox
      content={content}
      onDelete={onDelete}
      onSave={onSave}
      label="Prompt Response"
    />
  );
};
