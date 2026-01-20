import { IGetAllPaymentsUsecaseOutputDto } from "../../../dtos/admin.dto";

export interface IGetAllPaymentsUseCase {
  execute(
    page: number,
    limit: number,
    sort: string,
    search: string
  ): Promise<IGetAllPaymentsUsecaseOutputDto>;
}
