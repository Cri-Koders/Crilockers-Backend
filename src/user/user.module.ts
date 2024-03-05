import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Entitys/user.entity';
import { SignModule } from './sign/sign.module';
import { LoginModule } from './login/login.module';

@Module({
     imports: [TypeOrmModule.forFeature([User]), SignModule, LoginModule],
     controllers: [ UserController],
     providers: [UserService]
})
export class UserModule {}
