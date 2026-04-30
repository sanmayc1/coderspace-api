"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryRegistery = void 0;
const tsyringe_1 = require("tsyringe");
const user_repository_1 = require("../../interfaceAdapters/repositories/user.repository");
const wallet_repository_1 = require("../../interfaceAdapters/repositories/wallet.repository");
const otp_repository_1 = require("../../interfaceAdapters/repositories/otp.repository");
const blacklist_token_repository_1 = require("../../interfaceAdapters/repositories/blacklist-token.repository");
const password_reset_repository_1 = require("../../interfaceAdapters/repositories/password-reset.repository");
const account_repository_1 = require("../../interfaceAdapters/repositories/account-repository");
const company_repository_1 = require("../../interfaceAdapters/repositories/company-repository");
const problem_repository_1 = require("../../interfaceAdapters/repositories/problem-repository");
const domain_repository_1 = require("../../interfaceAdapters/repositories/domain-repository");
const skill_repository_1 = require("../../interfaceAdapters/repositories/skill-repository");
const language_repository_1 = require("../../interfaceAdapters/repositories/language-repository");
const testcase_repository_1 = require("../../interfaceAdapters/repositories/testcase-repository");
const contest_repository_1 = require("../../interfaceAdapters/repositories/contest-repository");
const follower_repository_1 = require("../../interfaceAdapters/repositories/follower-repository");
const submit_problem_repository_1 = require("../../interfaceAdapters/repositories/submit-problem-repository");
const plan_repository_1 = require("../../interfaceAdapters/repositories/plan-repository");
const payment_repository_1 = require("../../interfaceAdapters/repositories/payment-repository");
const contest_attempt_repository_1 = require("../../interfaceAdapters/repositories/contest-attempt-repository");
const chat_repository_1 = require("../../interfaceAdapters/repositories/chat-repository");
const interview_repository_1 = require("../../interfaceAdapters/repositories/interview-repository");
const interview_session_repository_1 = require("../../interfaceAdapters/repositories/interview-session-repository");
const interview_questions_repository_1 = require("../../interfaceAdapters/repositories/interview-questions-repository");
const admin_dashboard_repository_1 = require("../../interfaceAdapters/repositories/admin-dashboard.repository");
const notification_repository_1 = require("../../interfaceAdapters/repositories/notification.repository");
class RepositoryRegistery {
    static registerRepository() {
        tsyringe_1.container.register('IUserRepository', { useClass: user_repository_1.UserRepository });
        tsyringe_1.container.register('IWalletRepository', { useClass: wallet_repository_1.WalletRepository });
        tsyringe_1.container.register('IOtpRepository', { useClass: otp_repository_1.OtpRepository });
        tsyringe_1.container.register('IBlackListTokenRepository', { useClass: blacklist_token_repository_1.BlackListRepository });
        tsyringe_1.container.register('IPasswordRestRepository', { useClass: password_reset_repository_1.PasswordRestRepository });
        tsyringe_1.container.register('IAccountRepository', { useClass: account_repository_1.AccountRepository });
        tsyringe_1.container.register('ICompanyRepository', { useClass: company_repository_1.CompanyRepository });
        tsyringe_1.container.register('IProblemRepository', { useClass: problem_repository_1.ProblemRepository });
        tsyringe_1.container.register('IDomainRepository', { useClass: domain_repository_1.DomainRepository });
        tsyringe_1.container.register('ISkillRepository', { useClass: skill_repository_1.SkillRepository });
        tsyringe_1.container.register('ILanguageRepository', { useClass: language_repository_1.LanguageRepository });
        tsyringe_1.container.register('ITestcaseRepository', { useClass: testcase_repository_1.TestcaseRepository });
        tsyringe_1.container.register('IContestRepository', { useClass: contest_repository_1.ContestRepository });
        tsyringe_1.container.register('IFollowerRepository', { useClass: follower_repository_1.FollowerRepository });
        tsyringe_1.container.register('ISubmitProblemRepository', { useClass: submit_problem_repository_1.SubmitProblemRepository });
        tsyringe_1.container.register('IPlanRepository', { useClass: plan_repository_1.PlanRepository });
        tsyringe_1.container.register('IPaymentRepository', { useClass: payment_repository_1.PaymentRepository });
        tsyringe_1.container.register('IContestAttemptRepository', { useClass: contest_attempt_repository_1.ContestAttemptRepository });
        tsyringe_1.container.register('IChatRepository', { useClass: chat_repository_1.ChatRepository });
        tsyringe_1.container.register('IInterviewRepository', { useClass: interview_repository_1.InterviewRepository });
        tsyringe_1.container.register('IInterviewSessionRepository', { useClass: interview_session_repository_1.InterviewSessionRepository });
        tsyringe_1.container.register('IInterviewQuestionsRepository', { useClass: interview_questions_repository_1.InterviewQuestionsRepository });
        tsyringe_1.container.register('IAdminDashboardRepository', { useClass: admin_dashboard_repository_1.AdminDashboardRepository });
        tsyringe_1.container.register('INotificationRepository', { useClass: notification_repository_1.NotificationRepository });
    }
}
exports.RepositoryRegistery = RepositoryRegistery;
//# sourceMappingURL=repository-registry.js.map