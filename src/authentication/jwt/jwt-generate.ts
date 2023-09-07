import * as jwt from 'jsonwebtoken';

export class JwtGenerate {
  generateJwt(userInfo: any, expiresIn: number, secretOrKey: string) {
    const payload = {
      sub: userInfo.id,
      name: userInfo.name,
      email: userInfo.email,
    };

    return jwt.sign(payload, secretOrKey, { expiresIn });
  }

  decodedJwt(token: string, secretOrKey: string) {
    try {
      return jwt.verify(token, secretOrKey);
    } catch (error) {
      return false;
    }
  }
}
