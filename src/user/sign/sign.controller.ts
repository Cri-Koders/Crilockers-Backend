import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserToSign } from './dto/sign.dto';
import { UserService } from '../user.service';

@Controller('sign')
export class SignController {

     constructor( private _userService : UserService){}

     @Get()
     rutaSignUp () {
          return this._userService.getUsers()
     }

     @Post()
     signupUser( @Body() user : UserToSign){
         return this._userService.signupUser(user);
     }
}
