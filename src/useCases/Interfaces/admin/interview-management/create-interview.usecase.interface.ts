import { IInterviewEntity } from "../../../../domain/entities/interview-entity";
import { ICreateInterviewUsecaseOutputDto } from "../../../dtos/admin.dto";
import { ICreateInterviewUsecaseInputDto } from "../../../dtos/admin.dto";



export interface ICreateInterviewUseCase {
    execute(data:ICreateInterviewUsecaseInputDto):Promise<ICreateInterviewUsecaseOutputDto>
}