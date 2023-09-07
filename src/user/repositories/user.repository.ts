import { CreateUserDto } from '../dtos/create-user.dto';
import { UserByEmailResponse, UserResponse } from '../interface/user-response';

export interface UserRepository {
  create(userData: CreateUserDto): Promise<any>;
  findAll(): Promise<UserResponse[]>;
  findOne(id: number): Promise<UserResponse>;
  findByEmail(email: string): Promise<UserByEmailResponse | null>;
  update(id: number, data: any): Promise<any>;
}
