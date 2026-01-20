import Razorpay from 'razorpay';
import { config, injectable } from '../controllers/auth';
import { IPaymentService } from '../../domain/services/payment-service.interface';
import { Orders } from 'razorpay/dist/types/orders';
import crypto from 'crypto';

@injectable()
export class PaymentService implements IPaymentService {
  constructor(
    private razorpay = new Razorpay({
      key_id: config.razorpay.apiKey,
      key_secret: config.razorpay.secert,
    })
  ) {}

  async createRazorpayOrder(amount: number): Promise<Orders.RazorpayOrder> {
    return await this.razorpay.orders.create({
      amount: amount * 100,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    });
  }
  async verifyPayment(
    razorpayOrderId: string,
    razorpayPaymentId: string,
    razorpaySignature: string
  ): Promise<boolean> {
    const generatedSignature = crypto
      .createHmac('sha256', config.razorpay.secert!)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest('hex');

    const isVerified = generatedSignature === razorpaySignature;

    if (!isVerified) return false;
    const payment = await this.razorpay.payments.fetch(razorpayPaymentId);
    return payment.status === 'captured';
  }
}
