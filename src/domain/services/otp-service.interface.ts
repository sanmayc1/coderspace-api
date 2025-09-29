import { IOtpEntity } from "../entities/otp.entity.js"


export interface IOtpService{
    generateOtp():string
    verifyOtp(current:string,original:string):Promise<boolean>
    storeOtp(email:string,otp:string):Promise<IOtpEntity>
    deleteOtp(email:string):Promise<void>
    otpExists(email:string):Promise<IOtpEntity|null>
} 