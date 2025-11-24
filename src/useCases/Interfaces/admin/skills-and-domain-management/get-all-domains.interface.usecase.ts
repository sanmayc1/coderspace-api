import { IGetAllDomainsUsecaseOutput } from "../../../dtos/admin.dto.js";





export interface IGetAllDomainsUsecase {
    executes():Promise<IGetAllDomainsUsecaseOutput>
}