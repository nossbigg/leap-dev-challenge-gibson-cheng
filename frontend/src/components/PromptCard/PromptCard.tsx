"use client";

import { useCallback } from "react";
import { EditableTextBox } from "../EditableTextBox";
import { Prompt } from "@/api/prompts/prompts.types";
import { updatePrompt } from "@/api/prompts/prompts.api";
import { useRouter } from "next/navigation";

interface Props {
  prompt: Prompt;
}
export const PromptCard: React.FC<Props> = (props) => {
  const { prompt } = props;
  const { content, id } = prompt;

  const router = useRouter();

  const onSave = useCallback(
    async (newValue: string) => {
      await updatePrompt(id, newValue);
      router.refresh();
      return true;
    },
    [id, router]
  );

  return <EditableTextBox content={content} onSave={onSave} />;
};
