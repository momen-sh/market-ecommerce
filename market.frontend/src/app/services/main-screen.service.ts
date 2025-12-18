import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { Observable } from 'rxjs';
import { Product } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class MainScreenService {
  constructor(private productService: ProductService) {}

  getProducts(): Observable<Product[]> {
    return this.productService.getAll();
  }

  filter(query: string, category: string): Observable<Product[]> {
    return this.productService.filter(query, category);
  }
}
