"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRegistry = void 0;
const tsyringe_1 = require("tsyringe");
const winston_logger_adapter_1 = require("../../interfaceAdapters/services/logger/winston-logger.adapter");
const bcrypt_1 = require("../security/bcrypt");
const jwt_service_1 = require("../../interfaceAdapters/services/jwt-service");
const otp_service_1 = require("../../interfaceAdapters/services/otp.service");
const email_service_1 = require("../../interfaceAdapters/services/email.service");
const auth_middleware_1 = require("../../interfaceAdapters/middleware/auth.middleware");
const uuid_service_1 = require("../../interfaceAdapters/services/uuid.service");
const github_auth_service_1 = require("../../interfaceAdapters/services/github-auth.service");
const google_auth_service_1 = require("../../interfaceAdapters/services/google-auth.service");
const image_store_service_1 = require("../../interfaceAdapters/services/image-store.service");
const compiler_service_1 = require("../../interfaceAdapters/services/compiler.service");
const payment_service_1 = require("../../interfaceAdapters/services/payment.service");
const gemini_service_1 = require("../../interfaceAdapters/services/gemini.service");
const tts_and_stt_service_1 = require("../../interfaceAdapters/services/tts-and-stt.service");
class ServiceRegistry {
    static registerServices() {
        tsyringe_1.container.registerSingleton('IOtpService', otp_service_1.OtpService);
        tsyringe_1.container.registerSingleton('IEmailService', email_service_1.EmailService);
        tsyringe_1.container.registerSingleton('IUniqueIdService', uuid_service_1.UniqueIdService);
        tsyringe_1.container.registerSingleton('IGitHubAuthService', github_auth_service_1.GitHubAuthService);
        tsyringe_1.container.registerSingleton('IGoogleAuthService', google_auth_service_1.GoogleAuthService);
        tsyringe_1.container.registerSingleton('IImageStoreService', image_store_service_1.ImageStoreService);
        tsyringe_1.container.registerSingleton('ICompilerService', compiler_service_1.CompilerService);
        tsyringe_1.container.registerSingleton('IPaymentService', payment_service_1.PaymentService);
        tsyringe_1.container.registerSingleton('IGeminiService', gemini_service_1.GeminiService);
        tsyringe_1.container.registerSingleton('ITtsAndSttService', tts_and_stt_service_1.TtsAndSttService);
        // logger
        tsyringe_1.container.registerSingleton('ILogger', winston_logger_adapter_1.WinstonLoggerAdapter);
        // security
        tsyringe_1.container.registerSingleton('IBcrypt', bcrypt_1.Bcrypt);
        tsyringe_1.container.registerSingleton('IJwtService', jwt_service_1.JwtService);
        // middleware
        tsyringe_1.container.registerSingleton('IAuthMiddleware', auth_middleware_1.AuthMiddleware);
    }
}
exports.ServiceRegistry = ServiceRegistry;
//# sourceMappingURL=service-registry.js.map