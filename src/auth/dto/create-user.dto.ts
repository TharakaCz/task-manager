import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDTO{
    @IsNotEmpty()
    @IsString()
    first_name: string;
    @IsOptional()
    @IsString()
    last_name: string;
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(10)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
    password: string;
}