import { TaskCreateResponse } from '../interface/task';

export interface TaskRepository {
  createTask(taks: any): Promise<TaskCreateResponse>;
  findAllTask(id: number): Promise<any>;
  findOneTask(id: number): Promise<any>;
  updateTask(id: number, data: any): Promise<any>;
  deleteTask(id: number): Promise<any>;
}
