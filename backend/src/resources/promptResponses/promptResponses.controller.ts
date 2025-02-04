import { Controller, Delete, Param } from '@nestjs/common';
import { deletePromptResponse } from './promptResponses.service';

@Controller('/promptResponses')
export class PromptResponsesController {
  constructor() {}

  @Delete(':id')
  async deletePromptResponse(
    @Param('id') promptResponseId: string,
  ): Promise<void> {
    await deletePromptResponse(promptResponseId);
  }
}
