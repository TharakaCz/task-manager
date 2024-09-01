import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Users } from "./users.entity";

export const GetUser = createParamDecorator((data: unknown, ctx: ExecutionContext):Promise<Users> => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },)