import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import dotenv from 'dotenv';

import { AppModule } from './app/modules/app.module';

async function bootstrap() {
  if (process.env.NODE_ENV) {
    dotenv.config({
      path: `.env.${process.env.NODE_ENV}`,
    });
  }

  const app = await NestFactory.create(AppModule);

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const port = process.env.PORT || 3333;

  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
