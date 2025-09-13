import { IAuthProviderUsecaseOutputDto, IGoogleAuthUsecaseInputDto } from "../../dtos/auth.dto.js";

export interface IGoogleAuthUsecase {
    execute(data:IGoogleAuthUsecaseInputDto):Promise<IAuthProviderUsecaseOutputDto>
}