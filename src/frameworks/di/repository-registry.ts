import { container } from 'tsyringe';
import { UserRepository } from '../../interfaceAdapters/repositories/user.repository';
import { WalletRepository } from '../../interfaceAdapters/repositories/wallet.repository';
import { OtpRepository } from '../../interfaceAdapters/repositories/otp.repository';
import { BlackListRepository } from '../../interfaceAdapters/repositories/blacklist-token.repository';
import { PasswordRestRepository } from '../../interfaceAdapters/repositories/password-reset.repository';
import { AccountRepository } from '../../interfaceAdapters/repositories/account-repository';
import { CompanyRepository } from '../../interfaceAdapters/repositories/company-repository';
import { ProblemRepository } from '../../interfaceAdapters/repositories/problem-repository';
import { DomainRepository } from '../../interfaceAdapters/repositories/domain-repository';
import { SkillRepository } from '../../interfaceAdapters/repositories/skill-repository';
import { LanguageRepository } from '../../interfaceAdapters/repositories/language-repository';
import { TestcaseRepository } from '../../interfaceAdapters/repositories/testcase-repository';
import { ContestRepository } from '../../interfaceAdapters/repositories/contest-repository';
import { FollowerRepository } from '../../interfaceAdapters/repositories/follower-repository';
import { SubmitProblemRepository } from '../../interfaceAdapters/repositories/submit-problem-repository';
import { PlanRepository } from '../../interfaceAdapters/repositories/plan-repository';
import { PaymentRepository } from '../../interfaceAdapters/repositories/payment-repository';
import { ContestAttemptRepository } from '../../interfaceAdapters/repositories/contest-attempt-repository';
import { ChatRepository } from '../../interfaceAdapters/repositories/chat-repository';
import { InterviewRepository } from '../../interfaceAdapters/repositories/interview-repository';
import { InterviewSessionRepository } from '../../interfaceAdapters/repositories/interview-session-repository';
import { InterviewQuestionsRepository } from '../../interfaceAdapters/repositories/interview-questions-repository';
import { AdminDashboardRepository } from '../../interfaceAdapters/repositories/admin-dashboard.repository';
import { NotificationRepository } from '../../interfaceAdapters/repositories/notification.repository';

export class RepositoryRegistery {
  static registerRepository() {
    container.register('IUserRepository', { useClass: UserRepository });
    container.register('IWalletRepository', { useClass: WalletRepository });
    container.register('IOtpRepository', { useClass: OtpRepository });
    container.register('IBlackListTokenRepository', { useClass: BlackListRepository });
    container.register('IPasswordRestRepository', { useClass: PasswordRestRepository });
    container.register('IAccountRepository', { useClass: AccountRepository });
    container.register('ICompanyRepository', { useClass: CompanyRepository });
    container.register('IProblemRepository', { useClass: ProblemRepository });
    container.register('IDomainRepository', { useClass: DomainRepository });
    container.register('ISkillRepository', { useClass: SkillRepository });
    container.register('ILanguageRepository', { useClass: LanguageRepository });
    container.register('ITestcaseRepository', { useClass: TestcaseRepository });
    container.register('IContestRepository', { useClass: ContestRepository });
    container.register('IFollowerRepository',{useClass:FollowerRepository})
    container.register('ISubmitProblemRepository',{useClass:SubmitProblemRepository})
    container.register('IPlanRepository',{useClass:PlanRepository})
    container.register('IPaymentRepository',{useClass:PaymentRepository})
    container.register('IContestAttemptRepository',{useClass:ContestAttemptRepository})
    container.register('IChatRepository',{useClass:ChatRepository})
    container.register('IInterviewRepository',{useClass:InterviewRepository})
    container.register('IInterviewSessionRepository',{useClass:InterviewSessionRepository})
    container.register('IInterviewQuestionsRepository',{useClass:InterviewQuestionsRepository})
    container.register('IAdminDashboardRepository', { useClass: AdminDashboardRepository });
    container.register('INotificationRepository', { useClass: NotificationRepository });
  }
}
