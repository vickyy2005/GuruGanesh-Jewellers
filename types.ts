export interface Product {
  id: string;
  name: string;
  category: 'Necklaces' | 'Earrings' | 'Rings' | 'Bracelets';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount?: number;
  image: string;
  gallery?: string[];
  description: string;
  isBestseller?: boolean;
  isSummerCollection?: boolean;
  isNew?: boolean;
  isSale?: boolean;
  details?: string[];
  variants?: string[];
  sizes?: string[];
  materialsCare?: string;
  shippingReturns?: string;
  inStock?: boolean;
  sku?: string;
  material?: string;
  stoneDetails?: string;
  deliveryEstimate?: string;
  tags?: string[];
}

export interface Category {
  id: string;
  name: string;
  image: string;
  subtext: string;
  linkCategory: 'Necklaces' | 'Earrings' | 'Rings' | 'Bracelets';
}

export interface BlogPost {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
  selectedSize?: string;
}

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type?: 'success' | 'info';
}
