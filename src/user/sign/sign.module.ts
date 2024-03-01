import { Module } from '@nestjs/common';
import { SignController } from './sign.controller';
import { SignService } from './sign.service';
import { User } from 'src/Entitys/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [SignController],
  providers: [SignService]
})
export class SignModule {}
