import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginModule } from './user/login/login.module';
import { SignModule } from './user/sign/sign.module';
import { User } from './Entitys/user.entity';
import { UserService } from './user/user.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { FacebookStrategy } from './Stratergies/facebook.strategy';
import { GoogleStrategy } from './Stratergies/google.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), 
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User],
      synchronize: true
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '20h' },
    }),
    // Modules
    UserModule
],
  controllers: [AppController],
  providers: [ FacebookStrategy, GoogleStrategy ],
})
export class AppModule {}
