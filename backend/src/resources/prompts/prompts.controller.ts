import { Body, Controller, Post } from '@nestjs/common';
import { createPromptAndGenerateResponse } from './prompts.service';
import { PromptEntity } from './prompts.entity';

interface PostPromptRequestBody {
  title: string;
  content: string;
}

@Controller('/prompts')
export class PromptsController {
  constructor() {}

  @Post()
  async postPrompt(
    @Body() requestBody: PostPromptRequestBody,
  ): Promise<PromptEntity> {
    const { title, content } = requestBody;
    const { prompt } = await createPromptAndGenerateResponse(title, content);
    return prompt;
  }
}
