import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AvatarTypes } from "./avatar-types.enum";

@Entity()
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({nullable: true})
    user_uuid: string;
    @Column({type: `char`, length: 100})
    name: string;
    @Column({type: `char`, length: 100, unique: true})
    email: string;
    @Column({type: `char`, length: 100})
    password: string;
    @Column({default: AvatarTypes.GRAVATAR, nullable: true, type: `enum`, enum: AvatarTypes})
    avatar: AvatarTypes;
    @Column({type: `char`, length: 255, nullable: true})
    avatar_path: string;
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
