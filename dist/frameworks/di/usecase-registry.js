"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsecaseRegistery = void 0;
const tsyringe_1 = require("tsyringe");
const register_user_usecase_1 = require("../../useCases/auth/register-user.usecase");
const send_otp_usercase_1 = require("../../useCases/auth/send-otp.usercase");
const verify_otp_usecase_1 = require("../../useCases/auth/verify-otp.usecase");
const login_user_usecase_1 = require("../../useCases/auth/login-user.usecase");
const refresh_token_usecase_1 = require("../../useCases/auth/refresh-token.usecase");
const logout_usecase_1 = require("../../useCases/auth/logout.usecase");
const send_reset_link_usecase_1 = require("../../useCases/auth/send-reset-link.usecase");
const forget_password_usecase_1 = require("../../useCases/auth/forget-password.usecase");
const github_auth_usecase_1 = require("../../useCases/auth/github-auth.usecase");
const auth_user_usecase_1 = require("../../useCases/auth/auth-user.usecase");
const google_auth_usecase_1 = require("../../useCases/auth/google-auth.usecase");
const login_company_usecase_1 = require("../../useCases/auth/login-company.usecase");
const register_company_usecase_1 = require("../../useCases/auth/register-company.usecase");
const get_users_usecase_1 = require("../../useCases/admin/user-management/get-users.usecase");
const user_profile_usecase_1 = require("../../useCases/user/user-profile/user-profile.usecase");
const update_suggestion_level_1 = require("../../useCases/user/user-profile/update-suggestion-level");
const login_admin_usecase_1 = require("../../useCases/auth/login-admin.usecase");
const update_user_usecase_1 = require("../../useCases/admin/user-management/update-user.usecase");
const update_user_status_usecase_1 = require("../../useCases/admin/user-management/update-user-status.usecase");
const get_company_usecase_1 = require("../../useCases/company/get.company.usecase");
const create_domain_usecase_1 = require("../../useCases/admin/skills-and-domain-management/create-domain.usecase");
const get_all_domains_usecase_1 = require("../../useCases/admin/skills-and-domain-management/get-all-domains.usecase");
const delete_domain_usecase_1 = require("../../useCases/admin/skills-and-domain-management/delete-domain.usecase");
const create_skill_usecase_1 = require("../../useCases/admin/skills-and-domain-management/create-skill.usecase");
const delete_skill_usecase_1 = require("../../useCases/admin/skills-and-domain-management/delete-skill.usecase");
const get_all_skills_usecase_1 = require("../../useCases/common/get-all-skills.usecase");
const create_problem_usecase_1 = require("../../useCases/admin/problem-management/create-problem.usecase");
const get_all_problems_usecase_1 = require("../../useCases/admin/problem-management/get-all-problems.usecase");
const add_language_usecase_1 = require("../../useCases/admin/problem-management/add-language.usecase");
const get_language_details_usecase_1 = require("../../useCases/admin/problem-management/get-language.details.usecase");
const update_language_usecase_1 = require("../../useCases/admin/problem-management/update-language.usecase");
const add_single_testcase_usecase_1 = require("../../useCases/admin/problem-management/add-single-testcase.usecase");
const get_all_testcase_usecase_1 = require("../../useCases/admin/problem-management/get-all-testcase.usecase");
const delete_testcase_usecase_1 = require("../../useCases/admin/problem-management/delete-testcase.usecase");
const get_problem_usecase_1 = require("../../useCases/admin/problem-management/get-problem.usecase");
const update_problem_usecase_1 = require("../../useCases/admin/problem-management/update-problem.usecase");
const change_visibility_usecase_1 = require("../../useCases/admin/problem-management/change-visibility.usecase");
const user_get_all_problem_usecase_1 = require("../../useCases/user/problem/user-get-all-problem.usecase");
const user_get_problem_usecase_1 = require("../../useCases/user/problem/user-get-problem.usecase");
const update_company_usecase_1 = require("../../useCases/company/update-company.usecase");
const get_all_company_contests_usecase_1 = require("../../useCases/company/contests/get-all-company-contests.usecase");
const user_profile_update_usecase_1 = require("../../useCases/user/user-profile/user-profile-update.usecase");
const update_user_password_usecase_1 = require("../../useCases/user/user-profile/update-user-password.usecase");
const get_all_coders_usecase_1 = require("../../useCases/user/coders/get-all-coders.usecase");
const follow_coder_usecase_1 = require("../../useCases/user/coders/follow-coder-usecase");
const unfollow_coders_usecase_1 = require("../../useCases/user/coders/unfollow-coders.usecase");
const get_coder_usecase_1 = require("../../useCases/user/coders/get-coder.usecase");
const run_problem_usecase_1 = require("../../useCases/user/problem/run-problem.usecase");
const sumbit_problem_usecase_1 = require("../../useCases/user/problem/sumbit-problem.usecase");
const get_problem_update_usecase_1 = require("../../useCases/user/problem/get-problem-update.usecase");
const get_all_plans_usecase_1 = require("../../useCases/common/get-all-plans.usecase");
const create_razorpay_order_usecase_1 = require("../../useCases/user/payments/create-razorpay-order.usecase");
const verify_payment_usecase_1 = require("../../useCases/user/payments/verify-payment.usecase");
const mark_failed_payment_usecase_1 = require("../../useCases/user/payments/mark-failed-payment.usecase");
const edit_plan_usecase_1 = require("../../useCases/admin/payments/edit-plan.usecase");
const get_all_payments_usecase_1 = require("../../useCases/admin/payments/get-all-payments.usecase");
const create_contest_usecase_1 = require("../../useCases/company/contests/create-contest.usecase");
const get_contest_usecase_1 = require("../../useCases/company/contests/get-contest.usecase");
const update_contest_usecase_1 = require("../../useCases/company/contests/update-contest.usecase");
const delete_contest_usecase_1 = require("../../useCases/company/contests/delete-contest.usecase");
const get_all_upcoming_and_ongoing_contest_usecase_1 = require("../../useCases/user/contest/get-all-upcoming-and-ongoing-contest.usecase");
const get_all_past_contest_usecase_1 = require("../../useCases/user/contest/get-all-past-contest.usecase");
const get_contest_problems_usecase_1 = require("../../useCases/user/contest/get-contest-problems.usecase");
const contest_problem_submit_usecase_1 = require("../../useCases/user/contest/contest-problem-submit.usecase");
const join_contest_usecase_1 = require("../../useCases/user/contest/join-contest.usecase");
const finish_contest_usecase_1 = require("../../useCases/user/contest/finish-contest.usecase");
const get_contest_leaderboard_1 = require("../../useCases/common/get-contest-leaderboard");
const get_all_available_problems_for_contest_usecase_1 = require("../../useCases/company/contests/get-all-available-problems-for-contest.usecase");
const auto_generate_testcase_1 = require("../../useCases/admin/problem-management/auto-generate-testcase");
const get_all_chats_1 = require("../../useCases/user/chat/get-all-chats");
const get_chat_1 = require("../../useCases/user/chat/get-chat");
const create_interview_usecase_1 = require("../../useCases/admin/interview/create-interview.usecase");
const get_all_interviews_usecase_1 = require("../../useCases/admin/interview/get-all-interviews.usecase");
const delete_interview_usecase_1 = require("../../useCases/admin/interview/delete-interview.usecase");
const get_all_interview_user_usecase_1 = require("../../useCases/user/interview/get-all-interview-user.usecase");
const create_interview_session_usecase_1 = require("../../useCases/user/interview/create-interview-session.usecase");
const get_interview_question_usecase_1 = require("../../useCases/user/interview/get-interview-question.usecase");
const change_account_password_usecase_1 = require("../../useCases/common/change-account-password.usecase");
const get_dashboard_usecase_1 = require("../../useCases/company/get-dashboard.usecase");
const get_dashboard_usecase_2 = require("../../useCases/admin/get-dashboard.usecase");
const get_all_notifications_usecase_1 = require("../../useCases/common/notification/get-all-notifications.usecase");
const mark_notification_read_usecase_1 = require("../../useCases/common/notification/mark-notification-read.usecase");
const update_answer_and_feedback_usecase_1 = require("../../useCases/user/interview/update-answer-and-feedback.usecase");
const finish_interview_usecase_1 = require("../../useCases/user/interview/finish-interview.usecase");
const get_interview_feedback_usecase_1 = require("../../useCases/user/interview/get-interview-feedback.usecase");
class UsecaseRegistery {
    static registerUsecase() {
        tsyringe_1.container.register('IUserRegisterUsecase', {
            useClass: register_user_usecase_1.RegisterUserUsecase,
        });
        tsyringe_1.container.register('IVerifyOtpUsecase', { useClass: verify_otp_usecase_1.VerifyOtpUsecase });
        tsyringe_1.container.register('ISendOtpUsecase', { useClass: send_otp_usercase_1.SendOtpUsecase });
        tsyringe_1.container.register('ILoginUserUsecase', { useClass: login_user_usecase_1.LoginUserUsecase });
        tsyringe_1.container.register('IRefreshTokenUsecase', {
            useClass: refresh_token_usecase_1.RefreshTokenUsecase,
        });
        tsyringe_1.container.register('ILogoutUsecase', { useClass: logout_usecase_1.LogoutUsecase });
        tsyringe_1.container.register('ISendRestPasswordLink', {
            useClass: send_reset_link_usecase_1.SendRestPasswordLink,
        });
        tsyringe_1.container.register('IForgetPasswordUsecase', {
            useClass: forget_password_usecase_1.ForgetPasswordUsecase,
        });
        tsyringe_1.container.register('IGithHubAuthUsecase', { useClass: github_auth_usecase_1.GitHubAuthUsecase });
        tsyringe_1.container.register('IAuthUserUsecase', { useClass: auth_user_usecase_1.AuthUserUsecase });
        tsyringe_1.container.register('IGoogleAuthUsecase', { useClass: google_auth_usecase_1.GoogleAuthUsecase });
        tsyringe_1.container.register('ILoginCompanyUsecase', {
            useClass: login_company_usecase_1.LoginCompanyUsecase,
        });
        tsyringe_1.container.register('IRegisterCompanyUsecase', {
            useClass: register_company_usecase_1.RegisterCompanyUsecase,
        });
        tsyringe_1.container.register('IGetUsersUsecase', { useClass: get_users_usecase_1.GetUsersUsecase });
        tsyringe_1.container.register('IGetUserUsecase', { useClass: user_profile_usecase_1.GetUserUsecase });
        tsyringe_1.container.register('IUpdateSuggestionLevelUsecase', {
            useClass: update_suggestion_level_1.UpdateSuggestionLevelUsecase,
        });
        tsyringe_1.container.register('ILoginAdminUsecase', { useClass: login_admin_usecase_1.LoginAdminUsecase });
        tsyringe_1.container.register('IUpdateUserUsecase', { useClass: update_user_usecase_1.UpdateUserUsecase });
        tsyringe_1.container.register('IUpdateUserStatusUsecase', {
            useClass: update_user_status_usecase_1.UpdateUserStatusUsecase,
        });
        tsyringe_1.container.register('IGetCompanyUsecase', { useClass: get_company_usecase_1.GetCompanyUsecase });
        tsyringe_1.container.register('ICreateDomainUsecase', {
            useClass: create_domain_usecase_1.CreateDomainUsecase,
        });
        tsyringe_1.container.register('IGetAllDomains', { useClass: get_all_domains_usecase_1.GetAllDomains });
        tsyringe_1.container.register('IDeleteDomainUsecase', {
            useClass: delete_domain_usecase_1.DeleteDomainUsecase,
        });
        tsyringe_1.container.register('ICreateSkillUsecase', { useClass: create_skill_usecase_1.CreateSkillUsecase });
        tsyringe_1.container.register('IDeleteSkillUsecase', { useClass: delete_skill_usecase_1.DeleteSkillUsecase });
        tsyringe_1.container.register('IGetAllSkillsUsecase', {
            useClass: get_all_skills_usecase_1.GetAllSkillsUsecase,
        });
        tsyringe_1.container.register('ICreateProblemUsecase', {
            useClass: create_problem_usecase_1.CreateProblemUsecase,
        });
        tsyringe_1.container.register('IGetAllProblemsUsecase', {
            useClass: get_all_problems_usecase_1.GetAllProblemsUsecase,
        });
        tsyringe_1.container.register('IAddLanguageUsecase', { useClass: add_language_usecase_1.AddLanguageUsecase });
        tsyringe_1.container.register('IGetLanguageDetailsUsecase', {
            useClass: get_language_details_usecase_1.GetLanguageDetailsUsecase,
        });
        tsyringe_1.container.register('IUpdateLanguageUsecase', {
            useClass: update_language_usecase_1.UpdateLanguageUseCase,
        });
        tsyringe_1.container.register('IAddSingleTestcaseUsecase', {
            useClass: add_single_testcase_usecase_1.AddSingleTestcaseUsecase,
        });
        tsyringe_1.container.register('IGetAllTestcaseUsecase', {
            useClass: get_all_testcase_usecase_1.GetAllTestcaseUsecase,
        });
        tsyringe_1.container.register('IDeleteTestcaseUsecase', {
            useClass: delete_testcase_usecase_1.DeleteTestcaseUsecase,
        });
        tsyringe_1.container.register('IGetProblemUsecase', { useClass: get_problem_usecase_1.GetProblemUsecase });
        tsyringe_1.container.register('IUpdateProblemUsecase', {
            useClass: update_problem_usecase_1.UpdateProblemUsecase,
        });
        tsyringe_1.container.register('IChangeVisibilityUsecase', {
            useClass: change_visibility_usecase_1.ChangeVisibilityUsecase,
        });
        tsyringe_1.container.register('IUserGetAllProblemsUsecase', {
            useClass: user_get_all_problem_usecase_1.UserGetAllProblemsUsecase,
        });
        tsyringe_1.container.register('IUserGetProblemUsecase', {
            useClass: user_get_problem_usecase_1.UserGetProblemUsecase,
        });
        tsyringe_1.container.register('IUpdateCompanyUsecase', {
            useClass: update_company_usecase_1.UpdateCompanyUsecase,
        });
        tsyringe_1.container.register('ICreateContestUsecase', {
            useClass: create_contest_usecase_1.CreateContestUsecase,
        });
        tsyringe_1.container.register('IGetAllCompanyContestsUsecase', {
            useClass: get_all_company_contests_usecase_1.GetAllCompanyContestsUsecase,
        });
        tsyringe_1.container.register('IGetDashboardUsecase', {
            useClass: get_dashboard_usecase_1.GetDashboardUsecase,
        });
        tsyringe_1.container.register('IUpdateUserProfileUsecase', {
            useClass: user_profile_update_usecase_1.UpdateUserProfileUsecase,
        });
        tsyringe_1.container.register('IUpdateUserPasswordUsecase', {
            useClass: update_user_password_usecase_1.UpdateUserPasswordUsecase,
        });
        tsyringe_1.container.register('IGetAllCodersUsecase', {
            useClass: get_all_coders_usecase_1.GetAllCoders,
        });
        tsyringe_1.container.register('IFollowCodersUsecase', {
            useClass: follow_coder_usecase_1.FollowCoders,
        });
        tsyringe_1.container.register('IUnfollowCodersUsecase', {
            useClass: unfollow_coders_usecase_1.UnfollowCodersUsecase,
        });
        tsyringe_1.container.register('IGetCoderUsecase', {
            useClass: get_coder_usecase_1.GetCoderUsecase,
        });
        tsyringe_1.container.register('IRunProblemUsecase', {
            useClass: run_problem_usecase_1.RunProblemUsecase,
        });
        tsyringe_1.container.register('ISubmitProblemUsecase', {
            useClass: sumbit_problem_usecase_1.SubmitProblemUsecase,
        });
        tsyringe_1.container.register('IGetProblemUpdatesUsecase', {
            useClass: get_problem_update_usecase_1.GetProblemUpdatesUsecase,
        });
        tsyringe_1.container.register('IGetAllPlansUseCase', {
            useClass: get_all_plans_usecase_1.GetAllPlansUseCase,
        });
        tsyringe_1.container.register('ICreateRazorpayOrderUseCase', {
            useClass: create_razorpay_order_usecase_1.CreateRazorpayOrderUseCase,
        });
        tsyringe_1.container.register('IVerifyPaymentUseCase', {
            useClass: verify_payment_usecase_1.VerifyPaymentUseCase,
        });
        tsyringe_1.container.register('IMarkFailedPaymentUseCase', {
            useClass: mark_failed_payment_usecase_1.MarkFailedPaymentUseCase,
        });
        tsyringe_1.container.register('IEditPlanUseCase', {
            useClass: edit_plan_usecase_1.EditPlanUseCase,
        });
        tsyringe_1.container.register('IGetAllPaymentsUseCase', {
            useClass: get_all_payments_usecase_1.GetAllPaymentsUseCase,
        });
        tsyringe_1.container.register('IGetContestUsecase', {
            useClass: get_contest_usecase_1.GetContestUsecase,
        });
        tsyringe_1.container.register('IUpdateContestUseCase', {
            useClass: update_contest_usecase_1.UpdateContestUseCase,
        });
        tsyringe_1.container.register('IDeleteContestUseCase', {
            useClass: delete_contest_usecase_1.DeleteContestUseCase,
        });
        tsyringe_1.container.register('IGetAllUpcomingAndOngoingContestUseCase', {
            useClass: get_all_upcoming_and_ongoing_contest_usecase_1.GetAllUpcomingAndOngoingContestUseCase,
        });
        tsyringe_1.container.register('IGetAllPastContestUsecase', {
            useClass: get_all_past_contest_usecase_1.GetAllPastContestUsecase,
        });
        tsyringe_1.container.register('IGetContestProblemsUsecase', {
            useClass: get_contest_problems_usecase_1.GetContestProblemsUsecase,
        });
        tsyringe_1.container.register('IContestProblemSubmitUsecase', {
            useClass: contest_problem_submit_usecase_1.ContestProblemSubmitUsecase,
        });
        tsyringe_1.container.register('IJoinContestUsecase', {
            useClass: join_contest_usecase_1.JoinContestUsecase,
        });
        tsyringe_1.container.register('IFinishContestUsecase', {
            useClass: finish_contest_usecase_1.FinishContestUsecase,
        });
        tsyringe_1.container.register('IGetContestLeaderboardUsecase', {
            useClass: get_contest_leaderboard_1.GetContestLeaderboardUsecase,
        });
        tsyringe_1.container.register('IGetAllAvailableProblemsForContestUsecase', {
            useClass: get_all_available_problems_for_contest_usecase_1.GetAllAvailableProblemsForContestUsecase
        });
        tsyringe_1.container.register("IAutoGenerateTestcasesUsecasse", {
            useClass: auto_generate_testcase_1.AutoGenerateTestcasesUsecasse
        });
        tsyringe_1.container.register("IGetAllChatsUsecase", {
            useClass: get_all_chats_1.GetAllChatsUsecase
        });
        tsyringe_1.container.register("IGetChatUsecase", {
            useClass: get_chat_1.GetChatsUsecase
        });
        tsyringe_1.container.register("ICreateInterviewUsecase", {
            useClass: create_interview_usecase_1.CreateInterviewUsecase
        });
        tsyringe_1.container.register("IGetAllInterviewsUsecase", {
            useClass: get_all_interviews_usecase_1.GetAllInterviewsUsecase
        });
        tsyringe_1.container.register("IDeleteInterviewUsecase", {
            useClass: delete_interview_usecase_1.DeleteInterviewUsecase
        });
        tsyringe_1.container.register("IGetAllInterviewsUserUsecase", {
            useClass: get_all_interview_user_usecase_1.GetAllInterviewsUserUsecase
        });
        tsyringe_1.container.register("ICreateInterviewSessionUsecase", {
            useClass: create_interview_session_usecase_1.CreateInterviewSessionUsecase
        });
        tsyringe_1.container.register("IGetInterviewQuestionUsecase", {
            useClass: get_interview_question_usecase_1.GetInterviewQuestionUsecase
        });
        tsyringe_1.container.register("IChangeAccountPasswordUsecase", {
            useClass: change_account_password_usecase_1.ChangeAccountPasswordUsecase
        });
        tsyringe_1.container.register('IGetAdminDashboardUsecase', {
            useClass: get_dashboard_usecase_2.GetAdminDashboardUsecase,
        });
        tsyringe_1.container.register('IGetAllNotificationsUsecase', {
            useClass: get_all_notifications_usecase_1.GetAllNotificationsUsecase,
        });
        tsyringe_1.container.register('IMarkNotificationReadUsecase', {
            useClass: mark_notification_read_usecase_1.MarkNotificationReadUsecase,
        });
        tsyringe_1.container.register('IUpdateAnswerAndFeedbackUsecase', {
            useClass: update_answer_and_feedback_usecase_1.UpdateAnswerAndFeedbackUsecase,
        });
        tsyringe_1.container.register('IFinishInterviewUsecase', {
            useClass: finish_interview_usecase_1.FinishInterviewUsecase,
        });
        tsyringe_1.container.register('IGetInterviewFeedbackUsecase', {
            useClass: get_interview_feedback_usecase_1.GetInterviewFeedbackUsecase,
        });
    }
}
exports.UsecaseRegistery = UsecaseRegistery;
//# sourceMappingURL=usecase-registry.js.map