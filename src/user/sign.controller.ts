import { Body, Controller, Get, Post } from '@nestjs/common';
<<<<<<< HEAD:src/user/sign.controller.ts
import { UserToSign } from './dto/sign.dto';
import { UserService } from './user.service';
=======
import { UserToSign } from '../../auth/dto/sign.dto';
import { UserService } from '../user.service';
>>>>>>> 6a9e4b1179e8bf7064e375dd92fa5164f2a0d17b:src/user/sign/sign.controller.ts

@Controller('user/sign')
export class SignController {

     constructor( private _userService : UserService){}

     @Post()
     signupUser( @Body() user : UserToSign){
         return this._userService.signupUser(user);
     }
}
