import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards, Req } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { TaskOwnerGuard } from 'src/task-owner/task-owner.guard';

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto, @Req() request: Request) {
    const userId = request.user?.sub
    return await this.taskService.create(createTaskDto, userId);
  }

  @Get()
  async findAll(@Req() request: Request) {
    const userId = request.user?.sub
    return await this.taskService.findAllUserTasks(userId);
  }

  @UseGuards(TaskOwnerGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.taskService.findOne(id);
  }

  @UseGuards(TaskOwnerGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return await this.taskService.update(id, updateTaskDto);
  }

  @UseGuards(TaskOwnerGuard)
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    return await this.taskService.remove(id);
  }
}
