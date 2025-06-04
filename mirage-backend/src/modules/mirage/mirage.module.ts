import { Module } from '@nestjs/common';
import { MirageService } from './mirage.service';
import { LlmModule } from '../llm/llm.module';
import { SafetyModule } from '../safety/safety.module';

@Module({
  imports: [LlmModule, SafetyModule],
  providers: [MirageService],
  exports: [MirageService],
})
export class MirageModule {}
