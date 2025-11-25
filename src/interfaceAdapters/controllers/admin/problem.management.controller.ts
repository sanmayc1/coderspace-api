import { Request, response, Response } from "express";
import { inject, injectable } from "tsyringe";
import { createProblemSchema, querySchema } from "./validation/schema.js";
import { ICreateProblemUsecase } from "../../../useCases/Interfaces/admin/problem-management/create-problem.usecase.interface.js";
import { commonResponse, CustomError, HTTP_STATUS, SUCCESS_MESSAGES } from "../auth/index.js";
import { IGetAllProblemsUsecase } from "../../../useCases/Interfaces/admin/problem-management/get-all-problem.usecase.interface.js";
import { ERROR_MESSAGES, LANGUAGES } from "../../../shared/constant.js";
import { IAddLanguageUsecase } from "../../../useCases/Interfaces/admin/problem-management/add-language.usecase.interface.js";

@injectable()
export class ProblemManagementController {
  constructor(
    @inject("ICreateProblemUsecase")
    private _createProblemUsecase: ICreateProblemUsecase,
    @inject("IGetAllProblemsUsecase") private _getAllProblemUsecase:IGetAllProblemsUsecase,
    @inject("IAddLanguageUsecase") private _addLanguageUsecase:IAddLanguageUsecase
  ) {}

  async createProblem(req: Request, res: Response) {
    const validatedProblem = createProblemSchema.parse(req.body);
    await this._createProblemUsecase.execute(validatedProblem);
    res.status(HTTP_STATUS.OK).json(commonResponse(true,SUCCESS_MESSAGES.PROBLEM_CREATED))
  }


  async getAllProblems(req:Request,res:Response){

    const validatedQurey = querySchema.parse(req.query)

    const response = await this._getAllProblemUsecase.execute(validatedQurey)

    res.status(HTTP_STATUS.OK).json(commonResponse(true,SUCCESS_MESSAGES.GET_ALL_PROBLEMS,response))

  }

  async addLanguage(req:Request,res:Response){
    const {language,problemId} = req.body
    if(!LANGUAGES.includes(language)){
        throw new CustomError(HTTP_STATUS.BAD_REQUEST,ERROR_MESSAGES.LANGUAGE_NOT_AVAILABLE)
    }

    await this._addLanguageUsecase.execute({language,problemId})

    res.status(HTTP_STATUS.OK).json(commonResponse(true,SUCCESS_MESSAGES.LANGUAGE_ADDED))

  }
}
