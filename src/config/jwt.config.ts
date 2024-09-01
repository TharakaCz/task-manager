import * as config from "config";

const secureConfig = config.get('jwt');

export const jwtConfig = {
    'secret': process.env.SECRET || secureConfig.secret,
    'expireseIn': process.env.EXPIRES_IN || secureConfig.expireseIn,
}