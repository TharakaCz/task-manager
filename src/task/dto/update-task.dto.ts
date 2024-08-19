import { IsIn, IsOptional } from "class-validator";
import { TaskStatus } from "../task.interface";

export class UpdateTaskDTO{
    @IsOptional()
    title: string;
    @IsOptional()
    description: string;
    @IsOptional()
    status: TaskStatus
}