"use client";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import styles from "./PromptsTitle.module.css";
import { EditableTextBox } from "../../[promptId]/_components/EditableTextBox";
import { createPrompt } from "@/api/prompts/prompts.api";
import { useRouter } from "next/navigation";
import AddBoxIcon from "@mui/icons-material/AddBox";

interface Props {
  hasExistingPrompts: boolean;
}

export const PromptsTitle: React.FC<Props> = (props) => {
  const { hasExistingPrompts } = props;

  const router = useRouter();
  const [showNewPromptAccordion, setShowNewPromptAccordion] =
    useState(!hasExistingPrompts);

  const onCreateNewPrompt = useCallback(
    async (content: string) => {
      const promptId = await createPrompt(content);
      router.push(`/prompts/${promptId}`);
      return true;
    },
    [router]
  );

  return (
    <>
      <br />
      <div className={styles.titleContainer}>
        <div className={styles.titleTextContainer}>
          <Typography variant="h4">My Prompts</Typography>
        </div>
        <div>
          <Button
            variant="contained"
            onClick={() => {
              setShowNewPromptAccordion(true);
            }}
          >
            <AddBoxIcon></AddBoxIcon>
            &nbsp;Prompt
          </Button>
        </div>
      </div>

      <br />
      <Accordion
        expanded={showNewPromptAccordion}
        onChange={(_, v) => setShowNewPromptAccordion(v)}
      >
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <AddBoxIcon></AddBoxIcon>
          &nbsp;
          <Typography component="span">Add New Prompt</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <EditableTextBox
            content=""
            label="Prompt"
            onSave={onCreateNewPrompt}
            customEditMode={{ initialEditMode: true, showCancelButton: false }}
          />
        </AccordionDetails>
      </Accordion>
    </>
  );
};
