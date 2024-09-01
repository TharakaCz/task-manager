import { Body, Injectable, InternalServerErrorException, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { DataSource } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { Users } from './users.entity';
import * as bcrypt  from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserFilterDTO } from './dto/user-filter.dto';
import { CredentialDTO } from './dto/credential.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interface/jwt-payload.interface';

@Injectable()
export class AuthService {
    private authRepository: AuthRepository;
    private logger: Logger;
    constructor(private datasource: DataSource, private jwtService: JwtService){
        this.authRepository = new AuthRepository(datasource);
        this.logger = new Logger();
    }

    async authenticate(credentialDTO: CredentialDTO):Promise<{accessToken:string}>{
        const user = await this.authRepository.findOneBy({'email': credentialDTO.email});
        if(!user){
            throw new NotFoundException(`User not found in ${credentialDTO.email} email`);
        }
        if(!await this.validatePassword(user, credentialDTO.password)){
            throw new UnauthorizedException('Invalid Credentials');
        }
        return await this.generateJWTToken(user);
    }

    async createUser(createUserDTO: CreateUserDTO):Promise<Users | null>{
        const {first_name, last_name, email, password} = createUserDTO;
        
        const user = new Users();
        user.user_uuid = uuidv4();
        user.name = `${first_name} ${last_name}`;
        user.email = email;
        user.password = await this.hasingPassword(password);
        try {
            await user.save();
            return user;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException();
        }
    }

    async getAllUsers(userFilterDTO: UserFilterDTO):Promise<Users[] | null>{
        try {
            const users = await this.authRepository.getUsers(userFilterDTO);
        return users;
        } catch (error) {
            console.log(error);
            
            throw new InternalServerErrorException();
        }
    }

    async getUserByID(id: number): Promise<Users | null>{
        const user = await this.authRepository.findOneBy({'id': id});
        if(!user){
            throw new NotFoundException(`User not found this id ${id}`);
        }
        return user;
    }

    async removeUser(id: number):Promise<any | null>{
        const user = await this.getUserByID(id);
        const result = await this.authRepository.softDelete(user.id);
        return result;
    }

    async updateUser(id: number, updateUserDTO: UpdateUserDTO):Promise<Users | null>{
        const user = await this.getUserByID(id);
        const {name, email} = updateUserDTO;
        user.name = name ?? user.name;
        user.email = email ?? user.email;
        try {
            await user.save();
            return user;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async validatePassword(user: Users, password: string): Promise<boolean|null>{
        const match = await bcrypt.compare(password, user.password);
        return match;
    }

    private async hasingPassword(password: string, rounds: number = 12):Promise<string | null>{
        const salt = await bcrypt.genSalt(rounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    }

    private async generateJWTToken(user: Users):Promise<{accessToken: string}>{
        const {name, email} = user;
        const payload: JwtPayload = {name, email};
        try {
            const accessToken = await this.jwtService.sign(payload);
            return {accessToken};
        } catch (error) {
            this.logger.error(`token generate : ${error}`)
            throw new InternalServerErrorException();
        }
    }
    
}
