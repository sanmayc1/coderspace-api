import { JwtPayload } from "jsonwebtoken";
import { IJwtPayload } from "../../entities/services/jwt-service.interface.ts";



declare global{
    namespace Express{
        interface Request{
            user?:JwtPayload & IJwtPayload
        }
    }
}