import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.interface';
import { v1 as uuid } from 'uuid';
import { CreateClassDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';

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
    const task = this.findOne(id);
    const {title, description, status} = updateTaskDTO;
    (await task).title = title ?? (await task).title;
    (await task).description = description ?? (await task).description;
    (await task).status = status ?? TaskStatus.TODO;
    (await task).updated_at = Date.now().toString();
    return task;
  }

  async remove(id: string): Promise<void> {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  async findOne(id: string): Promise<Task> {
    return this.tasks.find((task) => task.id === id);
  }

  async getAll(): Promise<Task[]> {
    return this.tasks;
  }
}
