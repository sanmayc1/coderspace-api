import { IJwtPayload } from "../../../entities/models/jwt-payload.enitity.js";
import { IAuthResponseDto } from "../../dtos/auth.dto.js";

export interface IAuthUserUsecase{
    execute(user:IJwtPayload):Promise<IAuthResponseDto>
}