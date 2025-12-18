import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  MainScreenComponent,
  NavbarComponent,
  CartComponent,
  ProductsComponent,
  ProductDetailComponent,
  AboutComponent,
  NotFoundComponent,
  LoginComponent,
  RegisterComponent,
  AccountComponent,
  CategoriesComponent,
  ItemDetailsComponent,
  PaymentComponent,
  AddProductComponent,
} from './components';
import { TranslatePipe } from './pipes/translate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MainScreenComponent,
    NavbarComponent,
    CartComponent,
    ProductsComponent,
    ProductDetailComponent,
    AboutComponent,
    NotFoundComponent,
    LoginComponent,
    RegisterComponent,
    AccountComponent,
    CategoriesComponent,
    ItemDetailsComponent,
    PaymentComponent,
    TranslatePipe,
    AddProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
