import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AttackModule } from './modules/attack/attack.module';
import { MirageModule } from './modules/mirage/mirage.module';
import { SafetyModule } from './modules/safety/safety.module';
import { LlmModule } from './modules/llm/llm.module';
import { DiffusionModule } from './modules/diffusion/diffusion.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AttackModule,
    MirageModule,
    SafetyModule,
    LlmModule,
    DiffusionModule,
  ],
})
export class AppModule {}
