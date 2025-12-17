import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { Categories } from '../enums';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  constructor(private productService: ProductService) {}

  getCategories(): (Categories | string)[] {
    return this.productService.getCategories();
  }
}
