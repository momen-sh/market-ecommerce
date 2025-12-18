import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { CreateProductFormDto, ProductService } from 'src/app/services/product.service';
import { TranslationService } from 'src/app/services/translation.service';
import { APP_PATHS } from 'src/app/routes/paths';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  isAdmin = false;
  loading = false;
  error = '';
  success = '';

  categories: string[] = [];

  form: CreateProductFormDto = {
    name: '',
    price: 0,
    description: '',
    category: ''
  };

  imageFile: File | null = null;

  constructor(
    private auth: AuthService,
    private productService: ProductService,
    private router: Router,
    private i18n: TranslationService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    const user = this.auth.currentUser;
    if (!user) {
      this.router.navigateByUrl(APP_PATHS.login());
      return;
    }

    this.isAdmin = this.auth.isAdmin();
    if (!this.isAdmin) return;

    this.categories = this.categoriesService
      .getCategories()
      .map(String)
      .filter(c => c !== 'All');
  }

  submit(): void {
    if (!this.isAdmin || this.loading) return;

    this.error = '';
    this.success = '';

    if (!this.form.name || !this.form.category || !this.imageFile) {
      this.error = this.i18n.translate('admin.required');
      return;
    }

    if (!this.form.price || this.form.price <= 0) {
      this.error = this.i18n.translate('admin.priceInvalid');
      return;
    }

    this.loading = true;

    this.productService.createProductWithImage({
      name: this.form.name,
      price: Number(this.form.price),
      description: this.form.description,
      category: this.form.category
    }, this.imageFile).subscribe({
      next: () => {
        this.loading = false;
        this.success = this.i18n.translate('admin.success');
        this.form = { name: '', price: 0, description: '', category: '' };
        this.imageFile = null;
      },
      error: () => {
        this.loading = false;
        this.error = this.i18n.translate('admin.fail');
      }
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.imageFile = input.files && input.files.length ? input.files[0] : null;
  }
}
