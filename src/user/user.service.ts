import { Injectable } from '@nestjs/common';
import { UserToSign } from './sign/dto/sign.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/Entitys/user.entity';
import { Repository } from 'typeorm';
import { UserToLogin } from './login/dto/login.dto';

@Injectable()
export class UserService {
     constructor(
          @InjectRepository(User)
          private userRepository: Repository<User>
     ){}

     async signupUser ( user : UserToSign) {
          const newUser = await this.userRepository.save(user)
          return `${newUser.username} saved successfully`
     }
     async loginUser ( user : UserToLogin ){
          const loggedUser = await this.userRepository.findOneBy({ email: user.email })
          return loggedUser ? loggedUser : 'any of the credentials do not match '
     }

     async getUsers () {
          const users = await this.userRepository.find()
          return users
     }

}
