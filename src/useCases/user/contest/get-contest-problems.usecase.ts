import { inject, injectable } from 'tsyringe';
import { IGetContestProblemsUsecase } from '../../Interfaces/users/contest/get-contest-problems.usecase.interface';
import { IContestRepository } from '../../../domain/repositoryInterfaces/contest-repository.interface';
import { CustomError } from '../../../domain/utils/custom-error';
import { ERROR_MESSAGES, HTTP_STATUS } from '../../../shared/constant';
import { getContestProblemUsecaseMapper } from '../../dtos/mappers/mappers';
import { ITestcaseRepository } from '../../../domain/repositoryInterfaces/testcase-respository.interface';
import { IGetContestProblemUsecaseOutputDto } from '../../dtos/user.dto';

@injectable()
export class GetContestProblemsUsecase implements IGetContestProblemsUsecase {
  constructor(
    @inject('IContestRepository') private contestRepository: IContestRepository,
    @inject('ITestcaseRepository') private _testcaseRepository: ITestcaseRepository
  ) {}
  async execute(id: string): Promise<IGetContestProblemUsecaseOutputDto> {
    const contest = await this.contestRepository.findById(id);
    if (!contest) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.CONTEST_NOT_FOUND);
    }
     
    if(contest.endDateAndTime < new Date()){
        throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.CONTEST_ENDED);
    }

    if(contest.dateAndTime > new Date()){
        throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.CONTEST_NOT_STARTED);
    }

    const doc = await this.contestRepository.getAllProblemsOfContest(id);
    

    const problems = await Promise.all(doc.problems.map(async(problem)=>{
       const testcases = await this._testcaseRepository.getTestcasesByProblemId(problem._id as string,{limit:3});
       return getContestProblemUsecaseMapper.toResponse(problem,testcases);
    }
    ));
    return { problems, endDateAndTime: doc.endDateAndTime };
  }
}
