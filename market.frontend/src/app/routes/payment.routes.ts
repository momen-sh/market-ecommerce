import { Route } from '@angular/router';
import { PaymentComponent } from '../components';
import { APP_ROUTE_DEFS } from './paths';

export const PAYMENT_ROUTE: Route = { path: APP_ROUTE_DEFS.payment(), component: PaymentComponent };
