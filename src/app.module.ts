import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { LoginController } from './login/login.controller';
import { LoginModule } from './login/login.module';
import { SignModule } from './sign/sign.module';

@Module({
  imports: [LoginModule, SignModule],
  controllers: [AppController],
})
export class AppModule {}
