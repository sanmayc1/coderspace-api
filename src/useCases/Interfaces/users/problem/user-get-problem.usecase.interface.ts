import { IUserGetProblemUsecaseOutput } from "../../../dtos/admin.dto.js";


export interface IUserGetProblemUsecase {
    execute(id:string):Promise<IUserGetProblemUsecaseOutput>
}