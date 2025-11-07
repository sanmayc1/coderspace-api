import { IGetCompanyUsecaseOutputDto } from "../../dtos/company.dto.js";



export interface IGetCompanyUsecase {
    execute(accountId:string):Promise<IGetCompanyUsecaseOutputDto>
}