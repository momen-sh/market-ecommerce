import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loadStripe, Stripe, StripeCardElement, StripeElements } from '@stripe/stripe-js';
import { defer, from, map, of, switchMap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private stripePublicKey = 'pk_test_51Sf6wVFxq4je6cuVjioTgQnq04qiPNiou1RRugaQe3gOjfMt4Jh3WeEQ79WLAMM6jqioSOZSWskNgHSa5PJsZkSv00A4kR3AMn';

  private stripe?: Stripe;
  private elements?: StripeElements;
  private card?: StripeCardElement;

  constructor(private http: HttpClient) {}

  async initCard(elementSelector: string): Promise<void> {
    const stripe = await loadStripe(this.stripePublicKey);
    if (!stripe) throw new Error('Stripe could not be initialized.');

    this.stripe = stripe;
    this.elements = stripe.elements();
    this.card = this.elements.create('card');
    this.card.mount(elementSelector);
  }

  teardown(): void {
    try {
      this.card?.unmount();
    } catch {}
    this.card = undefined;
    this.elements = undefined;
    this.stripe = undefined;
  }

  processPayment(userId: number) {
    return defer(() => {
      if (!this.stripe || !this.card) {
        return throwError(() => new Error('Stripe not ready.'));
      }
      return of(null);
    }).pipe(
      switchMap(() => this.createIntent(userId)),
      switchMap(res =>
        from(
          this.stripe!.confirmCardPayment(res.clientSecret, {
            payment_method: { card: this.card! },
          })
        ).pipe(
          map(result => ({
            amount: res.amount,
            currency: res.currency,
            paymentIntentStatus: result.paymentIntent?.status,
            paymentIntentId: res.paymentIntentId || result.paymentIntent?.id,
            error: result.error,
          }))
        )
      )
    );
  }

  createIntent(userId: number) {
    return this.http.post<{
      clientSecret: string;
      paymentIntentId: string;
      amount: number;
      currency: string;
    }>(`${environment.apiUrl}/payments/create-intent`, { userId, currency: 'usd' });
  }
}
