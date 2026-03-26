import { inject, injectable } from 'tsyringe';
import { IGetAllInterviewsUserUsecase } from '../../../useCases/Interfaces/users/interview/get-all-interviews-user.usecase';
import { IGetAllInterviewsUserUsecaseOutputDto } from '../../../useCases/dtos/user.dto';
import { IInterviewRepository } from '../../../domain/repositoryInterfaces/interview-repository.interface';
import { Sort } from '../../../shared/constant';
import { getAllInterviewsUserUsecaseMapper } from '../../dtos/mappers/mappers';

@injectable()
export class GetAllInterviewsUserUsecase implements IGetAllInterviewsUserUsecase {
  constructor(@inject('IInterviewRepository') private _interviewRepository: IInterviewRepository) {}

  async execute(page: number): Promise<IGetAllInterviewsUserUsecaseOutputDto> {
    const sort: Sort = { createdAt: 'desc' };

    const limit = 4;
    const skip = (page - 1) * limit;
    const {interviews,total} = await this._interviewRepository.getAllInterviews({sort,skip,limit});
    
    return {
        interviews:interviews.map((interview)=>getAllInterviewsUserUsecaseMapper.toResponse(interview)),
        totalPages:Math.ceil(total/limit),
        currentPage:page
    }
    
  }
}
