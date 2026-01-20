import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { IUserGetAllProblemsUsecase } from '../../../useCases/Interfaces/users/problem/user-get-all-problems.usecase.interface';
import { mongoObjectIdSchema, querySchema } from '../admin/validation/schema';
import { commonResponse, HTTP_STATUS, SUCCESS_MESSAGES } from '../auth/index';
import { IUserGetProblemUsecase } from '../../../useCases/Interfaces/users/problem/user-get-problem.usecase.interface';
import { IRunProblemUsecase } from '../../../useCases/Interfaces/users/problem/run-problem.usecase.interface';
import { ISubmitProblemUsecase } from '../../../useCases/Interfaces/users/problem/sumbit-problem.usecase.interface';
import { IGetProblemUpdatesUsecase } from '../../../useCases/Interfaces/users/problem/get-problem-updates.usecase.interface';

@injectable()
export class UserProblemController {
  constructor(
    @inject('IUserGetAllProblemsUsecase')
    private _userGetAllProblemsUsecase: IUserGetAllProblemsUsecase,
    @inject('IUserGetProblemUsecase')
    private _userGetProblemUsecase: IUserGetProblemUsecase,
    @inject('IRunProblemUsecase')
    private _runProblemUsecase: IRunProblemUsecase,
    @inject('ISubmitProblemUsecase')
    private _submitProblemUsecase: ISubmitProblemUsecase,
    @inject('IGetProblemUpdatesUsecase')
    private _getProblemUpdatesUsecase: IGetProblemUpdatesUsecase
  ) {}

  async getAllProblems(req: Request, res: Response) {
    const validatedQurey = querySchema.parse(req.query);

    const response = await this._userGetAllProblemsUsecase.execute(validatedQurey);

    res
      .status(HTTP_STATUS.OK)
      .json(commonResponse(true, SUCCESS_MESSAGES.GET_ALL_PROBLEMS, response));
  }

  async getProblem(req: Request, res: Response) {
    const { id } = req.params;

    const validated = mongoObjectIdSchema.parse({ id });

    const response = await this._userGetProblemUsecase.execute(validated.id);

    res.status(HTTP_STATUS.OK).json(commonResponse(true, SUCCESS_MESSAGES.GET_PROBLEM, response));
  }

  async runProblem(req: Request, res: Response) {
    const { language, code, problemId } = req.body;

    const response = await this._runProblemUsecase.execute(language, code, problemId);

    res.status(HTTP_STATUS.OK).json(commonResponse(true, SUCCESS_MESSAGES.RUN_PROBLEM, response));
  }

  async submitProblem(req: Request, res: Response) {
    const { language, code, problemId } = req.body;

    const response = await this._submitProblemUsecase.execute({
      language,
      solution: code,
      problemId,
      accountId: req.user?.accountId as string,
    });

    res
      .status(HTTP_STATUS.OK)
      .json(commonResponse(true, SUCCESS_MESSAGES.SUBMIT_PROBLEM, response));
  }

  async getProblemUpdate(req: Request, res: Response) {
    const {  id } = req.params;
    const { language } = req.query;

    const response = await this._getProblemUpdatesUsecase.execute({
      language:language as string,
      problemId:id,
      accountId: req.user?.accountId as string,
    });

    res
      .status(HTTP_STATUS.OK)
      .json(commonResponse(true, SUCCESS_MESSAGES.SUBMIT_PROBLEM, response));
  }
}
