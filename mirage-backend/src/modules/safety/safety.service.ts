import { Injectable } from '@nestjs/common';
import { LlmService } from '../llm/llm.service';

@Injectable()
export class SafetyService {
  constructor(private readonly llm: LlmService) {}

  async ok(data: any): Promise<boolean> {
    // 将数据转换为字符串进行检查
    const textToCheck = JSON.stringify(data);
    // 使用新的 moderation API 进行检查
    return this.llm.moderate(textToCheck);
  }
}
