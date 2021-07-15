import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import express from 'express';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.use(express.json());
  app.enableCors();
  await app
    .listen(process.env.PORT)
    .then(() => console.log('app listening on ' + process.env.PORT))
    .catch(() => console.log('unable to connect to port'));
}

bootstrap();
