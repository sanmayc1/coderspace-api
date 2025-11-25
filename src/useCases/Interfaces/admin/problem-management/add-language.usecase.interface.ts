import { IAddLanguageUsecaseInputDto } from "../../../dtos/admin.dto.js";




export interface IAddLanguageUsecase {
    execute(data:IAddLanguageUsecaseInputDto):Promise<void>
}