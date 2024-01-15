import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { _id: id } });
  }

  async findOne(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async create(user: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async update(id: string, updatedUser: Partial<User>): Promise<User> {
    await this.userRepository.update(id, updatedUser);
    return this.userRepository.findOne({ where: { _id: id } });
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
