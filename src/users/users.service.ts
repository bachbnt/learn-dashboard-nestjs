import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { _id: new ObjectId(id) } });
  }

  async findOne(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async create(user: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async update(
    id: string | ObjectId,
    updatedUser: Partial<User>,
  ): Promise<User> {
    await this.userRepository.update(id, updatedUser);
    return this.userRepository.findOne({ where: { _id: new ObjectId(id) } });
  }

  async delete(id: string | ObjectId): Promise<void> {
    await this.userRepository.delete(id);
  }
}
