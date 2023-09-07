import express, { Application } from 'express';
import { PrismaService } from '../../../infra/database/prisma.service';
import { UserMySqlRepository } from '../../../user/repositories/user-mysql.repository';
import { UserService } from '../../../user/user.service';
import { AuthController } from '../../auth.controller';
import { JwtGenerate } from '../../jwt/jwt-generate';
import { AuthService } from '../../auth.service';

export class AuthRoutes {
  public routes: Application = express();
  private prisma = new PrismaService();
  private repository = new UserMySqlRepository(this.prisma);
  private userService = new UserService(this.repository);
  private jwtGenerate = new JwtGenerate();
  private authService = new AuthService(this.userService, this.jwtGenerate);
  private authController = new AuthController(this.authService);

  constructor() {
    this.login();
  }

  login() {
    this.routes.post('/login', this.authController.login.bind(this.authController));
  }
}
