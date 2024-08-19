import { IsNotEmpty, IsString } from "class-validator";

export class CreateClassDTO{
    @IsNotEmpty()
    @IsString()
    title: string;
    @IsNotEmpty()
    @IsString()
    description: string;
}