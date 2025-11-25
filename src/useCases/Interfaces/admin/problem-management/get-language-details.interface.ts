import { IGetLanguageDetailsUsecaseOutput } from "../../../dtos/admin.dto.js";




export interface IGetLanguageDetailsUsecase {
    execute(id:string):Promise<IGetLanguageDetailsUsecaseOutput>
}