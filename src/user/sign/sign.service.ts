import { Injectable } from '@nestjs/common';
import { UserToSign } from './dto/sign.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/Entitys/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SignService {

     constructor( 
          @InjectRepository(User)
          private userRepository: Repository<User>
     ){}
     async signupUser ( user : UserToSign) {
          const newUser = await this.userRepository.save(user)
          return `${newUser.username} saved successfully`
     }

     async getUsers () {
          const users = await this.userRepository.find()
          return users
     }
}
