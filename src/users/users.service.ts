import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class UsersService {
  users: { userId: number; email: string; password: string }[];

  constructor() {
    this.users = [
      {
        userId: 1,
        email: 'john',
        password: 'changeme',
      },
      {
        userId: 2,
        email: 'maria',
        password: 'guess',
      },
    ];
  }

  async findAll() {
    return this.users;
  }

  async findOne(email: string) {
    return this.users.find((user) => user.email === email);
  }

  async create(email: string, password: string) {
    const user = {
      userId: Math.random() * 3,
      email,
      password,
    };

    this.users.push(user);

    return user;
  }
}
