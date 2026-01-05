import { inject, injectable } from 'tsyringe';
import { IUserGetProblemUsecaseOutput } from '../../dtos/admin.dto';
import { IUserGetProblemUsecase } from '../../Interfaces/users/problem/user-get-problem.usecase.interface';
import { IProblemRepository } from '../../../domain/repositoryInterfaces/problem-repository.interface';
import { userGetProblemUsecaseMapper } from '../../dtos/mappers/mappers';
import { CustomError } from '../../../domain/utils/custom-error';
import { ERROR_MESSAGES, HTTP_STATUS } from '../../../shared/constant';

@injectable()
export class UserGetProblemUsecase implements IUserGetProblemUsecase {
  constructor(@inject('IProblemRepository') private _problemRepository: IProblemRepository) {}
  async execute(id: string): Promise<IUserGetProblemUsecaseOutput> {
    const relations = ['skillsIds', 'addedLanguagesId', 'domainId'];

    const problem = await this._problemRepository.getProblem(id, { relations });

    if (!problem) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.PROBLEM_NOT_FOUND);
    }

    return userGetProblemUsecaseMapper.toResponse(problem);
  }
}
