import SMTPPool from "nodemailer/lib/smtp-pool/index.js";
import { IEmailService } from "../../entities/services/emailService.interface.js";
import { createTransport } from "nodemailer";
import { config } from "../../shared/config.js";

export class EmailService implements IEmailService {
  private transport;
  constructor() {
    this.transport = createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: config.smtp.user,
        pass: config.smtp.pass,
      },
    });
  }
  async sendMail(email: string, content: string): Promise<void> {
    this.transport.sendMail({
      from: `"CoderSpace" <${config.smtp.user}>`,
      to: email,
      subject: "Verification",
      html: content,
    });
  }
}
