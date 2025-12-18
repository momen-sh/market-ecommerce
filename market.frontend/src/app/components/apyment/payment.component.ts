import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PaymentService } from 'src/app/services/payment.service';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
})
export class PaymentComponent implements AfterViewInit, OnDestroy {
  stripeReady = false;
  loading = false;

  error = '';
  success = '';

  amount: number | null = null;
  currency: string | null = null;

  constructor(
    private payment: PaymentService,
    private auth: AuthService,
    private router: Router,
    private i18n: TranslationService
  ) {}

  async ngAfterViewInit(): Promise<void> {
    try {
      await this.payment.initCard('#card-element');
      this.stripeReady = true;
    } catch {
      this.error = this.i18n.translate('payment.failed');
    }
  }

  ngOnDestroy(): void {
    this.payment.teardown();
  }

  pay(): void {
    if (!this.stripeReady || this.loading) return;

    const user = this.auth.currentUser;
    if (!user) {
      this.error = this.i18n.translate('payment.failed');
      this.router.navigate(['/login']);
      return;
    }

    this.loading = true;
    this.error = '';
    this.success = '';

    this.payment.processPayment(user.id ?? 0).subscribe({
      next: (res) => {
        this.loading = false;
        this.amount = res.amount;
        this.currency = res.currency;

        if (res.error) {
          this.error = res.error.message || this.i18n.translate('payment.failed');
          return;
        }

        if (res.paymentIntentStatus === 'succeeded') {
          this.success = this.i18n.translate('payment.success');
        } else {
          this.error = `${this.i18n.translate('payment.status')}: ${res.paymentIntentStatus ?? 'unknown'}`;
        }
      },
      error: () => {
        this.loading = false;
        this.error = this.i18n.translate('payment.failed');
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/cart']);
  }
}
