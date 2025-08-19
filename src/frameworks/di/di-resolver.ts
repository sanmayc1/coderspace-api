import { container } from "tsyringe";
import { DependencyInjection } from "./di-registry.js";
import { AuthController } from "../../interfaceAdapters/controllers/auth/auth.controller.js";
import { ErrorMiddleware } from "../../interfaceAdapters/middleware/error-handle.middleware.js";

DependencyInjection.registerAll();

export const authcontroller = container.resolve(AuthController);
export const errorMiddleware = container.resolve(ErrorMiddleware);
