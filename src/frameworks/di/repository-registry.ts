import { container } from "tsyringe";
import { UserRepository } from "../../interfaceAdapters/repositories/user.repository.js";
import { WalletRepository } from "../../interfaceAdapters/repositories/wallet.repository.js";
import { OtpRepository } from "../../interfaceAdapters/repositories/otp.repository.js";
import { BlackListRepository } from "../../interfaceAdapters/repositories/blacklist-token.repository.js";
import { TokenRepository } from "../../interfaceAdapters/repositories/token.repository.js";

export class RepositoryRegistery {
  static registerRepository() {
    container.register("IUserRepository", { useClass: UserRepository });
    container.register("IWalletRepository", { useClass: WalletRepository });
    container.register("IOtpRepository",{useClass:OtpRepository})
    container.register("IBlackListTokenRepository",{useClass:BlackListRepository})
    container.register("ITokenRepository",{useClass:TokenRepository})
  }
}
