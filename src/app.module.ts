import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginModule } from './user/login/login.module';
import { SignModule } from './user/sign/sign.module';
import { User } from './Entitys/user.entity';

@Module({
  imports: [LoginModule, SignModule, TypeOrmModule.forRoot({
    type: 'sqlite',
    database: './DataBase/tursoConnection',
    entities: [User],
    synchronize: true
  })],
  controllers: [AppController],
})
export class AppModule {}
