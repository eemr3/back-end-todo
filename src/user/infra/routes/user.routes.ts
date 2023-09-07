import express, { Application } from 'express';
import { PrismaService } from '../../../infra/database/prisma.service';
import { UserMySqlRepository } from '../../repositories/user-mysql.repository';
import { UserController } from '../../user.controller';
import { UserService } from '../../user.service';
import { validationMiddleware } from '../../middleware/validation.middleware';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { AuthMiddleware } from '../../../authentication/middleware/auth.middleware';

export class UserRouter {
  public routes: Application = express();
  private prisma = new PrismaService();
  private repository = new UserMySqlRepository(this.prisma);
  private service = new UserService(this.repository);
  private controller = new UserController(this.service);
  private authMiddleware = new AuthMiddleware();

  constructor() {
    this.createNewUser();
    this.getMe();
    this.findAll();
    this.findById();
  }

  createNewUser() {
    this.routes.post(
      '/users',
      validationMiddleware(CreateUserDto),
      this.controller.createUser.bind(this.controller),
    );
  }
  findById() {
    this.routes.get(
      '/users/:id',
      this.authMiddleware.authMiddleware.bind(this.authMiddleware),
      this.controller.findById.bind(this.controller),
    );
  }

  getMe() {
    this.routes.get(
      '/users/profile',
      this.authMiddleware.authMiddleware.bind(this.authMiddleware),
      this.controller.getMe.bind(this.controller),
    );
  }

  findAll() {
    this.routes.get(
      '/users',
      this.authMiddleware.authMiddleware.bind(this.authMiddleware),
      this.controller.findAll.bind(this.controller),
    );
  }
}
