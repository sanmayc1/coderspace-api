import { container } from "tsyringe";
import { WinstonLoggerAdapter } from "../../interfaceAdapters/services/logger/winston-logger.adapter.js";
import { Bcrypt } from "../security/bcrypt.password.js";
import { JwtService } from "../../interfaceAdapters/services/jwt/jwt-service.js";

export class ServiceRegistry {
  static registerServices() {
    // logger
    container.registerSingleton("ILogger", WinstonLoggerAdapter);
    // security
    container.registerSingleton("IBcrypt", Bcrypt);
    container.registerSingleton("IJwtService",JwtService)
  }
}
