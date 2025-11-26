import { IUserGetAllProblemsUsecaseInput, IUserGetAllProblemsUsecaseOutput } from "../../../dtos/admin.dto.js";




export interface IUserGetAllProblemsUsecase {
    execute(data:IUserGetAllProblemsUsecaseInput):Promise<IUserGetAllProblemsUsecaseOutput>
}