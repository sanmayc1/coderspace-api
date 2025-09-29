import { inject, injectable } from "tsyringe";
import { ISendRestPasswordLink } from "../Interfaces/auth/send-reset-link.js";
import { IPasswordRestRepository } from "../../domain/repositoryInterfaces/password-reset.interface.js";
import { CustomError } from "../../domain/utils/custom-error.js";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constant.js";
import { IUniqueIdService } from "../../domain/services/uuid.interface.js";
import { passwordRestTemplate } from "../../shared/email-templates.js";
import { config } from "../../shared/config.js";
import { IEmailService } from "../../domain/services/email-service.interface.js";
import { IAccountsRepository } from "../../domain/repositoryInterfaces/accounts-repository.interface.js";

@injectable()
export class SendRestPasswordLink implements ISendRestPasswordLink {
  constructor(
    @inject("IPasswordRestRepository")
    private _passwordRestRepo: IPasswordRestRepository,
    @inject("IUniqueIdService") private _uuidService: IUniqueIdService,
    @inject("IEmailService") private _emailService: IEmailService,
    @inject("IAccountRepository")
    private _accountRepository: IAccountsRepository
  ) {}
  async execute(email: string): Promise<void> {
    const account = await this._accountRepository.findByEmail(email);

    if (!account) {
      throw new CustomError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_MESSAGES.EMAIL_NOT_EXIST
      );
    }

    if (account.authProvider !== "local") {
      throw new CustomError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_MESSAGES.DIFFERENT_AUTHPROVIDER
      );
    }

    const token = this._uuidService.generate();

    await this._passwordRestRepo.save(
      `reset:${token}`,
      account._id as string,
      60 * 10
    );
    const link = `${config.client.uri}/auth/password?token=${token}`;
    const content = passwordRestTemplate(account.name.charAt(0).toUpperCase() + account.name.slice(1), link);
    await this._emailService.sendMail(
      account.email,
      content,
      "Password rest link"
    );
  }
}
