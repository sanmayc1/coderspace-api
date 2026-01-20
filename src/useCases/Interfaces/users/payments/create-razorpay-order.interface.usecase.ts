import { ICreateRazorpayOrderUsecaseInputDto, ICreateRazorpayOrderUsecaseOutputDto } from "../../../dtos/user.dto";



export interface ICreateRazorpayOrderUseCase{
    execute(data:ICreateRazorpayOrderUsecaseInputDto):Promise<ICreateRazorpayOrderUsecaseOutputDto>
}