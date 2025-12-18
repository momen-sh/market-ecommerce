import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product } from '../interfaces';
import { Categories } from '../enums';

type ApiProduct = {
  id: number;
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
  image?: string;
  category?: string;
};

export type CreateProductDto = {
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
};

export type CreateProductFormDto = {
  name: string;
  price: number;
  description: string;
  category: string;
};

@Injectable({ providedIn: 'root' })
export class ProductService {
  private base = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  getAll(query?: string, category?: string): Observable<Product[]> {
    let params = new HttpParams();
    const q = (query ?? '').trim();
    if (q) params = params.set('query', q);

    // Skip sending the catch-all category to avoid filtering everything out.
    if (category && category !== Categories.All && category !== 'All') {
      params = params.set('category', category);
    }

    return this.http.get<ApiProduct[]>(this.base, { params }).pipe(
      map(list => list.map(p => this.toProduct(p)))
    );
  }

  getById(id: number): Observable<Product> {
    return this.http.get<ApiProduct>(`${this.base}/${id}`).pipe(
      map(p => this.toProduct(p))
    );
  }

  createProduct(dto: CreateProductDto): Observable<Product> {
    return this.http.post<ApiProduct>(this.base, dto).pipe(
      map(p => this.toProduct(p))
    );
  }

  createProductWithImage(dto: CreateProductFormDto, image: File): Observable<Product> {
    const form = new FormData();
    form.append('name', dto.name);
    form.append('price', String(dto.price));
    form.append('description', dto.description ?? '');
    form.append('category', dto.category);
    form.append('image', image);

    return this.http.post<ApiProduct>(`${this.base}/with-image`, form).pipe(
      map(p => this.toProduct(p))
    );
  }

  getCategories(): (Categories | string)[] {
    return Object.values(Categories);
  }

  filter(query?: string, category?: Categories | string) {
    const normalizedCategory =
      category === Categories.All || category === 'All' ? undefined : category;

    return this.getAll(query ?? undefined, normalizedCategory ? String(normalizedCategory) : undefined);
  }

  private toProduct(p: ApiProduct): Product {
    return {
      id: p.id,
      name: p.name,
      price: p.price,
      description: p.description,
      image: p.image ?? (p.imageUrl ? `${environment.imgUrl}/${p.imageUrl}` : undefined),
      category: p.category
    };
  }

  extractCategories(products: Product[]): (Categories | string)[] {
    const unique = Array.from(
      new Set(
        products
          .map(p => p.category)
          .filter((c): c is string => !!c)
      )
    );
    return [Categories.All, ...unique];
  }
}
