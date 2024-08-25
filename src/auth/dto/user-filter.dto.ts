import { IsOptional } from "class-validator";

export class UserFilterDTO{
    @IsOptional()
    search: any;
}