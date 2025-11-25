import { Request, response, Response } from "express";
import { inject, injectable } from "tsyringe";
import {
  createProblemSchema,
  languageRequestSchema,
  mongoObjectIdSchema,
  querySchema,
  testcaseSchema,
  updateProblemSchema,
} from "./validation/schema.js";
import { ICreateProblemUsecase } from "../../../useCases/Interfaces/admin/problem-management/create-problem.usecase.interface.js";
import {
  commonResponse,
  CustomError,
  HTTP_STATUS,
  SUCCESS_MESSAGES,
} from "../auth/index.js";
import { IGetAllProblemsUsecase } from "../../../useCases/Interfaces/admin/problem-management/get-all-problem.usecase.interface.js";
import { ERROR_MESSAGES, LANGUAGES } from "../../../shared/constant.js";
import { IAddLanguageUsecase } from "../../../useCases/Interfaces/admin/problem-management/add-language.usecase.interface.js";
import { IGetLanguageDetailsUsecase } from "../../../useCases/Interfaces/admin/problem-management/get-language-details.interface.js";
import { IUpdateLanguageUsecase } from "../../../useCases/Interfaces/admin/problem-management/update-language.interface.js";
import { IAddSingleTestcaseUsecase } from "../../../useCases/Interfaces/admin/problem-management/add-single-testcase.usecase.interface.js";
import { IGetAllTestcaseUsecase } from "../../../useCases/Interfaces/admin/problem-management/get-all-testcases.usecasee.interface.js";
import { IDeleteTestcaseUsecase } from "../../../useCases/Interfaces/admin/problem-management/delete-testcase.usecase.interface.js";
import { IGetProblemUsecase } from "../../../useCases/Interfaces/admin/problem-management/get-problem.usecase.interface.js";
import { IUpdateProblemUsecase } from "../../../useCases/Interfaces/admin/problem-management/update-problem.usecase.interface.js";

@injectable()
export class ProblemManagementController {
  constructor(
    @inject("ICreateProblemUsecase")
    private _createProblemUsecase: ICreateProblemUsecase,
    @inject("IGetAllProblemsUsecase")
    private _getAllProblemUsecase: IGetAllProblemsUsecase,
    @inject("IAddLanguageUsecase")
    private _addLanguageUsecase: IAddLanguageUsecase,
    @inject("IGetLanguageDetailsUsecase")
    private _getLanguageDetailsUsecase: IGetLanguageDetailsUsecase,
    @inject("IUpdateLanguageUsecase")
    private _updateLanguageUsecase: IUpdateLanguageUsecase,
    @inject("IAddSingleTestcaseUsecase")
    private _addSingleTestcaseUsecase: IAddSingleTestcaseUsecase,
    @inject("IGetAllTestcaseUsecase")
    private _getAllTestcaseUsecase: IGetAllTestcaseUsecase,
    @inject("IDeleteTestcaseUsecase")
    private _deleteTestcaseUsecase: IDeleteTestcaseUsecase,
    @inject("IGetProblemUsecase") private _getProblemUsecase: IGetProblemUsecase,
    @inject("IUpdateProblemUsecase") private _updateProblemUsecase:IUpdateProblemUsecase
  ) {}

  async createProblem(req: Request, res: Response) {
    const validatedProblem = createProblemSchema.parse(req.body);
    await this._createProblemUsecase.execute(validatedProblem);
    res
      .status(HTTP_STATUS.OK)
      .json(commonResponse(true, SUCCESS_MESSAGES.PROBLEM_CREATED));
  }

  async getAllProblems(req: Request, res: Response) {
    const validatedQurey = querySchema.parse(req.query);

    const response = await this._getAllProblemUsecase.execute(validatedQurey);

    res
      .status(HTTP_STATUS.OK)
      .json(commonResponse(true, SUCCESS_MESSAGES.GET_ALL_PROBLEMS, response));
  }

  async addLanguage(req: Request, res: Response) {
    const { language, problemId } = req.body;
    if (!LANGUAGES.includes(language)) {
      throw new CustomError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_MESSAGES.LANGUAGE_NOT_AVAILABLE
      );
    }

    await this._addLanguageUsecase.execute({ language, problemId });

    res
      .status(HTTP_STATUS.OK)
      .json(commonResponse(true, SUCCESS_MESSAGES.LANGUAGE_ADDED));
  }

  async getLanguage(req: Request, res: Response) {
    const { id } = req.params;
    const validated = mongoObjectIdSchema.parse({ id });

    const response = await this._getLanguageDetailsUsecase.execute(
      validated.id
    );

    res
      .status(HTTP_STATUS.OK)
      .json(commonResponse(true, SUCCESS_MESSAGES.LANGUAGES_FETCHED, response));
  }

  async updateLanguage(req: Request, res: Response) {
    const validatedLangauge = languageRequestSchema.parse(req.body);

    await this._updateLanguageUsecase.execute(validatedLangauge);

    res
      .status(HTTP_STATUS.OK)
      .json(commonResponse(true, SUCCESS_MESSAGES.LANGUAGE_UPDATED));
  }

  async addSingleTestcase(req: Request, res: Response) {
    const { input, output, problemId, example } = req.body;
    const validated = testcaseSchema.parse({
      input,
      output,
      problemId,
      example,
    });

    await this._addSingleTestcaseUsecase.execute(validated);

    res
      .status(HTTP_STATUS.OK)
      .json(commonResponse(true, SUCCESS_MESSAGES.SINGLE_TESTCASE_ADDED));
  }

  async getAllTestcases(req: Request, res: Response) {
    const { id } = req.params;
    const validated = mongoObjectIdSchema.parse({ id });

    const response = await this._getAllTestcaseUsecase.execute(validated.id);

    res
      .status(HTTP_STATUS.OK)
      .json(commonResponse(true, SUCCESS_MESSAGES.GET_TESTCASES, response));
  }

  async deleteTestcase(req: Request, res: Response) {
    const { id } = req.params;
    const validated = mongoObjectIdSchema.parse({ id });

    await this._deleteTestcaseUsecase.execute(validated.id);

    res
      .status(HTTP_STATUS.OK)
      .json(commonResponse(true, SUCCESS_MESSAGES.TESTCASE_DELETED));
  }

  async getProblem(req: Request, res: Response) {
    const { id } = req.params;
    const validated = mongoObjectIdSchema.parse({ id });

    const response = await this._getProblemUsecase.execute(validated.id);
    res
      .status(HTTP_STATUS.OK)
      .json(commonResponse(true, SUCCESS_MESSAGES.GET_PROBLEM, response));
  }

  async updateProblem(req:Request,res:Response){
     const validatedProblem = updateProblemSchema.parse(req.body)
      
     await this._updateProblemUsecase.execute(validatedProblem)
     
     res.status(HTTP_STATUS.OK).json(commonResponse(true,SUCCESS_MESSAGES.PROBLEM_UPDATED))

  }
}
