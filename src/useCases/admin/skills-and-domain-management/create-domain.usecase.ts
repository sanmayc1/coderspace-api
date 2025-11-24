import { inject, injectable } from "tsyringe";
import { ICreateDomainUsecase } from "../../Interfaces/admin/skills-and-domain-management/create-domain.usecase.interface.js";
import { IDomainRepository } from "../../../domain/repositoryInterfaces/domain-respository.interface.js";
import { CustomError } from "../../../domain/utils/custom-error.js";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../shared/constant.js";

@injectable()
export class CreateDomainUsecase implements ICreateDomainUsecase {
  constructor(
    @inject("IDomainRepository") private _domainRepository: IDomainRepository
  ) {}

  async execute(title: string): Promise<void> {
    title = title.toLocaleLowerCase().trim();
    const domainExist = await this._domainRepository.findByTitle(title);

    if (domainExist) {
      throw new CustomError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_MESSAGES.DOMAIN_EXIST
      );
    }

    await this._domainRepository.create({ title });
  }
}
