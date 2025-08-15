import { container } from "tsyringe";
import { DependencyInjection } from "./di-registry.js";
import { AuthController } from "../../interfaceAdapters/controllers/auth/auth.controller.js";




DependencyInjection.registerAll()

export const authcontroller = container.resolve(AuthController)