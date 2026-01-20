import { inject, injectable } from "tsyringe";
import { ICreateContestUsecase } from "../../Interfaces/company/contests/create-contest.usecase.interface";
import { IContestRepository } from "../../../domain/repositoryInterfaces/contest-repository.interface";
import { ICreateContestUsecaseInputDto } from "../../dtos/admin.dto";
import { ERROR_MESSAGES } from "../../../shared/constant";
import { CustomError } from "../../../domain/utils/custom-error";


@injectable()
export class CreateContestUsecase implements ICreateContestUsecase {
  constructor(
    @inject('IContestRepository')
    private _contestRepository: IContestRepository
  ) {}

  async execute(data: ICreateContestUsecaseInputDto, id: string): Promise<void> {
    const contestDate = new Date(data.dateAndTime);
    if (isNaN(contestDate.getTime())) {
      throw new CustomError(400, ERROR_MESSAGES.INVALID_BODY);
    }

    await this._contestRepository.create({
      title: data.title.toLowerCase(),
      description: data.description,
      domainId: data.domain,
      skillsIds: data.skills,
      problemsIds: data.problems,
      rewards: data.rewards,
      dateAndTime: contestDate,
      duration: data.duration,
      view: data.visibility,
      creatorId: id,
    });
  }
}
