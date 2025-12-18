export const APP_ROUTE_SEGMENTS = {
  category: 'category',
  products: 'products',
  product: 'product',
  cart: 'cart',
  payment: 'payment',
  addProduct: 'admin/products/new',
  about: 'about',
  account: 'account',
  login: 'login',
  register: 'register'
} as const;

export const APP_ROUTE_DEFS = {
  home: () => '',
  category: () => `${APP_ROUTE_SEGMENTS.category}/:category`,
  products: () => APP_ROUTE_SEGMENTS.products,
  productDetail: () => `${APP_ROUTE_SEGMENTS.product}/:id`,
  cart: () => APP_ROUTE_SEGMENTS.cart,
  payment: () => APP_ROUTE_SEGMENTS.payment,
  addProduct: () => APP_ROUTE_SEGMENTS.addProduct,
  about: () => APP_ROUTE_SEGMENTS.about,
  account: () => APP_ROUTE_SEGMENTS.account,
  login: () => APP_ROUTE_SEGMENTS.login,
  register: () => APP_ROUTE_SEGMENTS.register,
  notFound: () => '**'
} as const;

export const APP_PATHS = {
  home: () => '/',
  category: (category: string) => `/${APP_ROUTE_SEGMENTS.category}/${encodeURIComponent(category)}`,
  products: () => `/${APP_ROUTE_SEGMENTS.products}`,
  productDetail: (id: number | string) => `/${APP_ROUTE_SEGMENTS.product}/${id}`,
  cart: () => `/${APP_ROUTE_SEGMENTS.cart}`,
  payment: () => `/${APP_ROUTE_SEGMENTS.payment}`,
  addProduct: () => `/${APP_ROUTE_SEGMENTS.addProduct}`,
  about: () => `/${APP_ROUTE_SEGMENTS.about}`,
  account: () => `/${APP_ROUTE_SEGMENTS.account}`,
  login: () => `/${APP_ROUTE_SEGMENTS.login}`,
  register: () => `/${APP_ROUTE_SEGMENTS.register}`
} as const;
