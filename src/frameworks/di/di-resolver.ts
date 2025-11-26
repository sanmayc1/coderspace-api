import { container } from "tsyringe";
import { DependencyInjection } from "./di-registry.js";
import { AuthController } from "../../interfaceAdapters/controllers/auth/auth.controller.js";
import { ErrorMiddleware } from "../../interfaceAdapters/middleware/error-handle.middleware.js";
import { AuthMiddleware } from "../../interfaceAdapters/middleware/auth.middleware.js";
import { GithHubAuthController } from "../../interfaceAdapters/controllers/auth/github-auth.controller.js";
import { AuthRoute } from "../express/routes/auth/auth.route.js";
import { GoogleAuthService } from "../../interfaceAdapters/services/google-auth.service.js";
import { GoogleAuthController } from "../../interfaceAdapters/controllers/auth/google-auth.controller.js";
import { UserManagementController } from "../../interfaceAdapters/controllers/admin/user.management.controller.js";
import { AdminRoutes } from "../express/routes/admin/admin.routes.js";
import { UserManagementRoute } from "../express/routes/admin/user-management.route.js";
import { UserRoutes } from "../express/routes/user/user.route.js";
import { UserProfileController } from "../../interfaceAdapters/controllers/user/user-profile.controller.js";
import { CompanyRoutes } from "../express/routes/company/company.routes.js";
import { CompanyController } from "../../interfaceAdapters/controllers/company/company.controller.js";
import { ProblemManagementRoutes } from "../express/routes/admin/problem-management.route.js";
import { ProblemManagementController } from "../../interfaceAdapters/controllers/admin/problem.management.controller.js";
import { SkillsAndDomainManagementRoute } from "../express/routes/admin/skills-and-domain-management.route.js";
import { SkillAndDomainManagementController } from "../../interfaceAdapters/controllers/admin/skills-and-domain-management.controller.js";
import { UserProblemController } from "../../interfaceAdapters/controllers/user/user-problem.controller.js";

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
export const userManagementController = container.resolve(
  UserManagementController
);
export const companyController  = container.resolve(CompanyController)
export const userProfileController = container.resolve(UserProfileController);
export const problemManagementController = container.resolve(ProblemManagementController)
export const skillAndDomainManagementController = container.resolve(SkillAndDomainManagementController)
export const userProblemController = container.resolve(UserProblemController)

// Routes 
export const authRoutes = container.resolve(AuthRoute);
export const userManagementRoute = container.resolve(UserManagementRoute);
export const problemManagementRoutes = container.resolve(ProblemManagementRoutes)
export const skillsAndDomainManagementRoute = container.resolve(SkillsAndDomainManagementRoute)
export const adminRoutes = container.resolve(AdminRoutes);
export const userRoutes = container.resolve(UserRoutes);
export const companyRoutes = container.resolve(CompanyRoutes)



