import { AuthModule } from './app/modules/auth.module';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
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
  app.enableCors({
    origin: ['http://localhost:3000', 'https://keep-sport.vercel.app/'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  const config = new DocumentBuilder()
    .setTitle('Keep Sport')
    .setDescription('Keep Sport Backend API')
    .setVersion('1.0')
    .setContact(
      'Leo Liao',
      'https://github.com/HongLinLiao',
      'honglin0822@outlook.com'
    )
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  const port = process.env.PORT || 3333;

  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
