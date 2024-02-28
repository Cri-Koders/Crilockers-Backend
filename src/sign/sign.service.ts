import { Injectable } from '@nestjs/common';
import { UserToSign } from './dto/sign.dto';

@Injectable()
export class SignService {

     signupUser ( user : UserToSign) {
          return user
     }
}
