import { container } from "tsyringe";
import { WinstonLoggerAdapter } from "../../interfaceAdapters/services/logger/winston-logger.adapter.js";
import { Bcrypt } from "../security/bcrypt.password.js";
import { JwtService } from "../../interfaceAdapters/services/jwt-service.js";
import { OtpService } from "../../interfaceAdapters/services/otp.service.js";
import { EmailService } from "../../interfaceAdapters/services/email.service.js";

export class ServiceRegistry {
  static registerServices() {

    container.registerSingleton("IOtpService",OtpService)
    container.registerSingleton("IEmailService",EmailService)
    // logger
    container.registerSingleton("ILogger", WinstonLoggerAdapter);
    // security
    container.registerSingleton("IBcrypt", Bcrypt);
    container.registerSingleton("IJwtService",JwtService)


  }
}
