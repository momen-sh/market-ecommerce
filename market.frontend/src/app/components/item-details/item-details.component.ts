import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../../interfaces';
import { ItemDetailsService } from '../../services/item-details.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit, OnDestroy {
  item: Product | null = null;
  isOpen = false;
  private itemSub?: Subscription;
  private openSub?: Subscription;
  private qtySub?: Subscription;
  quantity = 1;

  constructor(private itemDetailsService: ItemDetailsService, private cartService: CartService) { }

  ngOnInit(): void {
    this.itemSub = this.itemDetailsService.selectedItem$.subscribe(item => this.item = item);
    this.openSub = this.itemDetailsService.isOpen$.subscribe(isOpen => this.isOpen = isOpen);
    this.qtySub = this.itemDetailsService.quantity$.subscribe(q => this.quantity = q);
  }

  ngOnDestroy(): void {
    this.itemSub?.unsubscribe();
    this.openSub?.unsubscribe();
    this.qtySub?.unsubscribe();
  }

  onClose(): void {
    this.itemDetailsService.closeDetails();
  }

  onAddToCart(): void {
    if (!this.item) return;
    this.cartService.add(this.item, this.quantity);
    this.itemDetailsService.closeDetails();
  }
  increment(): void {
    this.itemDetailsService.increment();
  }

  decrement(): void {
    this.itemDetailsService.decrement();
  }

  onQuantityChange(value: number): void {
    const v = Math.max(1, Math.floor(Number(value) || 1));
    this.itemDetailsService.setQuantity(v);   // ✅ المهم
  }

}
