import { injectable } from "tsyringe";
import { ICreateInterviewUseCase } from "../../Interfaces/admin/interview-management/create-interview.usecase.interface";
import { ICreateInterviewUsecaseInputDto } from "../../dtos/user.dto";



@injectable()
export class CreateInterviewUsecase implements ICreateInterviewUseCase{
   async execute(data: ICreateInterviewUsecaseInputDto): Promise<any> {
       console.log(data)
    }

}