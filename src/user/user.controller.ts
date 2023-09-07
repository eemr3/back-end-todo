import { Request, Response } from 'express';
import { UserService } from './user.service';
import { ConflictException } from '../shared/exceptions/conflict.exception';
import { CreateUserDto } from './dtos/create-user.dto';
import { NotFoundException } from '../shared/exceptions/not-found.exception';
import { RequestWithUser } from '../authentication/middleware/auth.middleware';

export class UserController {
  constructor(private userService: UserService) {}

  async createUser(req: Request, res: Response) {
    const data: CreateUserDto = req.body;

    try {
      const newUser = await this.userService.create(data);
      return res.status(201).json(newUser);
    } catch (err) {
      const error = err as Error;

      if (err instanceof ConflictException) {
        return res.status(409).json({
          statusCode: 409,
          message: error.message,
          error: 'Conflict',
        });
      }

      return res.status(500).json({
        statusCode: 500,
        message: 'Internal server error',
      });
    }
  }

  async findAll(req: Request, res: Response) {
    return res.status(200).json(await this.userService.findAll());
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const user = await this.userService.findOne(Number(id));
      return res.status(200).json(user);
    } catch (err) {
      const error = err as Error;

      if (err instanceof NotFoundException) {
        return res.status(404).json({
          statusCode: 404,
          message: error.message,
          error: 'Not Found',
        });
      }

      return res.status(500).json({
        statusCode: 500,
        message: 'Internal server error',
      });
    }
  }

  async getMe(req: RequestWithUser, res: Response) {
    const sub = req.user?.sub;
    try {
      const user = await this.userService.findOne(Number(sub));
      return res.status(200).json(user);
    } catch (err) {
      const error = err as Error;

      if (err instanceof NotFoundException) {
        return res.status(404).json({
          statusCode: 404,
          message: error.message,
          error: 'Not Found',
        });
      }

      return res.status(500).json({
        statusCode: 500,
        message: 'Internal server error',
      });
    }
  }
}
