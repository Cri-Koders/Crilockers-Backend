import { Body, Controller, Get, HttpStatus, Param, Post, Req, UseGuards } from '@nestjs/common';
import { UserToLogin } from './dto/login.dto';
import { UserService } from '../user.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
@Controller('user/login')
export class LoginController {

     constructor( private _userService : UserService ) {}
     @Get('/facebook')
     @UseGuards(AuthGuard('facebook'))
     async loginFacebook() : Promise<any> {
          return HttpStatus.OK
     }

     @Get('/facebook/redirect')
     @UseGuards(AuthGuard('facebook')) 
     async loginFacebookRedirect(@Req() req : Request ) : Promise<any> {
          return {
               statusCode: HttpStatus.OK,
               data: req.user
          }
     }

     @Post()
     userLogin( @Body() user : UserToLogin){
          return this._userService.loginUser(user);
     }
}
