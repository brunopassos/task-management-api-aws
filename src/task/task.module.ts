import { forwardRef, Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService],
  imports: [TypeOrmModule.forFeature([TaskEntity, UserEntity])]
})
export class TaskModule {}
