import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as CONSTANT from '../constants.api';
import { Logger } from 'src/logger/logger';
import admin from 'src/main';

@Injectable()
export class FirebaseAuthService {
  constructor(private logger: Logger) {}

  private getToken(authToken: string): string {
    const match = authToken.match(/^Bearer (.*)$/);
    if (!match || match.length < 2) {
      throw new UnauthorizedException(CONSTANT.INVALID_BEARER_TOKEN);
    }
    return match[1];
  }

  public async authenticate(authToken: string): Promise<any> {
    const tokenString = this.getToken(authToken);
    try {
      const decodedToken: admin.auth.DecodedIdToken = await admin
        .auth()
        .verifyIdToken(tokenString);

      this.logger.info(`${JSON.stringify(decodedToken)}`);

      console.log(decodedToken);
      const { email, uid, role } = decodedToken;
      
      return { email, uid, role };
    } catch (err) {
      this.logger.error(`Ошибка аутенфикации ${err.message}`);
      throw new UnauthorizedException(err.message);
    }
  }
}
