import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CartItem, Product } from '../interfaces';
import { AuthService } from './auth.service';

type ApiCartItem = { productId: number; quantity: number; product?: any; Product?: any; };
type ApiCartResponse = { items: ApiCartItem[]; total: number };

@Injectable({ providedIn: 'root' })
export class CartService {
  private base = `${environment.apiUrl}/cart`;

  private itemsSubject = new BehaviorSubject<CartItem[]>([]);
  readonly items$ = this.itemsSubject.asObservable();

  private countSubject = new BehaviorSubject<number>(0);
  readonly count$ = this.countSubject.asObservable();

  constructor(private http: HttpClient, private auth: AuthService) {
    if (this.auth.isLoggedIn()) {
      this.refresh().subscribe();
    }

    this.auth.user$.subscribe(u => {
      if (!u) this.setItems([]);
    });
  }

  refresh() {
    if (!this.auth.isLoggedIn()) {
      this.setItems([]);
      return of({ items: [], total: 0 });
    }

    return this.http.get<ApiCartResponse>(this.base).pipe(
      map(res => {
        const items: CartItem[] = res.items.map(i => ({
          quantity: i.quantity,
          product: this.toProduct(i.product ?? i.Product)
        }));
        return { items, total: res.total };
      }),
      tap(res => this.setItems(res.items)),
      catchError(() => {
        this.setItems([]);
        return of({ items: [], total: 0 });
      })
    );
  }

  add(product: Product, quantity: number = 1): void {
    if (!this.auth.isLoggedIn()) return;

    this.http.post(this.base, { productId: product.id, quantity })
      .pipe(tap(() => this.refresh().subscribe()))
      .subscribe();
  }

  decrement(productId: number): void {
    if (!this.auth.isLoggedIn()) return;

    const current = this.itemsSubject.value.find(i => i.product.id === productId);
    if (!current) return;

    const newQty = (current.quantity || 0) - 1;
    if (newQty <= 0) {
      this.remove(productId);
      return;
    }

    this.http.patch(`${this.base}/${productId}`, { quantity: newQty })
      .pipe(tap(() => this.refresh().subscribe()))
      .subscribe();
  }

  increment(productId: number): void {
    if (!this.auth.isLoggedIn()) return;

    const current = this.itemsSubject.value.find(i => i.product.id === productId);
    const newQty = (current?.quantity || 0) + 1;

    this.http.patch(`${this.base}/${productId}`, { quantity: newQty })
      .pipe(tap(() => this.refresh().subscribe()))
      .subscribe();
  }

  remove(productId: number): void {
    if (!this.auth.isLoggedIn()) return;

    this.http.delete(`${this.base}/${productId}`)
      .pipe(tap(() => this.refresh().subscribe()))
      .subscribe();
  }

  clear(): void {
    if (!this.auth.isLoggedIn()) return;

    this.http.delete(this.base)
      .pipe(tap(() => this.refresh().subscribe()))
      .subscribe();
  }

  private setItems(items: CartItem[]): void {
    this.itemsSubject.next(items);
    this.countSubject.next(items.reduce((s, it) => s + (it.quantity || 0), 0));
  }

  private toProduct(p: any): Product {
    return {
      id: p.id,
      name: p.name,
      price: p.price,
      description: p.description,
      image: p.image ?? (p.imageUrl ? `${environment.imgUrl}/${p.imageUrl}` : undefined),
      category: p.category
    };
  }
}
