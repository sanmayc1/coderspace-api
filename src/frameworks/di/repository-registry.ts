import { container } from "tsyringe";
import { UserRepository } from "../../interfaceAdapters/repositories/user.repository.js";
import { WalletRepository } from "../../interfaceAdapters/repositories/wallet.repository.js";
import { OtpRepository } from "../../interfaceAdapters/repositories/otp.repository.js";
import { BlackListRepository } from "../../interfaceAdapters/repositories/blacklist-token.repository.js";
import { PasswordRestRepository } from "../../interfaceAdapters/repositories/password-reset.repository.js";
import { AccountRepository } from "../../interfaceAdapters/repositories/account-repository.js";
import { CompanyRepository } from "../../interfaceAdapters/repositories/company-repository.js";
import { ProblemRepository } from "../../interfaceAdapters/repositories/problem-repository.js";
import { DomainRepository } from "../../interfaceAdapters/repositories/domain-repository.js";
import { SkillRepository } from "../../interfaceAdapters/repositories/skill-repository.js";
import { LanguageRepository } from "../../interfaceAdapters/repositories/language-repository.js";
import { TestcaseRepository } from "../../interfaceAdapters/repositories/testcase-repository.js";
import { ContestRepository } from "../../interfaceAdapters/repositories/contest-repository.js";

export class RepositoryRegistery {
  static registerRepository() {
    container.register("IUserRepository", { useClass: UserRepository });
    container.register("IWalletRepository", { useClass: WalletRepository });
    container.register("IOtpRepository",{useClass:OtpRepository})
    container.register("IBlackListTokenRepository",{useClass:BlackListRepository})
    container.register("IPasswordRestRepository",{useClass:PasswordRestRepository})
    container.register("IAccountRepository",{useClass:AccountRepository})
    container.register("ICompanyRepository",{useClass:CompanyRepository})
    container.register("IProblemRepository",{useClass:ProblemRepository})
    container.register("IDomainRepository",{useClass:DomainRepository})
    container.register("ISkillRepository",{useClass:SkillRepository})
    container.register("ILanguageRepository",{useClass:LanguageRepository})
    container.register("ITestcaseRepository",{useClass:TestcaseRepository})
    container.register("IContestRepository",{useClass:ContestRepository})
  }
}
