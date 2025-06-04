/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import fetch, { Response } from 'node-fetch';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DiffusionService {
  private readonly apiUrl =
    'https://api.fireworks.ai/inference/v1/image_generation/accounts/fireworks/models/stable-diffusion-xl-1024-v1-0';
  private readonly outputDir = join(process.cwd(), 'public', 'images');
  private readonly baseUrl = process.env.BASE_URL || 'http://localhost:4000';

  async generate(prompt: string): Promise<string> {
    try {
      const fetchResponse = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'image/jpeg',
          Authorization: `Bearer ${process.env.FIREWORK_API_KEY}`,
        },
        body: JSON.stringify({
          cfg_scale: 7,
          height: 1024,
          width: 1024,
          steps: 10,
          seed: 0,
          safety_check: false,
          prompt,
        }),
      });

      if (!(fetchResponse instanceof Response)) {
        throw new Error('Unexpected response type from fetch');
      }

      if (!fetchResponse.ok) {
        throw new Error(`Firework API error: ${fetchResponse.statusText}`);
      }
      const response = fetchResponse;

      // 生成唯一的文件名
      const filename = `${uuidv4()}.jpeg`;
      const filepath = join(this.outputDir, filename);

      // 将图片保存到文件
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      await writeFile(filepath, buffer);

      // 返回 base64 编码的图片
      return `data:image/jpeg;base64,${buffer.toString('base64')}`;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Image generation failed: ${error.message}`);
      }
      throw new Error('Image generation failed: Unknown error');
    }
  }
}
