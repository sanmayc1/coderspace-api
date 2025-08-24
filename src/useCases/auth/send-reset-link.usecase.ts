import { inject, injectable } from "tsyringe";
import { ISendRestPasswordLink } from "../../entities/useCaseInterfaces/auth/send-reset-link.js";
import { IPasswordRestRepository } from "../../entities/repositoryInterfaces/password-reset.interface.js";
import { IUserRepository } from "../../entities/repositoryInterfaces/user-repository.interface.js";
import { CustomError } from "../../entities/utils/errors/custom-error.js";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constant.js";
import { IUniqueIdService } from "../../entities/services/uuid.interface.js";
import { passwordRestTemplate } from "../../shared/email-templates.js";
import { config } from "../../shared/config.js";
import { IEmailService } from "../../entities/services/email-service.interface.js";

@injectable()
export class SendRestPasswordLink implements ISendRestPasswordLink {
  constructor(
    @inject("IPasswordRestRepository")
    private _passwordRestRepo: IPasswordRestRepository,
    @inject("IUserRepository") private _userRepo: IUserRepository,
    @inject("IUniqueIdService") private _uuidService: IUniqueIdService,
    @inject("IEmailService") private _emailService:IEmailService
  ) {}
  async execute(email: string): Promise<void> {
    const user = await this._userRepo.findByEmail(email);

    if (!user) {
      throw new CustomError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_MESSAGES.EMAIL_NOT_EXIST
      );
    }

    const token = this._uuidService.generate();

    await this._passwordRestRepo.save(`reset:${token}`, user._id, 60 * 10);
    const link = `${config.client.uri}/auth/password?token=${token}`
    const content = passwordRestTemplate(user.name,link)
    await this._emailService.sendMail(user.email,content,"Password rest link")
    

  }
}
