





import { IGetAllCompaniesUsecaseOutputDto } from '../../../dtos/admin.dto';

export interface IGetAllCompaniesUsecase {
    execute(data:{page:number,limit:number,search:string,filter:string}):Promise<IGetAllCompaniesUsecaseOutputDto>
}