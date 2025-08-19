export interface IEmailService {
  sendMail(email: string, template: string): Promise<void>;
}
