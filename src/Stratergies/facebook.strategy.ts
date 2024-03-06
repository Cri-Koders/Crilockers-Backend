import { Injectable } from "@nestjs/common";
import { Profile, Strategy } from 'passport-facebook'
import { PassportStrategy } from "@nestjs/passport";

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
     constructor() {
          super({
               clientID: process.env.FB_ID,
               clientSecret: process.env.FB_ID_SECRET,
               callbackURL: process.env.FB_CALLBACK,
               scope: 'email',
               profileFields: ['emails', 'name']
          })
     }

     async validate(
          accessToken: string, 
          efreshToken: string, 
          profile: Profile, 
          done: (err: any, user?: any, info?: any) => void): Promise<any> {
               const { name, emails } = profile
               const user = {
                    email: emails[0].value,
                    firstName: name.givenName,
                    lastName: name.familyName,
                    image: profile.photos
               }
               const payload = {
                    user,
                    accessToken
               }

               done(null, payload)
     }
}