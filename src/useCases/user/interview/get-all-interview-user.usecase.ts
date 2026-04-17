import { inject, injectable } from 'tsyringe';
import { IGetAllInterviewsUserUsecase } from '../../../useCases/Interfaces/users/interview/get-all-interviews-user.usecase';
import { IGetAllInterviewsUserUsecaseOutputDto } from '../../../useCases/dtos/user.dto';
import { IInterviewRepository } from '../../../domain/repositoryInterfaces/interview-repository.interface';
import { Sort } from '../../../shared/constant';
import { getAllInterviewsUserUsecaseMapper } from '../../dtos/mappers/mappers';
import { IInterviewSessionRepository } from '../../../domain/repositoryInterfaces/interview-session-repository';

@injectable()
export class GetAllInterviewsUserUsecase implements IGetAllInterviewsUserUsecase {
  constructor(
    @inject('IInterviewRepository') private _interviewRepository: IInterviewRepository,
    @inject('IInterviewSessionRepository')
    private _interviewSessionRepository: IInterviewSessionRepository
  ) {}

  async execute(page: number, accountId: string): Promise<IGetAllInterviewsUserUsecaseOutputDto> {
    const sort: Sort = { createdAt: 'desc' };

    const limit = 4;
    const skip = (page - 1) * limit;
    const { interviews, total } = await this._interviewRepository.getAllInterviews({
      sort,
      skip,
      limit,
    });

    const interviewsCheckIsCompleted = await Promise.all(
      interviews.map(async (interview) => {
        const session = await this._interviewSessionRepository.findByInterviewIdAndAccountId(
          interview._id,
          accountId
        ); 
        

        if (!session){
          return {
            ...interview,
            isAttempted: false,
            sessionId: '',
          };
        }
        return {
          ...interview,
          isAttempted: true,
          sessionId: session._id,
        };
      })
    );

    return {
      interviews: interviewsCheckIsCompleted.map((interview) =>
        getAllInterviewsUserUsecaseMapper.toResponse(interview)
      ),
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    };
  }
}
