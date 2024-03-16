import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Entitys/user.entity';
import { LoginController } from './login.controller';
import { SignController } from './sign.controller';
@Module({
     imports: [TypeOrmModule.forFeature([User])],
     controllers: [ UserController, LoginController, SignController],
     providers: [UserService]
})
export class UserModule {}
