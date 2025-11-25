import { IUpdateLanguageUsecaseInput } from "../../../dtos/admin.dto.js";



export interface IUpdateLanguageUsecase {
    execute(data:IUpdateLanguageUsecaseInput):Promise<void>
}