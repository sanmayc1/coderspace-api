import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { ICreateDomainUsecase } from "../../../useCases/Interfaces/admin/skills-and-domain-management/create-domain.usecase.interface.js";
import {
  commonResponse,
  CustomError,
  ERROR_MESSAGES,
  HTTP_STATUS,
  SUCCESS_MESSAGES,
} from "../auth/index.js";
import { IGetAllDomainsUsecase } from "../../../useCases/Interfaces/admin/skills-and-domain-management/get-all-domains.interface.usecase.js";
import { IDeleteDomainUsecase } from "../../../useCases/Interfaces/admin/skills-and-domain-management/delete-domain.usecase.interface.js";
import { IGetAllSkillsUsecase } from "../../../useCases/Interfaces/common/get-all-skills.usecase.interface.js";
import { IDeleteSkillUsecase } from "../../../useCases/Interfaces/admin/skills-and-domain-management/delete-skill.usecase.interface.js";
import { ICreateSkillUsecase } from "../../../useCases/Interfaces/admin/skills-and-domain-management/create-skill.usecase.interface.js";

@injectable()
export class SkillAndDomainManagementController {
  constructor(
    @inject("ICreateDomainUsecase")
    private _createDomainUsecase: ICreateDomainUsecase,
    @inject("IGetAllDomains")
    private _getAllDomainsUsecase: IGetAllDomainsUsecase,
    @inject("IDeleteDomainUsecase")
    private _deleteDomainUsecase: IDeleteDomainUsecase,

    @inject("IDeleteSkillUsecase")
    private _deleteSkillUsecase: IDeleteSkillUsecase,
    @inject("ICreateSkillUsecase")
    private _createSkillUsecase: ICreateSkillUsecase
  ) {}

  async createDomain(req: Request, res: Response) {
    const { title } = req.body;
    await this._createDomainUsecase.execute(title);
    res
      .status(HTTP_STATUS.OK)
      .json(commonResponse(true, SUCCESS_MESSAGES.DOMAIN_CREATED));
  }

  async getAllDomains(req: Request, res: Response) {
    const response = await this._getAllDomainsUsecase.executes();
    res
      .status(HTTP_STATUS.OK)
      .json(commonResponse(true, SUCCESS_MESSAGES.GET_ALL_DOMAINS, response));
  }

  async deleteDomain(req: Request, res: Response) {
    const { id } = req.params;
    if (!id.trim()) {
      throw new CustomError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_MESSAGES.DOMAIN_NOT_FOUND
      );
    }

    await this._deleteDomainUsecase.execute(id);
    res
      .status(HTTP_STATUS.OK)
      .json(commonResponse(true, SUCCESS_MESSAGES.DOMAIN_DELETED));
  }

  async createSkill(req: Request, res: Response) {
    const { title } = req.body;
    await this._createSkillUsecase.execute(title);
    res
      .status(HTTP_STATUS.OK)
      .json(commonResponse(true, SUCCESS_MESSAGES.SKILL_CREATED));
  }



  async deleteSkill(req: Request, res: Response) {
    const { id } = req.params;
    if (!id.trim()) {
      throw new CustomError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_MESSAGES.DOMAIN_NOT_FOUND
      );
    }

    await this._deleteSkillUsecase.execute(id);
    res
      .status(HTTP_STATUS.OK)
      .json(commonResponse(true, SUCCESS_MESSAGES.SKILL_DELETED));
  }
}
