import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserToLogin } from './dto/login.dto';
import { UserService } from '../user.service';
@Controller('user/login')
export class LoginController {

     constructor( private _userService : UserService ) {}
     
     @Get(':id')
     rutaLogin( @Param( 'id' ) id : string){
          // return this._userService.
     }

     @Post()
     userLogin( @Body() user : UserToLogin){
          return this._userService.loginUser(user);
     }
}
