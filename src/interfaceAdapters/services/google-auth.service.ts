import passport,{PassportStatic} from "passport";
import { IGoogleAuthService } from "../../domain/services/google-auth-service.interface.js";
import {
  Strategy as GoogleStrategy,
  VerifyCallback,
} from "passport-google-oauth20";
import { config } from "../../shared/config.js";
import {  injectable } from "tsyringe";

@injectable()
export class GoogleAuthService implements IGoogleAuthService {
  private passport: passport.PassportStatic;
  constructor() {
    this.passport = passport;

    this.passport.use(
      new GoogleStrategy(
        {
          clientID: `${config.google.clientId}`,
          clientSecret: `${config.google.secret}`,
          callbackURL: config.google.callbackUrl,
        },
        async (
          accessToken: string,
          refreshToken: string,
          profile: any,
          done: VerifyCallback
        ) => {
           
          done(null, profile);
        }
      )
    );
  }

  getPassport():PassportStatic{
    return this.passport;
  }
}
