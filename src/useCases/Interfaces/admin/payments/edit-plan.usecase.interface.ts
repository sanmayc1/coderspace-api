import { IEditPlanInputDto } from '../../../dtos/user.dto';

export interface IEditPlanUseCase {
  execute(data: IEditPlanInputDto): Promise<void>;
}
