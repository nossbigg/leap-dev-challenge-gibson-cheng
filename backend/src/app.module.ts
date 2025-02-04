import { Module } from '@nestjs/common';
import { PromptsController } from './resources/prompts/prompts.controller';

@Module({
  controllers: [PromptsController],
})
export class AppModule {}
