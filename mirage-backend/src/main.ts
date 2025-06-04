import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json } from 'express';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  // 配置静态文件服务
  app.useStaticAssets(join(process.cwd(), 'public'), {
    prefix: '/', // 设置URL前缀
  });

  app.use(json({ limit: '10mb' }));
  await app.listen(process.env.PORT || 4000);
  console.log(
    `🚀 Mirage backend running on http://localhost:${process.env.PORT || 4000}`,
  );
}

bootstrap();
