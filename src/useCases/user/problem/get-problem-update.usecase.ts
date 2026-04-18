import { inject, injectable } from 'tsyringe';
import { IGetProblemUpdatesUsecase } from '../../Interfaces/users/problem/get-problem-updates.usecase.interface';
import {
  IGetProblemUpdatesUsecaseInputDto,
  IGetProblemUpdatesUsecaseOutputDto,
} from '../../dtos/user.dto';
import { IUserRepository } from '../../../domain/repositoryInterfaces/user-repository.interface';
import { ISubmitProblemRepository } from '../../../domain/repositoryInterfaces/submit-problem-repository.interface';
import { CustomError } from '../../../domain/utils/custom-error';
import { ERROR_MESSAGES, HTTP_STATUS } from '../../../shared/constant';

@injectable()
export class GetProblemUpdatesUsecase implements IGetProblemUpdatesUsecase {
  constructor(
    @inject('IUserRepository') private _userRepository: IUserRepository,
    @inject('ISubmitProblemRepository') private _submitProblemRepository: ISubmitProblemRepository
  ) {}
 async execute(data: IGetProblemUpdatesUsecaseInputDto): Promise<IGetProblemUpdatesUsecaseOutputDto> {

    const user= await this._userRepository.findByAccountId(data.accountId);
    if (!user) {
      throw new CustomError(HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.USER_NOT_FOUND);
    }
    const submitProblem = await this._submitProblemRepository.getAllSubmissionByProblemIdAndUserId(data.problemId,user._id as string);

    
    if(submitProblem.length ===0){
        return {
            status:"",
            solution:"",
            language:data.language
        }
    }

    const solvedExist = submitProblem.find((item) => item.status === 'solved');
    if(solvedExist){
        return {
            status:"solved",
            solution:solvedExist.solution,
            language:solvedExist.language
        }
    }

    return {
        status:submitProblem[submitProblem.length-1].status,
        solution:submitProblem[submitProblem.length-1].solution,
        language:submitProblem[submitProblem.length-1].language
    }
    
  }
}
