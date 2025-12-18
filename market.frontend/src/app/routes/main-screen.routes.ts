import { Route } from '@angular/router';
import { MainScreenComponent } from '../components';
import { APP_ROUTE_DEFS, APP_ROUTE_SEGMENTS } from './paths';

export const MAIN_SCREEN_ROUTE: Route = { path: APP_ROUTE_DEFS.home(), component: MainScreenComponent };
export const CATEGORY_ROUTE: Route = { path: `${APP_ROUTE_SEGMENTS.category}/:category`, component: MainScreenComponent };
