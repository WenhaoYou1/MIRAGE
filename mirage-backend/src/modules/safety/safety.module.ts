import { Module } from '@nestjs/common';
import { SafetyService } from './safety.service';
import { LlmModule } from '../llm/llm.module';

@Module({
  imports: [LlmModule],
  providers: [SafetyService],
  exports: [SafetyService],
})
export class SafetyModule {}
