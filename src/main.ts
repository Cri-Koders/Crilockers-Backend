import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import db from './DataBase/tursoConnection';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  if (db) console.log('TURSO CONECTED!');
}
bootstrap();
