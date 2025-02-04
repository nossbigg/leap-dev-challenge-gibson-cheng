import { Body, Controller, Post } from '@nestjs/common';
import { createPrompt } from './prompts.service';
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
    const newPrompt = await createPrompt(title, content);
    return newPrompt;
  }
}
