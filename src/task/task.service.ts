import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.interface';
import { v1 as uuid } from 'uuid';
import { CreateClassDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { FilterTaskDTO } from './dto/filter-task.dto';

@Injectable()
export class TaskService {
  private tasks: Task[] = [];

  async create(createTaskDTO: CreateClassDTO): Promise<Task> {
    const { title, description } = createTaskDTO;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.TODO,
      created_by: null,
      updated_by: null,
      deleted_at: null,
      created_at: Date.now().toString(),
      updated_at: null,
    };
    this.tasks.push(task);
    return task;
  }

  async update(id: string, updateTaskDTO: UpdateTaskDTO): Promise<Task> {
    const task = await this.findOne(id);
    const { title, description, status } = updateTaskDTO;
    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.status = status ?? TaskStatus.TODO;
    task.updated_at = Date.now().toString();
    return task;
  }

  async remove(id: string): Promise<void> {
    const data = await this.findOne(id);
    this.tasks = this.tasks.filter((task) => task.id !== data.id);
  }

  async findOne(id: string): Promise<Task> {
    const data = this.tasks.find((task) => task.id === id);
    if(!data){
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return data;
  }

  async getAll(filterTask: FilterTaskDTO): Promise<Task[]> {
    if (Object.keys(filterTask).length) {
      const { search, status } = filterTask;
      let taskQueue = this.tasks;
      if (search) {
        taskQueue = taskQueue.filter(
          (task) =>
            task.title.includes(search) || task.description.includes(search),
        );
      }
      if (status) {
        taskQueue = taskQueue.filter((task) => task.status === status);
      }
      return taskQueue;
    } else {
      return this.tasks;
    }
  }
}
