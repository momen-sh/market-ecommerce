import { Route } from '@angular/router';
import { MainScreenComponent } from '../components';

export const MAIN_SCREEN_ROUTE: Route = { path: '', component: MainScreenComponent };
export const CATEGORY_ROUTE: Route = { path: 'category/:category', component: MainScreenComponent };

