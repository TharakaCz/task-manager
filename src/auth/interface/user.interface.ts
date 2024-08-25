import { AvatarTypes } from "../avatar-types.enum";

export class UserInterface{
    id: number;
    user_uuid: string;
    name: string;
    email: string;
    avatar: AvatarTypes;
    avatar_path: string;
    created_at: Date;
    updated_at: Date;
}