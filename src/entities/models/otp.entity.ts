

export interface IOtpEntity {
  _id: string;
  otp: string;
  expiry: Date;
  email: string;
}