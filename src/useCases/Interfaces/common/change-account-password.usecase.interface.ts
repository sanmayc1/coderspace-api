import { IChangePasswordUsecaseInputDto } from "../../dtos/auth.dto";




export interface IChangeAccountPasswordUsecase{
    execute(data:IChangePasswordUsecaseInputDto):Promise<void>
}