import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { UserService } from '../user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Entitys/user.entity';

@Module({
     imports: [TypeOrmModule.forFeature([User])],
     controllers: [ LoginController ],
     providers: [UserService]
})
export class LoginModule {}
