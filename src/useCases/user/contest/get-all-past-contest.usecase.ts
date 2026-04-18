import { inject, injectable } from "tsyringe";
import { IGetAllPastContestUsecase } from "../../Interfaces/users/contest/get-all-past-contest.usecase.interface";
import { IContestRepository } from "../../../domain/repositoryInterfaces/contest-repository.interface";
import { IGetAllPastContestUsecaseOutputDto } from "../../dtos/user.dto";
import { GenericFilter, Projection } from "../../../shared/constant";
import { getAllContestUsecaseMapper } from "../../dtos/mappers/mappers";



@injectable()
export class GetAllPastContestUsecase implements IGetAllPastContestUsecase{
    constructor(
        @inject('IContestRepository')
        private _contestRepository: IContestRepository
    ) {}

    async execute(page: number): Promise<IGetAllPastContestUsecaseOutputDto> {
        const skip = (page - 1) * 6;
        const limit = 6;
        const filter: GenericFilter = {
            endDateAndTime: { op: 'lte', value: Date.now() },
            view: { op: 'eq', value: 'public' },
        };
        const relations = ['domainId', 'skillsIds', 'creatorId'];
        const projections:Projection = [
            '_id',
            'title',
            'dateAndTime',
            'view',
            'creatorId',
            'skillsIds',
            'domainId',
            'description',
            'duration',
        ];
        const docs = await this._contestRepository.getAllContests({
            skip,
            limit,
            filter,
            relations,
            projections,
        });
        const contests = docs.contests.map(getAllContestUsecaseMapper.toResponse);

        return {
            contests,
            totalPages: Math.ceil(docs.count / limit),
            currentPage: page,
        };
    }
}