import { IsString, IsIn } from 'class-validator';

export class AttackRequestDto {
  @IsString()
  query: string;

  @IsString()
  @IsIn(['gpt-4o', 'deepseek-chat'], {
    message:
      'targetModel must be either "gpt-4-vision-preview" or "deepseek-chat"',
  })
  targetModel: string; // 支持的模型: "gpt-4-vision-preview" (OpenAI) 或 "deepseek-chat" (DeepSeek)
}
