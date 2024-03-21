import { Injectable, NotFoundException } from '@nestjs/common';
import { UserToSign } from '../auth/dto/sign.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/Entitys/user.entity';
import { Repository } from 'typeorm';
import { UserToLogin } from '../auth/dto/login.dto';
import { UpdateUser } from './dto/updateUser.dto';
import { JwtService } from '@nestjs/jwt';
import { userLoginWFacebook } from '../auth/dto/loginFacebook.dto';
import { TokenRefreshDto } from './dto/tokenRefresh.dto';
import { userLoginWGoogle } from 'src/auth/dto/loginGoogle.dto';
@Injectable()
export class UserService {
     constructor(
          @InjectRepository(User)
          private userRepository: Repository<User>,
          private jwtService : JwtService
          ){}
          
          async signupUser ( user : UserToSign) {}
          async loginUser ( user : UserToLogin ){}
          async saveFacebookUser( user : userLoginWFacebook ){}
          async saveGoogleUser( user : userLoginWGoogle ){}
          async generateRefreshToken( user : TokenRefreshDto ) {} 
          async refreshToken ( refreshToken : string ) {}
          async getUsers () {
          try {
               const users = await this.userRepository.find()
               if(users.length <= 0){
                    throw new Error ('there are no users in the database');
               }
               return users.map ((user) => {
                    delete user.password
                    return user
               } )
          }
          catch (error) {
               throw new NotFoundException(error.message);
          }
     }

     async getUserById ( id : string ){
          try{
               const user = await this.userRepository.findOneBy({ id: id })
               if(!user){
                    throw new NotFoundException('Not Found');
               }
               delete user.password
               return user
          }
          catch (error) {
               if(error.status == 404){
                    throw new NotFoundException('the user does not exist');
               }
          }
     }

     async updateUser ( id : string, user : UpdateUser) {
          try {
               const userToUpdate = await this.userRepository.findOneBy({ id: id })
               if(!userToUpdate){
                    throw new NotFoundException('Not Found');
               }
               userToUpdate.username = user.username;
               const message = await this.userRepository.save(userToUpdate)
               return `user ${userToUpdate.username} updated successfully`
          }
          catch (error) {
               if(error.status == 404){
                    throw new NotFoundException('the user does not exist');
               }
          }
     }

     async deleteUser ( id : string ){
          try{
               const user = await this.userRepository.findOneBy({ id: id })
               if(!user){
                    throw new NotFoundException ('Not Found');
               } 
               const userDeleted = await this.userRepository.remove(user)
               return `user ${userDeleted.username} has been deleted succesfully`
          }
          catch (error) {
               throw new NotFoundException('the user does not exist');
          }
     }



}
