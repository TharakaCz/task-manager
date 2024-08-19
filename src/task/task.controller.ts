import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task, TaskStatus } from './task.interface';
import { CreateClassDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';

@Controller('task')
export class TaskController {

    constructor(private taskService: TaskService){}

    @Get('all')
    async getAll(): Promise<Task[]>{
        return this.taskService.getAll();
    }

    @Post('create')
    async create(@Body() createTaskDTO: CreateClassDTO): Promise<Task>{
        return this.taskService.create(createTaskDTO);
    }

    @Patch(':id/update')
    async update(@Param('id') id: string, @Body() updateTaskDIO: UpdateTaskDTO): Promise<Task>{
        return this.taskService.update(id, updateTaskDIO);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Task>{
        return this.taskService.findOne(id);
    }

    @Delete(':id/remove')
    async remove(@Param('id') id: string): Promise<boolean>{
        this.taskService.remove(id);
        return true;
    }
}
