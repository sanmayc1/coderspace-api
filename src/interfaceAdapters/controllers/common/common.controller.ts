import { inject, injectable } from "tsyringe";
import { IGetAllSkillsUsecase } from "../../../useCases/Interfaces/common/get-all-skills.usecase.interface.js";
import {
  commonResponse,
  HTTP_STATUS,
  SUCCESS_MESSAGES,
} from "../auth/index.js";
import { Request, Response } from "express";


@injectable()
export class CommonController {
  constructor(
    @inject("IGetAllSkillsUsecase")
    private _getAllSkillsUsecase: IGetAllSkillsUsecase
  ) {}

  async getAllSkills(req: Request, res: Response) {
    const response = await this._getAllSkillsUsecase.executes();
    res
      .status(HTTP_STATUS.OK)
      .json(commonResponse(true, SUCCESS_MESSAGES.GET_ALL_SKILLS, response));
  }
}
