import { IUpdateProblemUsecaseInput } from "../../../dtos/admin.dto.js";




export interface IUpdateProblemUsecase {
    execute(data:IUpdateProblemUsecaseInput):Promise<void>
}
