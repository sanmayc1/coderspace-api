import { IUpdateUserProfileInputDto } from "../../../dtos/user.dto.js";




export interface IUpdateUserProfileUsecase {
    execute(data: IUpdateUserProfileInputDto): Promise<any>;
}