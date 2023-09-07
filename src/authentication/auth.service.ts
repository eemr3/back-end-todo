import { UnauthorizedException } from '../shared/exceptions/unauthorized.exception';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtGenerate } from './jwt/jwt-generate';
export class AuthService {
  private jwtSecret = process.env.JWT_SECRET || 'secret';
  private jwtExpiresIn = Number(process.env.JWT_EXPIRES_IN) || 3600;
  constructor(
    private readonly userService: UserService,
    private jwtGenerate: JwtGenerate,
  ) {}

  async login(user: string, password: string) {
    const userFound = await this.validateUser(user, password);
    if (!userFound) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtGenerate.generateJwt(
      userFound,
      this.jwtExpiresIn,
      this.jwtSecret,
    );

    return {
      access_token: token,
    };
  }

  private async validateUser(email: string, password: string) {
    const userFound = await this.userService.findByEmail(email);
    if (userFound) {
      const passwordMatch = await bcrypt.compare(password, userFound.password);
      if (passwordMatch) {
        return userFound;
      }
    }

    return null;
  }
}
