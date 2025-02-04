import { PromptResponse } from "../promptResponses/promptResponses.types";

export interface Prompt {
  id: string;
  title: string;
  content: string;
  promptResponses: PromptResponse[];
}
