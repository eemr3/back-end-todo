import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '../shared/exceptions/unauthorized.exception';
export class AuthController {
  constructor(private authService: AuthService) {}

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const token = await this.authService.login(email, password);
      return res.status(200).json({
        access_token: token,
        status: 'success',
        statusCode: 200,
      });
    } catch (err) {
      const error = err as Error;
      if (err instanceof UnauthorizedException) {
        return res.status(401).json({
          statusCode: 401,
          message: error.message,
          error: 'Unauthorized',
        });
      }
      return res.status(500).json({ statusCode: 500, message: 'Internal server error' });
    }
  }
}
