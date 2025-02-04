import { Module } from '@nestjs/common';
import { PromptsController } from './resources/prompts/prompts.controller';
import { PromptResponsesController } from './resources/promptResponses/promptResponses.controller';

@Module({
  controllers: [PromptsController, PromptResponsesController],
})
export class AppModule {}
