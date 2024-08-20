import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { Task } from './task.interface';
import { CreateClassDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { FilterTaskDTO } from './dto/filter-task.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task as TaskEntity } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { log } from 'console';

@Injectable()
export class TaskService {
  // private tasks: Task[] = [];

  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository
  ) {}
  
  async create(createTaskDTO: CreateClassDTO): Promise<Task> {
    const { title, description } = createTaskDTO;
    const task = new TaskEntity();
    task.title = title;
    task.description = description;
    try {
      await task.save();
      return task;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to save the task.');
    }
  }

  async update(id: number, updateTaskDTO: UpdateTaskDTO): Promise<Task> {
   
    const { title, description, status } = updateTaskDTO;
    try{
      const task = await this.findOne(id);
      task.title = title ?? task.title;
      task.description = description ?? task.description;
      task.status = status ?? TaskStatus.TODO;
      return task;
    }catch(error){
      console.error(error);
      throw new InternalServerErrorException('Failed to update the task.');
    }
  }

  async remove(id: number): Promise<void> {
    const data = await this.findOne(id);
    console.log(data);
    
    // const result = await this.taskRepository.delete(data.id);
    // this.logger.log(result)
    
  }

  async findOne(id: number): Promise<Task> {
    const data = await this.taskRepository.findOneBy({ id: id });
    if (!data) {
      throw new NotFoundException(`Task with "${id}" not found`);
    }
    return data;
  }

  // async getAll(filterTask: FilterTaskDTO): Promise<Task[]> {
  //   if (Object.keys(filterTask).length) {
  //     const { search, status } = filterTask;
  //     let taskQueue = this.tasks;
  //     if (search) {
  //       taskQueue = taskQueue.filter(
  //         (task) =>
  //           task.title.includes(search) || task.description.includes(search),
  //       );
  //     }
  //     if (status) {
  //       taskQueue = taskQueue.filter((task) => task.status === status);
  //     }
  //     return taskQueue;
  //   } else {
  //     return this.tasks;
  //   }
  // }
}
