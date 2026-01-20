




export interface IMarkFailedPaymentUseCase {
  execute(orderId: string): Promise<void>;
}