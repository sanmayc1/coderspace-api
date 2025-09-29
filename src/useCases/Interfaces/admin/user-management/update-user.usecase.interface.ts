import { IUpdateUserUsecaseInputDto } from "../../../dtos/admin.dto.js";


export interface IUpdateUserUsecase {
    execute(data:IUpdateUserUsecaseInputDto):Promise<void>
}