import { inject, injectable } from 'tsyringe';
import { ICreateInterviewUseCase } from '../../Interfaces/admin/interview-management/create-interview.usecase.interface';
import { ICreateInterviewUsecaseInputDto } from '../../dtos/admin.dto';
import { IInterviewRepository } from '../../../domain/repositoryInterfaces/interview-repository.interface';
import { createInterviewUsecaseMapper } from '../../dtos/mappers/mappers';
import { ICreateInterviewUsecaseOutputDto } from '../../dtos/admin.dto';

@injectable()
export class CreateInterviewUsecase implements ICreateInterviewUseCase {
  constructor(@inject('IInterviewRepository') private _interviewRepository: IInterviewRepository) {}

  async execute(data: ICreateInterviewUsecaseInputDto): Promise<ICreateInterviewUsecaseOutputDto> {
    const interview = await this._interviewRepository.create({
      context: data.context,
      description: data.description,
      title: data.title,
      durationInMinutes: data.duration,
      difficulty: data.difficulty,
      isPremium: data.premium,
      numberOfQuestions: data.numberOfQuestions,
    });

    return createInterviewUsecaseMapper.toResponse(interview);
  }
}
