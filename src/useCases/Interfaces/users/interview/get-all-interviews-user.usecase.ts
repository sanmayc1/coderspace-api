import { IGetAllInterviewsUserUsecaseOutputDto } from "../../../dtos/user.dto";



export interface IGetAllInterviewsUserUsecase{
    execute(page:number,accountId:string):Promise<IGetAllInterviewsUserUsecaseOutputDto>
}
  
