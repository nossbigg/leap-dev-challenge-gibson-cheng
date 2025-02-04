import { PromptResponseEntity } from '../promptResponses/promptResponses.entity';

export interface PromptEntity {
  id: string;
  title: string;
  content: string;
}

export interface PromptEntityWithResponses extends PromptEntity {
  promptResponses: PromptResponseEntity[];
}
