export interface IEmailService {
  sendMail(email: string, content: string,subject:string): Promise<void>;
}
