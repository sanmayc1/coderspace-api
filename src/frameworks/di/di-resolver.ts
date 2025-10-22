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

DependencyInjection.registerAll();

export const authController = container.resolve(AuthController);
export const errorMiddleware = container.resolve(ErrorMiddleware);
export const authMiddleware = container.resolve(AuthMiddleware);
export const githubAuthController = container.resolve(GithHubAuthController);
export const googleAuthService = container.resolve(GoogleAuthService);
export const googleAuthController = container.resolve(GoogleAuthController);
export const authRoutes = container.resolve(AuthRoute);
export const userManagementController = container.resolve(
  UserManagementController
);
export const userProfileController = container.resolve(UserProfileController);
export const userManagementRoute = container.resolve(UserManagementRoute);
export const companyController  = container.resolve(CompanyController)
export const adminRoutes = container.resolve(AdminRoutes);
export const userRoutes = container.resolve(UserRoutes);
export const companyRoutes = container.resolve(CompanyRoutes)

