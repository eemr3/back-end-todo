import { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { JwtGenerate } from '../jwt/jwt-generate';

const secretOrKey = process.env.JWT_SECRET || 'secret';

export interface RequestWithUser extends Request {
  user?: string | JwtPayload;
}

export class AuthMiddleware {
  authMiddleware(req: RequestWithUser, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const jwtGenerate = new JwtGenerate();

    if (!token) {
      return res.status(401).json({
        statusCode: 401,
        message: 'No token provided',
        error: 'Unauthorized',
      });
    }

    const decoded = jwtGenerate.decodedJwt(token, secretOrKey);
    if (!decoded) {
      return res.status(401).json({
        statusCode: 401,
        message: 'Unauthorized user',
        error: 'Unauthorized',
      });
    }

    req.user = decoded;

    next();
  }
}
