import { inject, injectable } from 'tsyringe';
import { IProblemRepository } from '../../../domain/repositoryInterfaces/problem-repository.interface';
import { ERROR_MESSAGES, HTTP_STATUS, TDifficulty } from '../../../shared/constant';
import { IUpdateProblemUsecaseInput } from '../../dtos/admin.dto';
import { IUpdateProblemUsecase } from '../../Interfaces/admin/problem-management/update-problem.usecase.interface';
import { CustomError } from '../../../domain/utils/custom-error';

@injectable()
export class UpdateProblemUsecase implements IUpdateProblemUsecase {
  constructor(@inject('IProblemRepository') private _problemRepository: IProblemRepository) {}
  async execute(data: IUpdateProblemUsecaseInput): Promise<void> {
    const exists = await this._problemRepository.findById(data.problemId);

    if (!exists) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.PROBLEM_NOT_FOUND);
    }

    await this._problemRepository.updateById(data.problemId, {
      title: data.title.toLowerCase(),
      description: data.description,
      constraints: data.constrain,
      difficulty: data.difficulty as TDifficulty,
      domainId: data.domain,
      examples: data.examples.map((e) => ({
        explanation: e.explanation,
        input: e.input,
        output: e.output,
      })),
      isPremium: data.premium,
      skillsIds: data.skills,
    });
  }
}
