import { IGetAllTestcaseUsecaseOutputDto } from "../../../dtos/admin.dto.js";



export interface  IGetAllTestcaseUsecase {
    execute(problemId:string):Promise<IGetAllTestcaseUsecaseOutputDto[]>
}