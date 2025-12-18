import { Route } from '@angular/router';
import { RegisterComponent } from '../components';
import { APP_ROUTE_DEFS } from './paths';

export const REGISTER_ROUTE: Route = { path: APP_ROUTE_DEFS.register(), component: RegisterComponent };
