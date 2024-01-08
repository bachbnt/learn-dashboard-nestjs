import { Injectable } from '@nestjs/common';

export type User = any;
@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      email: 'bach@gmail.com',
      password: 'test@123',
      role: 'admin',
    },
    {
      userId: 2,
      email: 'maria',
      password: '123@test',
      role: 'user',
    },
  ];

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }
}
