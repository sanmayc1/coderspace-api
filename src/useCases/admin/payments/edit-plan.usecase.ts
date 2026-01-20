import { inject, injectable } from 'tsyringe';
import { IEditPlanUseCase } from '../../Interfaces/admin/payments/edit-plan.usecase.interface';
import { IPlanRepository } from '../../../domain/repositoryInterfaces/plan-repository.interface';
import { CustomError } from '../../../domain/utils/custom-error';
import { ERROR_MESSAGES, HTTP_STATUS } from '../../../shared/constant';
import { IEditPlanInputDto } from '../../dtos/user.dto';

@injectable()
export class EditPlanUseCase implements IEditPlanUseCase {
  constructor(@inject('IPlanRepository') private _planRepository: IPlanRepository) {}

  async execute(data: IEditPlanInputDto): Promise<void> {
    
    const plan = await this._planRepository.findById(data.id);
    if (!plan) {
      throw new CustomError(HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.PLAN_NOT_FOUND);
    }

     await this._planRepository.updateById(data.id, {
      price: Number(data.price),
      name: data.name
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
        .trim(),
      description: data.description.trim(),
      features: data.features,
    });

  }
}
