import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy, ExtractJwt} from "passport-jwt";
import { jwtConfig } from "src/config/jwt.config";
import { JwtPayload } from "./interface/jwt-payload.interface";
import { Users } from "./users.entity";
import { AuthRepository } from "./auth.repository";
import { DataSource } from "typeorm";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    private authRepository: AuthRepository;
    constructor(private dataSource: DataSource){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConfig.secret,
        });
        this.authRepository = new AuthRepository(dataSource);
    }

    async validate(payload: JwtPayload):Promise<Users>{
        const {email} = payload;
        const user = await this.authRepository.findOneBy({'email': email});
        if(!user){
            throw new UnauthorizedException();
        }    
        return user;
    }
}