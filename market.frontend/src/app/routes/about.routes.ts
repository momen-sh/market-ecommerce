import { Route } from '@angular/router';
import { AboutComponent } from '../components';
import { APP_ROUTE_DEFS } from './paths';

export const ABOUT_ROUTE: Route = { path: APP_ROUTE_DEFS.about(), component: AboutComponent };
