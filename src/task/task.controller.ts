import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.interface';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { FilterTaskDTO } from './dto/filter-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation/task-status-validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { Users } from 'src/auth/users.entity';

@Controller('task')
@UseGuards(AuthGuard())
export class TaskController {

    constructor(private taskService: TaskService){}

    @Get('all')
    async getAll(@Query(ValidationPipe) filterTask: FilterTaskDTO): Promise<Task[]>{
        return this.taskService.getAll(filterTask);
    }

    @Post('create')
    @UsePipes(ValidationPipe)
    async create(@GetUser() user: Users, @Body() createTaskDTO: CreateTaskDTO): Promise<any| null>{
        return this.taskService.create(createTaskDTO, user);
    }

    @Patch(':id/update')
    async update(@Param('id', ParseIntPipe) id: number, @Body(TaskStatusValidationPipe, ValidationPipe) updateTaskDIO: UpdateTaskDTO): Promise<Task | null>{
        return this.taskService.update(id, updateTaskDIO);
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Task | null>{
        return this.taskService.findOne(id);
    }

    @Delete(':id/remove')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<boolean>{
        this.taskService.remove(id);
        return true;
    }
}
