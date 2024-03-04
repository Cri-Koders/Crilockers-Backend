import { IsNotEmpty, MinLength, IsString, IsEmail } from "class-validator";

export class UserToSign {

     @IsNotEmpty()
     @IsString()
     @MinLength(3)
     username: string;

     @IsNotEmpty()
     @IsString()
     @IsEmail()
     email: string;
     
     @IsNotEmpty()
     @MinLength(6)
     @IsString()
     password: string;
}