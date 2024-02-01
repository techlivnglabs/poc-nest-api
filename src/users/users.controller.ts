import { Controller, Get, UseGuards } from '@nestjs/common';

import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Public } from 'src/auth/decorators';

@Public()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }
}
