import { Injectable } from '@nestjs/common';
import { UserToSign } from './sign/dto/sign.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/Entitys/user.entity';
import { Repository } from 'typeorm';
import { UserToLogin } from './login/dto/login.dto';
import * as bcrypt from 'bcrypt'
@Injectable()
export class UserService {
     constructor(
          @InjectRepository(User)
          private userRepository: Repository<User>
     ){}

     async signupUser ( user : UserToSign) {
          try {
               const newUser = new User();
               const salt = await bcrypt.genSalt()
               newUser.username = user.username;
               newUser.email = user.email;
               newUser.password = await bcrypt.hash( user.password, salt )
               const message = await this.userRepository.save(newUser)
               console.log(message);
               console.log(user)
               return `user ${newUser.username} created successfully`
          }
          catch (error) {
               return error.message;
          }
     }
     async loginUser ( user : UserToLogin ){
          try {
               const loggedUser = await this.userRepository.findOneBy({ email: user.email })
               if ( !loggedUser ) throw new Error ('the email does not match any in the database');

               const isMatch = await bcrypt.compare(user.password, loggedUser.password)

               if ( !isMatch ) throw new Error ('the password does not match');
               return loggedUser;
          }
          catch (error) {
               console.error(error);
               return error.message;
          }
     }

     async getUsers () {
          const users = await this.userRepository.find()
          return users
     }

}
