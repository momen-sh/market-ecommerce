import { Route } from '@angular/router';
import { AccountComponent } from '../components';
import { APP_ROUTE_DEFS } from './paths';

export const ACCOUNT_ROUTE: Route = { path: APP_ROUTE_DEFS.account(), component: AccountComponent };
