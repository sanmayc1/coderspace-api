"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const nodemailer_1 = require("nodemailer");
const config_1 = require("../../shared/config");
class EmailService {
    transport;
    constructor() {
        this.transport = (0, nodemailer_1.createTransport)({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: config_1.config.smtp.user,
                pass: config_1.config.smtp.pass,
            },
        });
    }
    async sendMail(email, content, subject) {
        this.transport.sendMail({
            from: `"CoderSpace" <${config_1.config.smtp.user}>`,
            to: email,
            subject,
            html: content,
        });
    }
}
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map