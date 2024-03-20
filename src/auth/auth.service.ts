import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/Entitys/user.entity';
import { Repository } from 'typeorm';
import { UserToSign } from './dto/sign.dto';
import * as bcrypt from 'bcrypt';
import { TokenRefreshDto } from 'src/user/dto/tokenRefresh.dto';
import { UserToLogin } from './dto/login.dto';
import { userLoginWFacebook } from './dto/loginFacebook.dto';
import { randomBytes } from 'crypto';
import { userLoginWGoogle } from './dto/loginGoogle.dto';
@Injectable()
export class AuthService {
     constructor(
          @InjectRepository(User)
          private userRepository: Repository<User>,
          private jwtService : JwtService
     ){}

     async signupUser ( user : UserToSign) {
          try {
               const newUser = new User();
               const salt = await bcrypt.genSalt()
               newUser.username = user.username;
               newUser.email = user.email;
               newUser.password = await bcrypt.hash( user.password, salt )
               const userSaved = await this.userRepository.save(newUser)
               delete userSaved.password
               const payload = { id : userSaved.id, email : userSaved.email }
               const token = this.jwtService.sign(payload)
               const refreshToken = await this.generateRefreshToken( userSaved )
               const userLogged = {
                    user: userSaved,
                    token,
                    refreshToken
               }
               return userLogged
          }
          catch (error) {
               if(error.code === "ER_DUP_ENTRY"){
                    throw new ConflictException(`the email ${user.email} is already registered`)
               }
               throw new Error (error)
          }
     }

     async loginUser ( user : UserToLogin ){
          try {
               const loggedUser = await this.userRepository.findOneBy({ email: user.email })
               if ( !loggedUser ) throw new NotFoundException('Not Found')

               const isMatch = await bcrypt.compare(user.password, loggedUser.password)
               if ( !isMatch ) throw new UnauthorizedException('Unauthorized');

               delete loggedUser.password
               const payload = { id : loggedUser.id, email : loggedUser.email }
               const token = this.jwtService.sign(payload)
               const refreshToken = await this.generateRefreshToken( loggedUser )

               return {
                    user: loggedUser,
                    token,
                    refreshToken
               };
          }
          catch (error) {
               if(error.status == 404){
                    throw new NotFoundException('the email does not match any in the database')
               }
               if(error.status == 401){
                    throw new UnauthorizedException('the password does not match')
               }
          }
     }

     async saveFacebookUser( user : userLoginWFacebook ){
          try {
               const existingUser = await this.userRepository.findOneBy({ email : user.user.email })
               if(!existingUser){
                    const newUser = {
                         username : `${user.user.firstName} ${user.user.lastName}`,
                         email: user.user.email,
                         password: randomBytes(16).toString('hex')
                    }
                    const userRegistered = await this.userRepository.save(newUser)
                    delete userRegistered.password
                    return userRegistered
               }
               delete existingUser.password
               return existingUser
          }
          catch (error) {
               throw new Error (error)
          }
     }

     async saveGoogleUser( user : userLoginWGoogle ){
          try {
               const existingUser = await this.userRepository.findOneBy({ email : user.email })
               if(!existingUser){
                    const newUser = {
                         username : `${user.firstName} ${user.lastName}`,
                         email: user.email,
                         password: randomBytes(16).toString('hex')
                    }
                    const userRegistered = await this.userRepository.save(newUser)
                    delete userRegistered.password
                    return userRegistered
               }
               delete existingUser.password
               return existingUser
          }
          catch (error) {
               throw new Error (error)
          }
     }

     async refreshToken ( refreshToken : string ) {
          try {
               const payload = this.jwtService.verify( refreshToken )
               const user = await this.userRepository.findOneBy({ id: payload.id })
               if(!user){
                    throw new UnauthorizedException('Unauthorized')
               }

               const newAccessToken = this.jwtService.sign( {
                    id: user.id,
                    email: user.email
               })
               const newRefreshToken = await this.generateRefreshToken( user ) 
               
               return {
                    accessToken: newAccessToken,
                    refreshToken: newRefreshToken
               }
          }
          catch (error) {
               throw new UnauthorizedException('Unauthorized')
          }
     }

     async generateRefreshToken( user : TokenRefreshDto ) {
          const payload = { id: user.id, email: user.email };
          return this.jwtService.sign(payload, { expiresIn: '2d' });
     } 
}
