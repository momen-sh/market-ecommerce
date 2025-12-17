import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { SearchService } from '../../services/search.service';
import { ProductService } from '../../services/product.service';
import { ItemDetailsService } from '../../services/item-details.service';
import { CategoriesService } from '../../services/categories.service';
import { Product } from '../../interfaces';
import { Categories } from '../../enums';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit, OnDestroy {
  categories: (Categories | string)[] = [];
  selectedCategory: Categories | string = Categories.All;

  filteredProducts: Product[] = [];
  query = '';

  private searchSub?: Subscription;

  constructor(
    private cartService: CartService,
    private searchService: SearchService,
    private productService: ProductService,
    private itemDetailsService: ItemDetailsService,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.categories = this.categoriesService.getCategories();
    this.productService.getAll().subscribe(list => {
      this.filteredProducts = list;
    });
    this.searchSub = this.searchService.query$.subscribe(q => {
      this.query = q || '';
      this.onSearch();
    });
  }

  onSearch(): void {
    this.productService.filter(this.query, this.selectedCategory)
      .subscribe(list => this.filteredProducts = list);
  }

  selectCategory(category: Categories | string): void {
    this.selectedCategory = category;
    this.onSearch();
  }

  addToCart(p: Product): void {
    this.cartService.add(p);
  }

  openDetail(p: Product): void {
    this.itemDetailsService.openDetails(p);
  }

  ngOnDestroy(): void {
    this.searchSub?.unsubscribe();
  }
}
