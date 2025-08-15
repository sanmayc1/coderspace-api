import { container } from "tsyringe";
import { UserRepository } from "../../interfaceAdapters/repositories/user/user.repository.js";

export class UsecaseRegistery {
  static registerUsecase() {
    container.register("IUserRepository", { useClass: UserRepository });
  }
}
