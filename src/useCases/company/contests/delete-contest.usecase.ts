import { inject, injectable } from "tsyringe";
import { IContestRepository } from "../../../domain/repositoryInterfaces/contest-repository.interface";
import { IDeleteContestUseCaseInterface } from "../../Interfaces/company/contests/delete-contest.usecase.interface";
import { CustomError } from "../../../domain/utils/custom-error";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../shared/constant";







@injectable()
export class DeleteContestUseCase implements IDeleteContestUseCaseInterface {
    constructor(
        @inject('IContestRepository')
        private _contestRepository: IContestRepository,
    ) {}
    async execute(id: string): Promise<void> {
        const contest = await this._contestRepository.findById(id);
        if(!contest){
            throw new CustomError(HTTP_STATUS.NOT_FOUND,ERROR_MESSAGES.CONTEST_NOT_FOUND);
        }
        await this._contestRepository.deleteById(id);
    }
}