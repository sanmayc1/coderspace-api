import { inject, injectable } from 'tsyringe';
import { IGetAllPlansUseCase } from '../Interfaces/common/get-all-plans.usecase.interface';
import { IPlanRepository } from '../../domain/repositoryInterfaces/plan-repository.interface';
import { getAllPlansUsecaseMapper } from '../dtos/mappers/mappers';
import { IGetAllPlansUsecaseOutputDto } from '../dtos/user.dto';

@injectable()
export class GetAllPlansUseCase implements IGetAllPlansUseCase {
  constructor(@inject('IPlanRepository') private _planRepository: IPlanRepository) {}
  async execute(): Promise<IGetAllPlansUsecaseOutputDto[]> {
    const plans = await this._planRepository.getAllPlans();
    return plans.map(getAllPlansUsecaseMapper.toResponse);
  }
}
