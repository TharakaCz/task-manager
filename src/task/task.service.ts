import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { TaskRepository } from './task.repository';
import { Tasks } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { FilterTaskDTO } from './dto/filter-task.dto';
import { DataSource } from 'typeorm';
import { Users } from 'src/auth/users.entity';

@Injectable()
export class TaskService {
  private taskRepository: TaskRepository;
  private logger: Logger;
  constructor(private dataSource: DataSource) {
    this.taskRepository = new TaskRepository(dataSource);
    this.logger = new Logger('TaskController');
  }
  
  async create(createTaskDTO: CreateTaskDTO, user: Users): Promise<Tasks> {
    const { title, description } = createTaskDTO;
    const task = new Tasks();
    task.title = title;
    task.description = description;
    task.user = user;
    task.created_by = user;
    try {
      await task.save();
      return task;
    } catch (error) {
      this.logger.error(`Create user ${error}`);
      throw new InternalServerErrorException('Failed to save the task.');
    }
  }

  async update(id: number, updateTaskDTO: UpdateTaskDTO): Promise<Tasks | null> {
   
    const { title, description, status } = updateTaskDTO;
    try{
      const task = await this.findOne(id);
      task.title = title ?? task.title;
      task.description = description ?? task.description;
      task.status = status ?? TaskStatus.TODO;
      await this.taskRepository.update(task.id, task);
      return task;
    }catch(error){
      this.logger.error(`Update user ${error}`);
      throw new InternalServerErrorException('Failed to update the task.');
    }
  }

  async remove(id: number): Promise<any> {
    const data = await this.findOne(id);
    try {
      const result = await this.taskRepository.softDelete(data.id);
    return result;
    } catch (error) {
      this.logger.error(`Remove task : ${error}`);
      throw new InternalServerErrorException(); 
    }
  }

  async findOne(id: number): Promise<Tasks | null> {
    const data = await this.taskRepository.findOneBy({id});
    if (!data) {
      throw new NotFoundException(`Task with "${id}" not found`);
    }
    return data;
  }

  async getAll(filterTask: FilterTaskDTO): Promise<Tasks[] | null> {
    try {
      const result = await this.taskRepository.getTasks(filterTask);
      return result;
    } catch (error) {
      this.logger.error(`getall user ${error}`);
      throw new InternalServerErrorException('Task fetch fail');
    }
  }
}
