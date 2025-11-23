import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { ICreateDomainUsecase } from "../../../useCases/Interfaces/admin/skills-and-domain-management/create-domain.interface.js";
import { commonResponse, HTTP_STATUS, SUCCESS_MESSAGES } from "../auth/index.js";

@injectable()
export class SkillAndDomainManagementController {
  constructor(@inject("ICreateDomainUsecase") private _createDomain:ICreateDomainUsecase) {}

  async createDomain(req: Request, res: Response) {
     
      const {title} = req.body
      await this._createDomain.execute(title)
      res.status(HTTP_STATUS.OK).json(commonResponse(true,SUCCESS_MESSAGES.DOMAIN_CREATED))
  }
}
