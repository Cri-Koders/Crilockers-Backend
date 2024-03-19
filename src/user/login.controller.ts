import { Body, Controller, Get, HttpStatus, Param, Post, Req, UseGuards } from '@nestjs/common';
<<<<<<< HEAD:src/user/login.controller.ts
import { UserToLogin } from './dto/login.dto';
import { UserService } from './user.service';
=======
import { UserToLogin } from '../../auth/dto/login.dto';
import { UserService } from '../user.service';
>>>>>>> 6a9e4b1179e8bf7064e375dd92fa5164f2a0d17b:src/user/login/login.controller.ts
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { userLoginWFacebook } from '../../auth/dto/loginFacebook.dto';
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
          return this._userService.saveFacebookUser( req.user as userLoginWFacebook )
          
     }

     @Get('/google')
     @UseGuards(AuthGuard('google'))
     async loginGoogle() : Promise<any> {
          return HttpStatus.OK
     }

     @Get('/google/redirect')
     @UseGuards(AuthGuard('google')) 
     async loginGoogleRedirect(@Req() req : Request ) : Promise<any> {
          return this._userService.saveGoogleUser( req.user as userLoginWGoogle)
     }

     @Post()
     userLogin( @Body() user : UserToLogin){
          return this._userService.loginUser(user);
     }
}
