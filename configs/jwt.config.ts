import * as jwt from "jsonwebtoken";

export class JwtConfig {

    public static async generateToken(id: number) {
        return await jwt.sign({data: id}, "secret", {expiresIn: "23h"});
    }

}