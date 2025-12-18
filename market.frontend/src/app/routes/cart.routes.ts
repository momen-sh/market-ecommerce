import { Route } from '@angular/router';
import { CartComponent } from '../components';
import { APP_ROUTE_DEFS } from './paths';

export const CART_ROUTE: Route = { path: APP_ROUTE_DEFS.cart(), component: CartComponent };
