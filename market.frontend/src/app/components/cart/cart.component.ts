import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { CartItem } from '../../interfaces';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  items: CartItem[] = [];
  private sub?: Subscription;

  constructor(private cart: CartService, private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    // ❌ احذف السطر القديم
    // this.items = this.cart.getItems();

    // ✅ الطريقة الصحيحة
    this.sub = this.cart.items$.subscribe(list => {
      this.items = list;
    });

    // (اختياري لكن ممتاز)
    // تأكد إن السلة محدثة من السيرفر
    this.cart.refresh().subscribe();
  }

  clear(): void {
    this.cart.clear();
  }

  increment(productId: number): void {
    this.cart.increment(productId);
  }

  decrement(productId: number): void {
    this.cart.decrement(productId);
  }

  remove(productId: number): void {
    this.cart.remove(productId);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  get total(): number {
    return this.items.reduce((sum, it) => sum + (it.product.price || 0) * (it.quantity || 0), 0);
  }

  checkout(): void {
    if (!this.items.length) return;

    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.router.navigate(['/payment']);
  }
}
