import { PrismaService } from '../../infra/database/prisma.service';
import { NotFoundException } from '../../shared/exceptions/not-found.exception';
import { TaskCreateResponse, TaskGetResponse } from '../interface/task';
import { TaskSerialize } from '../serialize/task.serialize';
import { TaskRepository } from './task.repository';

export class TaskMySqlRepository implements TaskRepository {
  constructor(private prismaService: PrismaService, private serialize: TaskSerialize) {}

  async createTask(taks: any): Promise<TaskCreateResponse> {
    return await this.prismaService.todo.create({ data: taks });
  }

  async findAllTask(id: number): Promise<TaskGetResponse[]> {
    return (
      await this.prismaService.todo.findMany({
        where: { userId: id },
        include: { User: true },
      })
    ).map((task) => this.serialize.dbToResponseGet(task));
  }

  async findOneTask(id: number): Promise<TaskGetResponse> {
    const task = await this.prismaService.todo.findFirst({
      where: { id },
      include: { User: true },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return this.serialize.dbToResponseGet(task);
  }

  async updateTask(id: number, data: any): Promise<any> {
    const taskExists = await this.prismaService.todo.findUnique({ where: { id } });
    if (!taskExists) {
      throw new NotFoundException('Task not found');
    }

    return await this.prismaService.todo.update({ where: { id }, data });
  }

  async deleteTask(id: number): Promise<any> {
    const taskExists = await this.prismaService.todo.findUnique({ where: { id } });
    if (!taskExists) {
      throw new NotFoundException('Task not found');
    }

    return await this.prismaService.todo.delete({ where: { id } });
  }
}
