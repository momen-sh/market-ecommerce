import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { ItemDetailsService } from 'src/app/services/item-details.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private itemDetailsService: ItemDetailsService
  ) { }

  ngOnInit(): void {
    this.productService.getAll().subscribe(list => this.products = list);
  }

  openDetail(p: Product): void {
    this.itemDetailsService.openDetails(p);
  }

  closeDetails(): void {
    this.itemDetailsService.closeDetails();
  }

  addToCart(p: Product): void {
    this.cartService.add(p);
  }
}
