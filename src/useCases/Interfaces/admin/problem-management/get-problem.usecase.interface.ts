import { IGetProblemUsecaseOutput } from "../../../dtos/admin.dto.js";





export interface IGetProblemUsecase {
    execute(id:string):Promise<IGetProblemUsecaseOutput>
}