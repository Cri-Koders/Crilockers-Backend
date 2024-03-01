import { Module } from '@nestjs/common';
import { SignController } from './sign.controller';
import { User } from 'src/Entitys/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [SignController],
  providers: [UserService]
})
export class SignModule {}
