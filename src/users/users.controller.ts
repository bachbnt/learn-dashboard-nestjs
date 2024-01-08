import { Controller, UseGuards } from '@nestjs/common';
import { RolesGuard } from './roles.guard';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  getUsers() {
    return this.usersService.findAll();
  }
}
