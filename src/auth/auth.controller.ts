import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpStatus, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { UserToSign } from './dto/sign.dto';
import { UserToLogin } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { userLoginWFacebook } from './dto/loginFacebook.dto';
import { userLoginWGoogle } from './dto/loginGoogle.dto';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly _authService: AuthService, 
    private _userService: UserService
    ) {}

  @Post('/sign')
  signupUser( @Body() user : UserToSign){
    return this._authService.signupUser(user);
}


     @Post('/login')
     async userLogin( @Body() user : UserToLogin){
          return this._authService.loginUser(user);
     }

     @Post('/refresh')
     async refreshToken( @Req() request : Request ){
     const [ type, token ] = request.headers['authorization']?.split(' ') || []
     return this._authService.refreshToken( token )
     //  return this._authService.loginUser(user);
     }

  @Get('/facebook')
     @UseGuards(AuthGuard('facebook'))
     async loginFacebook() : Promise<any> {
      return HttpStatus.OK
     }

     @Get('/facebook/redirect')
     @UseGuards(AuthGuard('facebook')) 
     async loginFacebookRedirect(@Req() { user } ) : Promise<any> {
          return this._authService.saveFacebookUser( user )
          
     }

     @Get('/google')
     @UseGuards(AuthGuard('google'))
     async loginGoogle() : Promise<any> {
          return HttpStatus.OK
     }

     @Get('/google/redirect')
     @UseGuards(AuthGuard('google')) 
     async loginGoogleRedirect(@Req() { user } ) : Promise<any> {
          return this._authService.saveGoogleUser( user )
     }
}
