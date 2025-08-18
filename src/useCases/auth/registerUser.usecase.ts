import { inject, injectable } from "tsyringe";
import { IUserReopository } from "../../entities/repositoryInterfaces/user/user-repository.interface.js";
import { IRegisterUserUsecase } from "../../entities/useCaseInterfaces/auth/register-usecase.interface.js";
import { IUserEntity } from "../../entities/models/user.entity.js";

@injectable()
export class RegisterUserUsecase implements IRegisterUserUsecase {
  constructor(@inject("IUserRepository") private userRepo: IUserReopository) {}

  async execute(user: IUserEntity): Promise<void> {
    const existingUser = await this.userRepo.findByEmail(user.email);
    if (existingUser) {
      throw Error("User Aleady Exist");
    }

    this.userRepo.save(user);
  }
}
