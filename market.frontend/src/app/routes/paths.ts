export const APP_PATHS = {
  home: () => '/',
  category: (category: string) => `/category/${encodeURIComponent(category)}`,
  products: () => '/products',
  productDetail: (id: number | string) => `/product/${id}`,
  cart: () => '/cart',
  payment: () => '/payment',
  addProduct: () => '/admin/products/new',
  about: () => '/about',
  account: () => '/account',
  login: () => '/login',
  register: () => '/register'
} as const;

