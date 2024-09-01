import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CredentialDTO{
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email: string;
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(10)
    @IsString()
    password: string;
}