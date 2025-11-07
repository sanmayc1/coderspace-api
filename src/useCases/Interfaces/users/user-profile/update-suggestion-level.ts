import { IUpdateSuggestionLevelInputDto } from "../../../dtos/user.dto.js";




export interface IUpdateSuggestionLevelUsecase {
    execute(data:IUpdateSuggestionLevelInputDto):Promise<void>
}