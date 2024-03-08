import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserToSign } from '../../auth/dto/sign.dto';
import { UserService } from '../user.service';

@Controller('user/sign')
export class SignController {

     constructor( private _userService : UserService){}

     @Post()
     signupUser( @Body() user : UserToSign){
         return this._userService.signupUser(user);
     }
}
