import { IsIn, IsOptional } from "class-validator";
import { TaskStatus } from "../task.interface";

export class FilterTaskDTO{
    @IsOptional()
    @IsIn([TaskStatus.TODO, TaskStatus.COMPLEATE, TaskStatus.IN_PROGRESS])
    status: TaskStatus;
    @IsOptional()
    search: string;
}