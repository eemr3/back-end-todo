import { CreateUserDto } from './dtos/create-user.dto';
import { UserRepository } from './repositories/user.repository';

export class UserService {
  constructor(private repository: UserRepository) {}

  async create(userData: CreateUserDto) {
    return await this.repository.create(userData);
  }

  async findAll() {
    return await this.repository.findAll();
  }

  async findOne(id: number) {
    return await this.repository.findOne(id);
  }

  async findByEmail(email: string) {
    return await this.repository.findByEmail(email);
  }

  async update(id: number, data: any) {
    return await this.repository.update(id, data);
  }
}
