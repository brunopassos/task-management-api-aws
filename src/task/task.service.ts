import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto, TaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { randomUUID } from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class TaskService {

  constructor(
    @InjectRepository(TaskEntity)
    private readonly tasksRepository: Repository<TaskEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ){}

  async create(createTaskDto: CreateTaskDto, userId: string): Promise<TaskEntity> {
    console.log(userId)
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const task = new TaskEntity();
    task.id = randomUUID();
    task.title = createTaskDto.title;
    task.description = createTaskDto.description;
    task.status = createTaskDto.status;
    task.expirationDate = createTaskDto.expirationDate;
    task.user = user;

    await this.tasksRepository.save(task);

    return task
  }

  async findAllUserTasks(userId: string): Promise<TaskEntity[]>{
    const userFound = await this.userRepository.findOne({ where: { id: userId } });

    const userTasks = await this.tasksRepository.find({
      where: {user: userFound}
    })

    return userTasks
  }

  async findOne(id: string): Promise<TaskEntity> {
    const taskFound = await this.tasksRepository.findOne({ where: { id }, relations: ['user'] })
    
    if(!taskFound){
      throw new HttpException(`Task not found`, HttpStatus.NOT_FOUND)
    }

    return taskFound
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<TaskEntity> {
    const taskFound = await this.tasksRepository.findOne({ where: { id } })
    
    if(!taskFound){
      throw new HttpException(`Task not found`, HttpStatus.NOT_FOUND)
    }

    taskFound.title = updateTaskDto.title ?? taskFound.title
    taskFound.description = updateTaskDto.description ?? taskFound.description
    taskFound.expirationDate = updateTaskDto.expirationDate ?? taskFound.expirationDate
    taskFound.status = updateTaskDto.status ?? taskFound.status

    await this.tasksRepository.update(taskFound.id, taskFound)

    return taskFound
  }

  async remove(id: string): Promise<void>  {
    const taskFound = await this.tasksRepository.findOne({
      where: {id}
    })
    
    if(!taskFound){
      throw new HttpException(`Task not found`, HttpStatus.NOT_FOUND)
    }

    await this.tasksRepository.delete(id)
  }
}
