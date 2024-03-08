import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserToSign } from '../auth/dto/sign.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/Entitys/user.entity';
import { Repository } from 'typeorm';
import { UserToLogin } from '../auth/dto/login.dto';
import * as bcrypt from 'bcrypt'
import { UpdateUser } from './dto/updateUser.dto';
import { JwtService } from '@nestjs/jwt';
import { userLoginWFacebook } from '../auth/dto/loginFacebook.dto';
import { randomBytes } from 'crypto';
@Injectable()
export class UserService {
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
               const message = await this.userRepository.save(newUser)
               return `user ${newUser.username} created successfully`
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
               return {
                    loggedUser,
                    token
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


}
