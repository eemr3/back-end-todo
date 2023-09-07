import { TaskRepository } from './repositories/task.repository';

export class TaskService {
  constructor(private taskRepository: TaskRepository) {}

  async createTask(task: any) {
    return await this.taskRepository.createTask(task);
  }

  async findAllTask(id: number) {
    return await this.taskRepository.findAllTask(id);
  }

  async findOneTask(id: number) {
    return await this.taskRepository.findOneTask(id);
  }

  async updateTask(id: number, data: any) {
    return await this.taskRepository.updateTask(id, data);
  }

  async deleteTask(id: number) {
    return await this.taskRepository.deleteTask(id);
  }
}
