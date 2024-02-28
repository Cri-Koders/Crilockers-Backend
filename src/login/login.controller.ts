import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { UserToLogin } from './dto/login.dto';

@Controller('login')
export class LoginController {

     constructor( private _loginService : LoginService ) {}
     
     @Get()
     rutaLogin(){
          return "login route"
     }

     @Post()
     userLogin( @Body() user : UserToLogin){
          return this._loginService.loginUser(user);
     }
}
