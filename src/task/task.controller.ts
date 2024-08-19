import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task, TaskStatus } from './task.interface';
import { CreateClassDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { FilterTaskDTO } from './dto/filter-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation/task-status-validation.pipe';

@Controller('task')
export class TaskController {

    constructor(private taskService: TaskService){}

    @Get('all')
    async getAll(@Query(ValidationPipe) filterTask: FilterTaskDTO): Promise<Task[]>{
        return this.taskService.getAll(filterTask);
    }

    @Post('create')
    @UsePipes(ValidationPipe)
    async create(@Body() createTaskDTO: CreateClassDTO): Promise<Task>{
        return this.taskService.create(createTaskDTO);
    }

    @Patch(':id/update')
    async update(@Param('id') id: string, @Body(TaskStatusValidationPipe, ValidationPipe) updateTaskDIO: UpdateTaskDTO): Promise<Task>{
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
