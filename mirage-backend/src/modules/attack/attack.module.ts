import { Module } from '@nestjs/common';
import { AttackController } from './attack.controller';
import { AttackService } from './attack.service';
import { MirageModule } from '../mirage/mirage.module';
import { DiffusionModule } from '../diffusion/diffusion.module';
import { LlmModule } from '../llm/llm.module';

@Module({
  imports: [MirageModule, DiffusionModule, LlmModule],
  controllers: [AttackController],
  providers: [AttackService],
})
export class AttackModule {}
