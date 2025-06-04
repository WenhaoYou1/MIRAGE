import { Module } from '@nestjs/common';
import { DiffusionService } from './diffusion.service';

@Module({ providers: [DiffusionService], exports: [DiffusionService] })
export class DiffusionModule {}
