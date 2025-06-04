import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

/** Chat payload 类型（含 Vision） */
type ChatMessage = {
  role: 'system' | 'user' | 'assistant';
  content: any;
};

@Injectable()
export class LlmService {
  /** OpenAI 客户端实例 */
  private openaiClient: OpenAI;
  /** DeepSeek 客户端实例 */
  private deepseekClient: OpenAI;

  constructor() {
    // 这时 dotenv 已完成注入，process.env 已有值
    this.openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    this.deepseekClient = new OpenAI({
      baseURL: 'https://api.deepseek.com',
      apiKey: process.env.DEEPSEEK_API_KEY,
    });
  }

  /** 获取对应的客户端实例 */
  private getClient(provider: string): OpenAI {
    if (provider.startsWith('deepseek-')) {
      return this.deepseekClient;
    }
    return this.openaiClient;
  }

  /** 单轮文本 prompt → string */
  async completeRaw({
    provider,
    prompt,
  }: {
    provider: string;
    prompt: string;
  }): Promise<string> {
    const client = this.getClient(provider);
    const chat = await client.chat.completions.create({
      model: provider,
      messages: [{ role: 'user', content: prompt }],
    });
    return chat.choices[0].message.content ?? '';
  }

  /** 多轮 Vision Chat → 最新 assistant message */
  async chat({
    provider,
    messages,
  }: {
    provider: string;
    messages: ChatMessage[];
  }): Promise<ChatMessage> {
    const client = this.getClient(provider);
    const res = await client.chat.completions.create({
      model: provider,
      messages,
    });
    return res.choices[0].message as ChatMessage;
  }

  /** 内容安全检查 */
  async moderate(input: string): Promise<boolean> {
    const moderation = await this.openaiClient.moderations.create({
      model: 'omni-moderation-latest',
      input,
    });

    const result = moderation.results[0];
    if (!result) return false;

    // 获取所有类别
    const categories = Object.entries(result.categories);
    // 计算被标记为 true 的类别数量
    const flaggedCount = categories.filter(
      ([, value]) => value === true,
    ).length;
    // 计算总类别数量
    const totalCategories = categories.length;
    // 如果超过 30% 的类别被标记为 true，则返回 false
    const threshold = 0.3; // 30% 阈值
    return flaggedCount / totalCategories <= threshold;
  }
}
