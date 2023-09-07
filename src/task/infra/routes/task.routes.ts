import express, { Application } from 'express';
import { PrismaService } from '../../../infra/database/prisma.service';
import { TaskMySqlRepository } from '../../repositories/task-mysql.repository';
import { TaskService } from '../../task.service';
import { TaskController } from '../../task.controller';
import { AuthMiddleware } from '../../../authentication/middleware/auth.middleware';
import { TaskSerialize } from '../../serialize/task.serialize';

export class TaskRoutes {
  public routes: Application = express();
  private authMiddleware = new AuthMiddleware();
  private prisma = new PrismaService();
  private serialize = new TaskSerialize();
  private repository = new TaskMySqlRepository(this.prisma, this.serialize);
  private taskService = new TaskService(this.repository);
  private taskController = new TaskController(this.taskService);

  constructor() {
    this.createNewTask();
    this.findAllTask();
    this.findOneTask();
    this.updateTask();
    this.deleteTask();
  }

  createNewTask() {
    this.routes.post(
      '/tasks',
      this.authMiddleware.authMiddleware.bind(this.authMiddleware),
      this.taskController.createTask.bind(this.taskController),
    );
  }

  findAllTask() {
    this.routes.get(
      '/tasks',
      this.authMiddleware.authMiddleware.bind(this.authMiddleware),
      this.taskController.findAllTask.bind(this.taskController),
    );
  }

  findOneTask() {
    this.routes.get(
      '/tasks/:id',
      this.authMiddleware.authMiddleware.bind(this.authMiddleware),
      this.taskController.findOneTask.bind(this.taskController),
    );
  }

  updateTask() {
    this.routes.put(
      '/tasks/:id',
      this.authMiddleware.authMiddleware.bind(this.authMiddleware),
      this.taskController.updateTask.bind(this.taskController),
    );
  }

  deleteTask() {
    this.routes.delete(
      '/tasks/:id',
      this.authMiddleware.authMiddleware.bind(this.authMiddleware),
      this.taskController.deleteTask.bind(this.taskController),
    );
  }
}
