"use client";

import { useCallback } from "react";
import { EditableTextBox } from "../EditableTextBox";
import { Prompt } from "@/api/prompts/prompts.types";
import { updatePrompt } from "@/api/prompts/prompts.api";

interface Props {
  prompt: Prompt;
}
export const PromptCard: React.FC<Props> = (props) => {
  const { prompt } = props;
  const { content, id } = prompt;

  const onSave = useCallback(
    async (newValue: string) => {
      await updatePrompt(id, newValue);
      // note: shoudl use router.refresh() here, but there's issues with server/client state reconciliation
      window.location.reload();
      return true;
    },
    [id]
  );

  return <EditableTextBox content={content} onSave={onSave} />;
};
