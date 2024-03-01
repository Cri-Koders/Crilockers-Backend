import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserToLogin } from './dto/login.dto';
import { UserService } from '../user.service';
@Controller('login')
export class LoginController {

     constructor( private _userService : UserService ) {}
     
     @Get()
     rutaLogin(){
          return "login route"
     }

     @Post()
     userLogin( @Body() user : UserToLogin){
          return this._userService.loginUser(user);
     }
}
