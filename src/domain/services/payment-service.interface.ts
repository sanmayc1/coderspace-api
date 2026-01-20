import { Orders } from "razorpay/dist/types/orders"








export interface IPaymentService{
    createRazorpayOrder(amount:number):Promise<Orders.RazorpayOrder>
    verifyPayment(razorpayOrderId:string,razorpayPaymentId:string,razorpaySignature:string):Promise<boolean>
}