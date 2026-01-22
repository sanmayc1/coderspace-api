import { inject, injectable } from 'tsyringe';
import { IUpdateContestUseCaseInterface } from '../../Interfaces/company/contests/update-contest.usecase.interface';
import { IUpdateContestInputDto } from '../../dtos/company.dto';
import { IContestRepository } from '../../../domain/repositoryInterfaces/contest-repository.interface';
import { CustomError } from '../../../domain/utils/custom-error';
import { ERROR_MESSAGES, HTTP_STATUS } from '../../../shared/constant';

@injectable()
export class UpdateContestUseCase implements IUpdateContestUseCaseInterface {
  constructor(@inject('IContestRepository') private _contestRepository: IContestRepository) {}

  async execute(data: IUpdateContestInputDto): Promise<any> {
    const contest = await this._contestRepository.findById(data.id);

    if (!contest) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.CONTEST_NOT_FOUND);
    }

    const startTime = new Date(data.dateAndTime); // ISO string
    const durationMinutes = Number(data.duration);
    const endTime = new Date(startTime.getTime() + durationMinutes * 60 * 1000);

    await this._contestRepository.updateById(data.id, {
      title: data.title,
      description: data.description,
      dateAndTime: startTime,
      endDateAndTime: endTime,
      duration: data.duration,
      view: data.visibility,
      domainId: data.domain,
      skillsIds: data.skills,
      problemsIds: data.problems,
      rewards: data.rewards,
    });
  }
}
