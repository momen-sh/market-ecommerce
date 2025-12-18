import { Route } from '@angular/router';
import { AddProductComponent } from '../components';
import { APP_ROUTE_DEFS } from './paths';

export const ADD_PRODUCT_ROUTE: Route = { path: APP_ROUTE_DEFS.addProduct(), component: AddProductComponent };
