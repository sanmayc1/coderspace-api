import { container } from "tsyringe";
import { UserRepository } from "../../interfaceAdapters/repositories/user/user.repository.js";
import { WinstonLoggerAdapter } from "../../interfaceAdapters/services/logger/winston-logger.adapter.js";

export class UsecaseRegistery {
  static registerUsecase() {
    container.register("IUserRepository", { useClass: UserRepository });


    // logger
    container.registerSingleton("ILogger", WinstonLoggerAdapter);
  }
}
