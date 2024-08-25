import {DataSource, Repository } from "typeorm";
import { Task } from "./task.entity";
import { FilterTaskDTO } from "./dto/filter-task.dto";

export class TaskRepository extends Repository<Task>{

    constructor(private dataSource: DataSource) {
        super(Task, dataSource.createEntityManager());
    }
    
    async getTasks(filterTaskDTO: FilterTaskDTO):Promise<Task[] | null>{
        const {status, search} = filterTaskDTO;
        const query = this.createQueryBuilder('task');
        if (status) {
            query.andWhere('task.status = :status', { status });
        }
        if (search) {
            query.andWhere(
                '(task.title LIKE :search OR task.description LIKE :search)',
                { search: `%${search}%` }
            );
        }
        const tasks = await query.getMany();
        return tasks;
    }
}