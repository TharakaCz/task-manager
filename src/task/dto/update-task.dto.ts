import { TaskStatus } from "../task.interface";

export class UpdateTaskDTO{
    title: string;
    description: string;
    status: TaskStatus
}