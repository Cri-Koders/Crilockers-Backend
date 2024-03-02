import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginModule } from './user/login/login.module';
import { SignModule } from './user/sign/sign.module';
import { User } from './Entitys/user.entity';
import { UserService } from './user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), 
    LoginModule, 
    SignModule, 
    TypeOrmModule.forRoot({
    type: 'sqlite',
    database: './DataBase/tursoConnection',
    entities: [User],
    synchronize: true
  })
],
  controllers: [AppController],
  providers: [UserService],
})
export class AppModule {}
