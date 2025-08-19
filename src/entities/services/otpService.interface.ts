

export interface IOTPService{
    generateOtp():string
    verifyOtp(otp:string):boolean
} 