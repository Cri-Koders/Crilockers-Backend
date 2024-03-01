import { Injectable } from '@nestjs/common';
import { UserToLogin } from './dto/login.dto';

@Injectable()
export class LoginService {
     loginUser ( user : UserToLogin ){
          return user;
     }
}
