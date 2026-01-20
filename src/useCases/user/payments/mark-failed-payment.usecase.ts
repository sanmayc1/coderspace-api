import { inject, injectable } from "tsyringe";
import { IMarkFailedPaymentUseCase } from "../../Interfaces/users/payments/mark-failed-payment.usecase.interface";
import { IPaymentRepository } from "../../../domain/repositoryInterfaces/payment-repository.interface";





@injectable()
export class MarkFailedPaymentUseCase implements IMarkFailedPaymentUseCase {
    constructor(@inject('IPaymentRepository') private _paymentRepository: IPaymentRepository) {}

    async execute(orderId: string): Promise<void> {
        
        const payment = await this._paymentRepository.findByRazorpayOrderId(orderId);

        if(!payment){
            throw new Error('Payment not found');
        }

        await this._paymentRepository.updatePaymentByRazorpayOrderId(orderId, {status: 'failed'});
    }
}