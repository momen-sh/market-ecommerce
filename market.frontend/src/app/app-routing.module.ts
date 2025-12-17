import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  MainScreenComponent,
  CartComponent,
  ProductsComponent,
  ProductDetailComponent,
  AboutComponent,
  NotFoundComponent,
  LoginComponent,
  RegisterComponent,
  AccountComponent,
  PaymentComponent,
  AddProductComponent
} from './components';

const routes: Routes = [
  { path: '', component: MainScreenComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'cart', component: CartComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'admin/products/new', component: AddProductComponent },
  { path: 'about', component: AboutComponent },
  { path: 'account', component: AccountComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: NotFoundComponent }
  // future: add product/:id, about, etc.
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
