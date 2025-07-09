export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  category: string;
  imageUrl: string;
  images?: string[];
  rating: number;
  reviewCount: number;
  badge?: 'new' | 'popular' | 'sale';
  inStock: boolean;
  createdAt: Date;
  updatedAt: Date;
  // Détails supplémentaires pour la page produit
  characteristics?: {
    label: string;
    value: string;
  }[];
  details?: string[];
  relatedProducts?: number[];
}

export interface Category {
  id: number;
  name: string;
  icon: string;
  productCount: number;
}

export interface ProductFilter {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'popular' | 'recent' | 'price-asc' | 'price-desc';
  page?: number;
  pageSize?: number;
}

export interface PaginatedProducts {
  items: Product[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
} 