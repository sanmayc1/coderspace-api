



export interface IVerifyPaymentUseCase {
    execute(razorpayOrderId:string,razorpayPaymentId:string,razorpaySignature:string,accountId:string):Promise<void>
}