import { Body, Controller, Delete, Param, Patch } from '@nestjs/common';
import {
  deletePromptResponse,
  updatePromptResponse,
} from './promptResponses.service';

@Controller('/promptResponses')
export class PromptResponsesController {
  constructor() {}

  @Delete(':id')
  async deletePromptResponse(
    @Param('id') promptResponseId: string,
  ): Promise<void> {
    await deletePromptResponse(promptResponseId);
  }

  @Patch(':id')
  async patchPromptResponse(
    @Param('id') promptResponseId: string,
    @Body('content') content: string,
  ): Promise<void> {
    await updatePromptResponse(promptResponseId, content);
  }
}
