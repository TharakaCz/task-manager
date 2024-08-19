export interface Task {
    id: string,
    title: string,
    description: string | null,
    status: TaskStatus,
    created_by: string | null,
    updated_by: string | null,
    deleted_at: string | null,
    created_at: string | null,
    updated_at: string | null,
}

export enum TaskStatus{
    TODO = "TODO",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLEATE = "COMPLEATE",
}