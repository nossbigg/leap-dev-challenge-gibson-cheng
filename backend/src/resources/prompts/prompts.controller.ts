import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  createPromptAndGenerateResponse,
  getPrompt,
  getAllPrompts,
  updatePromptAndRegenerateResponses,
} from './prompts.service';
import { PromptEntity, PromptEntityWithResponses } from './prompts.entity';

interface PostPromptRequestBody {
  title: string;
  content: string;
}

@Controller('/prompts')
export class PromptsController {
  constructor() {}

  @Get()
  async getPrompts(): Promise<PromptEntity[]> {
    const prompts = await getAllPrompts();
    return prompts;
  }

  @Get(':id')
  async getPrompt(
    @Param('id') promptId: string,
  ): Promise<PromptEntityWithResponses> {
    const prompt = await getPrompt(promptId);
    if (!prompt) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return prompt;
  }

  @Post()
  async postPrompt(
    @Body() requestBody: PostPromptRequestBody,
  ): Promise<PromptEntity> {
    const { title, content } = requestBody;
    const { prompt } = await createPromptAndGenerateResponse(title, content);
    return prompt;
  }

  @Patch(':id')
  async patchPrompt(
    @Param('id') promptId: string,
    @Body('content') content: string,
  ): Promise<void> {
    await updatePromptAndRegenerateResponses(promptId, content);
  }
}
