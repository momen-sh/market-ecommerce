import { Categories } from '../enums/categories.enum';

export interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  image?: string;
  category?: Categories | string;
}
