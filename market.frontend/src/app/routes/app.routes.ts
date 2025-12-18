import { Routes } from '@angular/router';
import { ABOUT_ROUTE } from './about.routes';
import { ACCOUNT_ROUTE } from './account.routes';
import { ADD_PRODUCT_ROUTE } from './add-product.routes';
import { CART_ROUTE } from './cart.routes';
import { LOGIN_ROUTE } from './login.routes';
import { CATEGORY_ROUTE, MAIN_SCREEN_ROUTE } from './main-screen.routes';
import { NOT_FOUND_ROUTE } from './not-found.routes';
import { PAYMENT_ROUTE } from './payment.routes';
import { PRODUCT_DETAIL_ROUTE } from './product-detail.routes';
import { PRODUCTS_ROUTE } from './products.routes';
import { REGISTER_ROUTE } from './register.routes';

export const APP_ROUTES: Routes = [
  MAIN_SCREEN_ROUTE,
  CATEGORY_ROUTE,
  PRODUCTS_ROUTE,
  PRODUCT_DETAIL_ROUTE,
  CART_ROUTE,
  PAYMENT_ROUTE,
  ADD_PRODUCT_ROUTE,
  ABOUT_ROUTE,
  ACCOUNT_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  NOT_FOUND_ROUTE
];

