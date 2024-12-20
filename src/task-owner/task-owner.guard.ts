import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { TaskService } from 'src/task/task.service';

@Injectable()
export class TaskOwnerGuard implements CanActivate {
  constructor(private readonly taskService: TaskService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user;
    const taskId = request.params?.id;

    if (!user || !taskId) {
      throw new ForbiddenException('User or task ID not provided');
    }

    const task = await this.taskService.findOne(taskId)

    if (!task || task.user.id !== user.sub) {
      throw new ForbiddenException('You do not have permission to access this resource');
    }

    return true;
  }
}
