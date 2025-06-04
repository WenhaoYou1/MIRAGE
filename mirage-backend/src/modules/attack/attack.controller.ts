import { Controller, Post, Body } from '@nestjs/common';
import { AttackService } from './attack.service';
import { AttackRequestDto } from '../../shared/dto/attack-request.dto';

@Controller('attack')
export class AttackController {
  constructor(private readonly svc: AttackService) {}

  @Post()
  run(@Body() dto: AttackRequestDto) {
    return this.svc.run(dto);
  }
}
