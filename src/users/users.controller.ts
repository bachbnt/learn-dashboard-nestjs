import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { RolesGuard } from './roles.guard';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from './entities/user.entity';

@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<User> {
    return this.usersService.findById(id);
  }

  @Post()
  async create(@Body() user: User): Promise<User> {
    return this.usersService.create(user);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatedUser: Partial<User>,
  ): Promise<User> {
    return this.usersService.update(id, updatedUser);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.usersService.delete(id);
  }
}
