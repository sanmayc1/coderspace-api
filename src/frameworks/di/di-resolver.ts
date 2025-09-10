import { container } from "tsyringe";
import { DependencyInjection } from "./di-registry.js";
import { AuthController } from "../../interfaceAdapters/controllers/auth/auth.controller.js";
import { ErrorMiddleware } from "../../interfaceAdapters/middleware/error-handle.middleware.js";
import { AuthMiddleware } from "../../interfaceAdapters/middleware/auth.middleware.js";
import { GithHubAuthController } from "../../interfaceAdapters/controllers/auth/github-auth.controller.js";
import { AuthRoute } from "../express/routes/auth/auth.route.js";
import { GoogleAuthService } from "../../interfaceAdapters/services/google-auth.service.js";
import { GoogleAuthController } from "../../interfaceAdapters/controllers/auth/google-auth.controller.js";

DependencyInjection.registerAll();

export const authcontroller = container.resolve(AuthController);
export const errorMiddleware = container.resolve(ErrorMiddleware);
export const authMiddleware  = container.resolve(AuthMiddleware)
export const githubAuthController = container.resolve(GithHubAuthController)
export const googleAuthService = container.resolve(GoogleAuthService)
export const googleAuthController =container.resolve(GoogleAuthController)
export const authRoutes = container.resolve(AuthRoute)