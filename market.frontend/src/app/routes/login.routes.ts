import { Route } from '@angular/router';
import { LoginComponent } from '../components';
import { APP_ROUTE_DEFS } from './paths';

export const LOGIN_ROUTE: Route = { path: APP_ROUTE_DEFS.login(), component: LoginComponent };
