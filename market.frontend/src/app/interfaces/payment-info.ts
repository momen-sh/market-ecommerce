export interface PaymentInfo {
  amount: number;
  currency: string;
  paymentIntentId?: string;
  status?: string;
  paidAt: string;
}
