import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import { TaskStatus } from "./task-status.enum";

@Entity()
export class Task extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column({length: 255, type: 'char'})
    title: string;
    @Column({type: 'text'})
    description: string;
    @Column({default: TaskStatus.TODO, type: `enum`, enum: TaskStatus})
    status: TaskStatus;
    @Column({nullable: true})
    created_by: number;
    @Column({nullable: true})
    updated_by: number;
    @DeleteDateColumn()
    deleted_at: Date;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;


}