import { IJwtPayload } from "../domain/entities/jwt-payload.enitity.ts";


declare global {
  namespace Express {
    interface User extends IJwtPayload{
      
    }
  }
}