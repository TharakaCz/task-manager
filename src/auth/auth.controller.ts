import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, ValidationPipe } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { UpdateUserDTO } from './dto/update-user.dto';
import { Users } from './users.entity';
import { UserFilterDTO } from './dto/user-filter.dto';
import { CredentialDTO } from './dto/credential.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}
    
    @Post('user/sign-in')
    async login(@Body(ValidationPipe)credentialDTO: CredentialDTO):Promise<{accessToken:string}>{
        return await this.authService.authenticate(credentialDTO);
    }
    @Post('user/sign-up')
    async create(@Body(ValidationPipe)createUserDTO: CreateUserDTO):Promise<Users|null>{
        return await this.authService.createUser(createUserDTO);
    }

    @Patch('user/:id/update')
    async update(@Param('id', ParseIntPipe)id: number, @Body(ValidationPipe)updateUserDTO: UpdateUserDTO):Promise<Users|null>{
        return await this.authService.updateUser(id, updateUserDTO);
    }

    @Delete('user/:id/remove')
    async remove(@Param('id', ParseIntPipe)id: number):Promise<any| null>{
        return await this.authService.removeUser(id);
    }

    @Get('user/:id')
    async findUser(@Param('id', ParseIntPipe)id: number): Promise<Users|null>{
        return await this.authService.getUserByID(id);
    }

    @Get('users')
    async getAllUsers(@Body(ValidationPipe)userFilterDTO: UserFilterDTO):Promise<Users[]|null>{
        return await this.authService.getAllUsers(userFilterDTO);
    }
}
