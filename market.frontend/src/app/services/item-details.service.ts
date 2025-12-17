import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../interfaces';
import { CartService } from './cart.service';

@Injectable({ providedIn: 'root' })
export class ItemDetailsService {
  private selectedItemSubject = new BehaviorSubject<Product | null>(null);
  readonly selectedItem$ = this.selectedItemSubject.asObservable();

  private isOpenSubject = new BehaviorSubject<boolean>(false);
  readonly isOpen$ = this.isOpenSubject.asObservable();

  private quantitySubject = new BehaviorSubject<number>(1);
  readonly quantity$ = this.quantitySubject.asObservable();

  constructor(private cartService: CartService) { }

  openDetails(item: Product): void {
    this.selectedItemSubject.next(item);
    this.quantitySubject.next(1);
    this.isOpenSubject.next(true);
  }

  closeDetails(): void {
    this.isOpenSubject.next(false);
    this.selectedItemSubject.next(null);
    this.quantitySubject.next(1);
  }

  getSelectedItem(): Product | null {
    return this.selectedItemSubject.value;
  }

  isDetailsOpen(): boolean {
    return this.isOpenSubject.value;
  }

  setQuantity(q: number): void {
    const val = Math.max(1, Math.floor(q || 1));
    this.quantitySubject.next(val);
  }

  increment(): void {
    this.quantitySubject.next(this.quantitySubject.value + 1);
  }

  decrement(): void {
    this.quantitySubject.next(Math.max(1, this.quantitySubject.value - 1));
  }

  addToCart(): void {
    const item = this.getSelectedItem();
    const qty = this.quantitySubject.value;
    if (item) {
      this.cartService.add(item, qty);
      this.closeDetails();
    }
  }
}
