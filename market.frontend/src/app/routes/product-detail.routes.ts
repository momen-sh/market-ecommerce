import { Route } from '@angular/router';
import { ProductDetailComponent } from '../components';
import { APP_ROUTE_DEFS } from './paths';

export const PRODUCT_DETAIL_ROUTE: Route = { path: APP_ROUTE_DEFS.productDetail(), component: ProductDetailComponent };
