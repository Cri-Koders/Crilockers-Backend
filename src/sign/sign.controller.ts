import { Body, Controller, Get, Post } from '@nestjs/common';
import { SignService } from './sign.service';
import { UserToSign } from './dto/sign.dto';

@Controller('sign')
export class SignController {

     constructor( private _signService : SignService){}

     @Get()
     rutaSignUp () {
          return " Sign Up route"
     }

     @Post()
     signupUser( @Body() user : UserToSign){
         return this._signService.signupUser(user);
     }
}
