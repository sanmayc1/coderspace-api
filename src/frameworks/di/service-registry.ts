import { container } from 'tsyringe';
import { WinstonLoggerAdapter } from '../../interfaceAdapters/services/logger/winston-logger.adapter';
import { Bcrypt } from '../security/bcrypt';
import { JwtService } from '../../interfaceAdapters/services/jwt-service';
import { OtpService } from '../../interfaceAdapters/services/otp.service';
import { EmailService } from '../../interfaceAdapters/services/email.service';
import { AuthMiddleware } from '../../interfaceAdapters/middleware/auth.middleware';
import { UniqueIdService } from '../../interfaceAdapters/services/uuid.service';
import { GitHubAuthService } from '../../interfaceAdapters/services/github-auth.service';
import { GoogleAuthService } from '../../interfaceAdapters/services/google-auth.service';
import { ImageStoreService } from '../../interfaceAdapters/services/image-store.service';

export class ServiceRegistry {
  static registerServices() {
    container.registerSingleton('IOtpService', OtpService);
    container.registerSingleton('IEmailService', EmailService);
    container.registerSingleton('IUniqueIdService', UniqueIdService);
    container.registerSingleton('IGitHubAuthService', GitHubAuthService);
    container.registerSingleton('IGoogleAuthService', GoogleAuthService);
    container.registerSingleton('IImageStoreService', ImageStoreService);
    // logger
    container.registerSingleton('ILogger', WinstonLoggerAdapter);
    // security
    container.registerSingleton('IBcrypt', Bcrypt);
    container.registerSingleton('IJwtService', JwtService);

    // middleware

    container.registerSingleton('IAuthMiddleware', AuthMiddleware);
  }
}
