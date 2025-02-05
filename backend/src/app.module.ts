import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PromptsController } from './resources/prompts/prompts.controller';
import { PromptResponsesController } from './resources/promptResponses/promptResponses.controller';

@Module({
  controllers: [PromptsController, PromptResponsesController],
  imports: [ConfigModule.forRoot()],
})
export class AppModule {}
