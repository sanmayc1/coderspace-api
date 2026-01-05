import { container } from 'tsyringe';
import { DependencyInjection } from './di-registry';
import { AuthController } from '../../interfaceAdapters/controllers/auth/auth.controller';
import { ErrorMiddleware } from '../../interfaceAdapters/middleware/error-handle.middleware';
import { AuthMiddleware } from '../../interfaceAdapters/middleware/auth.middleware';
import { GithHubAuthController } from '../../interfaceAdapters/controllers/auth/github-auth.controller';
import { AuthRoute } from '../express/routes/auth/auth.route';
import { GoogleAuthService } from '../../interfaceAdapters/services/google-auth.service';
import { GoogleAuthController } from '../../interfaceAdapters/controllers/auth/google-auth.controller';
import { UserManagementController } from '../../interfaceAdapters/controllers/admin/user.management.controller';
import { AdminRoutes } from '../express/routes/admin/admin.routes';
import { UserManagementRoute } from '../express/routes/admin/user-management.route';
import { UserRoutes } from '../express/routes/user/user.route';
import { UserProfileController } from '../../interfaceAdapters/controllers/user/user-profile.controller';
import { CompanyRoutes } from '../express/routes/company/company.routes';
import { CompanyController } from '../../interfaceAdapters/controllers/company/company.controller';
import { ProblemManagementRoutes } from '../express/routes/admin/problem-management.route';
import { ProblemManagementController } from '../../interfaceAdapters/controllers/admin/problem.management.controller';
import { SkillsAndDomainManagementRoute } from '../express/routes/admin/skills-and-domain-management.route';
import { SkillAndDomainManagementController } from '../../interfaceAdapters/controllers/admin/skills-and-domain-management.controller';
import { UserProblemController } from '../../interfaceAdapters/controllers/user/user-problem.controller';
import { CompanyContestController } from '../../interfaceAdapters/controllers/company/contest.controller';
import { CommonRoute } from '../express/routes/common/common-route';
import { CommonController } from '../../interfaceAdapters/controllers/common/common.controller';
import { ProblemRoute } from '../express/routes/user/problem/problem.route';
import { CodersRoute } from '../express/routes/user/coders/coders.route';
import { CodersController } from '../../interfaceAdapters/controllers/user/coders.controller';

DependencyInjection.registerAll();

// Middleware
export const errorMiddleware = container.resolve(ErrorMiddleware);
export const authMiddleware = container.resolve(AuthMiddleware);

// Services
export const googleAuthService = container.resolve(GoogleAuthService);

// Controllers
export const authController = container.resolve(AuthController);
export const githubAuthController = container.resolve(GithHubAuthController);
export const googleAuthController = container.resolve(GoogleAuthController);
export const userManagementController = container.resolve(UserManagementController);
export const companyController = container.resolve(CompanyController);
export const userProfileController = container.resolve(UserProfileController);
export const problemManagementController = container.resolve(ProblemManagementController);
export const skillAndDomainManagementController = container.resolve(
  SkillAndDomainManagementController
);
export const userProblemController = container.resolve(UserProblemController);
export const companyContestController = container.resolve(CompanyContestController);
export const commonController = container.resolve(CommonController);
export const codersController = container.resolve(CodersController);

// Routes
export const authRoutes = container.resolve(AuthRoute);
export const userManagementRoute = container.resolve(UserManagementRoute);
export const problemManagementRoutes = container.resolve(ProblemManagementRoutes);
export const skillsAndDomainManagementRoute = container.resolve(SkillsAndDomainManagementRoute);
export const adminRoutes = container.resolve(AdminRoutes);
export const codersRoutes = container.resolve(CodersRoute);
export const problemRoutes = container.resolve(ProblemRoute);
export const userRoutes = container.resolve(UserRoutes);
export const companyRoutes = container.resolve(CompanyRoutes);
export const commonRoutes = container.resolve(CommonRoute);


