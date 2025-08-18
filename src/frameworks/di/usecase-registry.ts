import { container } from "tsyringe";
import { UserRepository } from "../../interfaceAdapters/repositories/user/user.repository.js";
import { WinstonLoggerAdapter } from "../../interfaceAdapters/services/logger/winston-logger.adapter.js";
import { Bcrypt } from "../security/bcrypt.password.js";
import { WalletRepository } from "../../interfaceAdapters/repositories/wallet/wallet.repository.js";

export class UsecaseRegistery {
  static registerUsecase() {
    container.register("IUserRepository", { useClass: UserRepository });
    container.register("IWalletRepository",{useClass:WalletRepository})


    // logger
    container.registerSingleton("ILogger", WinstonLoggerAdapter);
    // security
    container.registerSingleton("IBcrypt",Bcrypt)
  }
}
