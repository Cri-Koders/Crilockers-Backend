import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { db } from './DataBase/tursoConnection';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT);
  if (app) console.log(`Listen at port: ${process.env.PORT}`);

  if (db) console.log('TURSO DB CONECTED!');
}

bootstrap();
