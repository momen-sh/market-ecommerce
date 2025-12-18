import { Route } from '@angular/router';
import { NotFoundComponent } from '../components';
import { APP_ROUTE_DEFS } from './paths';

export const NOT_FOUND_ROUTE: Route = { path: APP_ROUTE_DEFS.notFound(), component: NotFoundComponent };
