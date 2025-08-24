import { IEmailService } from "../../entities/services/email-service.interface.js";
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
  async sendMail(email: string, content: string,subject:string): Promise<void> {
    this.transport.sendMail({
      from: `"CoderSpace" <${config.smtp.user}>`,
      to: email,
      subject,
      html: content,
    });
  }
}
