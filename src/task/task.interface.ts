import { TaskStatus } from "./task-status.enum";

export interface Task {
    id: number,
    title: string,
    description: string | null,
    status: TaskStatus,
    created_by: number | null,
    updated_by: number | null,
    deleted_at: Date | null,
    created_at: Date | null,
    updated_at: Date | null,
}