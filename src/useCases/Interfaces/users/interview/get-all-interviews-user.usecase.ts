import { IGetAllInterviewsUserUsecaseOutputDto } from "../../../dtos/user.dto";



export interface IGetAllInterviewsUserUsecase{
    execute(page:number):Promise<IGetAllInterviewsUserUsecaseOutputDto>
}
  
