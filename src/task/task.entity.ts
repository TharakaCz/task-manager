import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import { TaskStatus } from "./task-status.enum";
import { Users } from "src/auth/users.entity";

@Entity()
export class Tasks extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column({length: 255, type: 'char'})
    title: string;
    @Column({type: 'text'})
    description: string;
    @Column({default: TaskStatus.TODO, type: `enum`, enum: TaskStatus})
    status: TaskStatus;
    @ManyToOne(() => Users, user => user.task, {eager: false, nullable: true})
    user: Users;
    @ManyToOne(() => Users, { nullable: true })
    created_by: Users;
    @ManyToOne(() => Users, { nullable: true })
    updated_by: Users;
    @DeleteDateColumn()
    deleted_at: Date;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;

}