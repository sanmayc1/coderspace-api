export interface IEmailService {
  sendMail(email: string, content: string): Promise<void>;
}
