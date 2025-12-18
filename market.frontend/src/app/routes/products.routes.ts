import { Route } from '@angular/router';
import { ProductsComponent } from '../components';
import { APP_ROUTE_DEFS } from './paths';

export const PRODUCTS_ROUTE: Route = { path: APP_ROUTE_DEFS.products(), component: ProductsComponent };
