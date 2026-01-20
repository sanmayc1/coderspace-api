import { IGetCoderUsecaseOutputDto } from "../../../dtos/user.dto";



export interface IGetCoderUsecase {
    execute(accountId: string, coderId: string): Promise<IGetCoderUsecaseOutputDto>
}