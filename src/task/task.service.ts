import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { Task } from './task.interface';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { TaskRepository } from './task.repository';
import { Task as TaskEntity } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { FilterTaskDTO } from './dto/filter-task.dto';
import { DataSource } from 'typeorm';

@Injectable()
export class TaskService {
  private taskRepository: TaskRepository;

  constructor(private dataSource: DataSource) {
    this.taskRepository = new TaskRepository(dataSource);
  }
  
  async create(createTaskDTO: CreateTaskDTO): Promise<Task | null> {
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

  async update(id: number, updateTaskDTO: UpdateTaskDTO): Promise<Task | null> {
   
    const { title, description, status } = updateTaskDTO;
    try{
      const task = await this.findOne(id);
      task.title = title ?? task.title;
      task.description = description ?? task.description;
      task.status = status ?? TaskStatus.TODO;
      await this.taskRepository.update(task.id, task);
      return task;
    }catch(error){
      console.error(error);
      throw new InternalServerErrorException('Failed to update the task.');
    }
  }

  async remove(id: number): Promise<any> {
    const data = await this.findOne(id);
    const result = await this.taskRepository.softDelete(data.id);
    return result;
    
  }

  async findOne(id: number): Promise<Task | null> {
    const data = await this.taskRepository.findOneBy({ id: id });
    if (!data) {
      throw new NotFoundException(`Task with "${id}" not found`);
    }
    return data;
  }

  async getAll(filterTask: FilterTaskDTO): Promise<Task[] | null> {
    try {
      const result = await this.taskRepository.getTasks(filterTask);
      return result;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Task fetch fail');
    }
  }
}
