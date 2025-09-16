import { IGetUserUsecaseOutputDto } from "../../../dtos/user.dto.js";





export interface IGetUserUsecase {
    execute(accountId:string):Promise<IGetUserUsecaseOutputDto>
}