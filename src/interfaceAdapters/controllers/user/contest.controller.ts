import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { IGetAllUpcomingAndOngoingContestUseCaseInterface } from '../../../useCases/Interfaces/users/contest/get-all-upcoming-and-ongoing-contest.usecase.interface';
import {
  commonResponse,
  CustomError,
  ERROR_MESSAGES,
  HTTP_STATUS,
  SUCCESS_MESSAGES,
} from '../auth';
import { IGetAllPastContestUsecase } from '../../../useCases/Interfaces/users/contest/get-all-past-contest.usecase.interface';
import { IGetContestProblemsUsecase } from '../../../useCases/Interfaces/users/contest/get-contest-problems.usecase.interface';
import { IContestProblemSubmitUsecase } from '../../../useCases/Interfaces/users/contest/contest-problem-submit.usecase.interface';
import { IJoinContestUsecase } from '../../../useCases/Interfaces/users/contest/join-contest.usecase.interface';
import { IFinishContestUsecase } from '../../../useCases/Interfaces/users/contest/finish-contest.usecase.interface';
import { IGetContestLeaderboardUsecase } from '../../../useCases/Interfaces/users/contest/get-contest-leaderboard';

@injectable()
export class UserContestController {
  constructor(
    @inject('IGetAllUpcomingAndOngoingContestUseCase')
    private _getAllUpcomingContestsUsecase: IGetAllUpcomingAndOngoingContestUseCaseInterface,
    @inject('IGetAllPastContestUsecase')
    private _getAllPastContestsUsecase: IGetAllPastContestUsecase,
    @inject('IGetContestProblemsUsecase')
    private _getContestProblemsUsecase: IGetContestProblemsUsecase,
    @inject('IContestProblemSubmitUsecase')
    private _contestProblemSubmitUsecase: IContestProblemSubmitUsecase,
    @inject('IJoinContestUsecase')
    private _joinContestUsecase: IJoinContestUsecase,
    @inject('IFinishContestUsecase')
    private _finishContestUsecase: IFinishContestUsecase,
    @inject('IGetContestLeaderboardUsecase')
    private _getContestLeaderboardUsecase: IGetContestLeaderboardUsecase
  ) {}

  async getAllUpcomingAndOngoingContests(req: Request, res: Response) {
    const { page } = req.query;
    const currentPage = Number(page);
    if (isNaN(currentPage)) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.PAGE_NOT_NUMBER);
    }
    const response = await this._getAllUpcomingContestsUsecase.execute(currentPage);
    res
      .status(HTTP_STATUS.OK)
      .json(commonResponse(true, SUCCESS_MESSAGES.CONTESTS_FETCHED, response));
  }

  async getAllPastContests(req: Request, res: Response) {
    const { page } = req.query;
    const currentPage = Number(page);
    if (isNaN(currentPage)) {
      throw new CustomError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.PAGE_NOT_NUMBER);
    }
    const response = await this._getAllPastContestsUsecase.execute(currentPage);
    res
      .status(HTTP_STATUS.OK)
      .json(commonResponse(true, SUCCESS_MESSAGES.CONTESTS_FETCHED, response));
  }

  async getContestProblems(req: Request, res: Response) {
    const { id } = req.params;

    const response = await this._getContestProblemsUsecase.execute(id);

    res
      .status(HTTP_STATUS.OK)
      .json(commonResponse(true, SUCCESS_MESSAGES.CONTEST_PROBLEMS_FETCHED, response));
  }

  async submitProblem(req: Request, res: Response) {
    const { language, code, problemId, contestId } = req.body;
    const response = await this._contestProblemSubmitUsecase.execute({
      language,
      solution: code,
      problemId,
      contestId,
      accountId: req.user?.accountId as string,
    });
    res
      .status(HTTP_STATUS.OK)
      .json(commonResponse(true, SUCCESS_MESSAGES.CONTEST_PROBLEMS_FETCHED, response));
  }

  async joinContest(req: Request, res: Response) {
    const { contestId } = req.body;
    await this._joinContestUsecase.execute(contestId, req.user?.accountId as string);
    res
      .status(HTTP_STATUS.OK)
      .json(commonResponse(true, SUCCESS_MESSAGES.CONTEST_JOINED));
  }


  async finishContest(req: Request, res: Response) {
    const { contestId } = req.body;
     await this._finishContestUsecase.execute(contestId, req.user?.accountId as string);
    res
      .status(HTTP_STATUS.OK)
      .json(commonResponse(true, SUCCESS_MESSAGES.CONTEST_FINISHED));
  }

  async getContestLeaderboard(req: Request, res: Response) {
    const { id } = req.params;
    const response = await this._getContestLeaderboardUsecase.execute(id);
    res
      .status(HTTP_STATUS.OK)
      .json(commonResponse(true, SUCCESS_MESSAGES.CONTEST_LEADERBOARD_FETCHED, response));
  }

}
