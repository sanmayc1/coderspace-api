
export interface IJwtPayload {
  userId: string;
  role: string;
  isProfileComplete: string;
  exp?:number
}