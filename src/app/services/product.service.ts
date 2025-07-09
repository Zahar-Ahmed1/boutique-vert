import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Product, Category, ProductFilter, PaginatedProducts } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Produit Premium 1',
      description: 'Une description détaillée du produit premium avec ses caractéristiques uniques.',
      price: 99.99,
      category: 'Catégorie 1',
      imageUrl: 'https://picsum.photos/400/300?random=1',
      images: [
        'https://picsum.photos/400/300?random=1',
        'https://picsum.photos/400/300?random=2',
        'https://picsum.photos/400/300?random=3',
        'https://picsum.photos/400/300?random=4'
      ],
      rating: 1.5,
      reviewCount: 128,
      badge: 'popular',
      inStock: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
      characteristics: [
        { label: 'Marque', value: 'Premium Brand' },
        { label: 'Modèle', value: 'XL-2024' },
        { label: 'Couleur', value: 'Noir' },
        { label: 'Matériau', value: 'Aluminium' }
      ],
      details: [
        'Design ergonomique pour un confort optimal',
        'Technologie de pointe intégrée',
        'Garantie de 2 ans',
        'Livraison gratuite incluse'
      ],
      relatedProducts: [2, 3, 4]
    },
    {
      id: 2,
      name: 'Produit 2',
      description: 'Description détaillée du produit 2 avec ses spécificités.',
      price: 149.99,
      category: 'Catégorie 2',
      imageUrl: 'https://picsum.photos/400/300?random=5',
      images: [
        'https://picsum.photos/400/300?random=5',
        'https://picsum.photos/400/300?random=6',
        'https://picsum.photos/400/300?random=7',
        'https://picsum.photos/400/300?random=8'
      ],
      rating: 4.0,
      reviewCount: 89,
      badge: 'new',
      inStock: true,
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-02-01'),
      characteristics: [
        { label: 'Marque', value: 'Brand X' },
        { label: 'Modèle', value: 'YZ-2024' },
        { label: 'Couleur', value: 'Bleu' },
        { label: 'Matériau', value: 'Plastique' }
      ],
      details: [
        'Design ergonomique pour un confort optimal',
        'Technologie de pointe intégrée',
        'Garantie de 1 an',
        'Livraison gratuite incluse'
      ],
      relatedProducts: [1, 3, 5]
    },
    {
      id: 3,
      name: 'Produit 3',
      description: 'Description détaillée du produit 3 avec ses avantages.',
      price: 159.99,
      oldPrice: 199.99,
      category: 'Catégorie 3',
      imageUrl: 'https://picsum.photos/400/300?random=9',
      images: [
        'https://picsum.photos/400/300?random=9',
        'https://picsum.photos/400/300?random=10',
        'https://picsum.photos/400/300?random=11',
        'https://picsum.photos/400/300?random=12'
      ],
      rating: 3.0,
      reviewCount: 256,
      badge: 'new',
      inStock: true,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-02-15'),
      characteristics: [
        { label: 'Marque', value: 'Brand Z' },
        { label: 'Modèle', value: 'AB-2024' },
        { label: 'Couleur', value: 'Gris' },
        { label: 'Matériau', value: 'Acier' }
      ],
      details: [
        'Design ergonomique pour un confort optimal',
        'Technologie de pointe intégrée',
        'Garantie de 3 ans',
        'Livraison gratuite incluse'
      ],
      relatedProducts: [1, 2, 4]
    },
    {
      id: 4,
      name: 'Produit 3',
      description: 'Description détaillée du produit 3 avec ses avantages.',
      price: 159.99,
      oldPrice: 199.99,
      category: 'Catégorie 3',
      imageUrl: 'https://picsum.photos/400/300?random=13',
      images: [
        'https://picsum.photos/400/300?random=13',
        'https://picsum.photos/400/300?random=14',
        'https://picsum.photos/400/300?random=15',
        'https://picsum.photos/400/300?random=16'
      ],
      rating: 1.5,
      reviewCount: 256,
      badge: 'popular',
      inStock: true,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-02-15'),
      characteristics: [
        { label: 'Marque', value: 'Brand Z' },
        { label: 'Modèle', value: 'AB-2024' },
        { label: 'Couleur', value: 'Gris' },
        { label: 'Matériau', value: 'Acier' }
      ],
      details: [
        'Design ergonomique pour un confort optimal',
        'Technologie de pointe intégrée',
        'Garantie de 3 ans',
        'Livraison gratuite incluse'
      ],
      relatedProducts: [1, 2, 3]
    },
    {
      id: 5,
      name: 'Produit Premium 1',
      description: 'Une description détaillée du produit premium avec ses caractéristiques uniques.',
      price: 99.99,
      category: 'Catégorie 1',
      imageUrl: 'https://picsum.photos/400/300?random=17',
      images: [
        'https://picsum.photos/400/300?random=17',
        'https://picsum.photos/400/300?random=18',
        'https://picsum.photos/400/300?random=19',
        'https://picsum.photos/400/300?random=20'
      ],
      rating: 4.5,
      reviewCount: 128,
      badge: 'popular',
      inStock: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
      characteristics: [
        { label: 'Marque', value: 'Premium Brand' },
        { label: 'Modèle', value: 'XL-2024' },
        { label: 'Couleur', value: 'Noir' },
        { label: 'Matériau', value: 'Aluminium' }
      ],
      details: [
        'Design ergonomique pour un confort optimal',
        'Technologie de pointe intégrée',
        'Garantie de 2 ans',
        'Livraison gratuite incluse'
      ],
      relatedProducts: [2, 3, 4]
    },
    {
      id: 6,
      name: 'Produit 2',
      description: 'Description détaillée du produit 2 avec ses spécificités.',
      price: 149.99,
      category: 'Catégorie 2',
      imageUrl: 'https://picsum.photos/400/300?random=21',
      images: [
        'https://picsum.photos/400/300?random=21',
        'https://picsum.photos/400/300?random=22',
        'https://picsum.photos/400/300?random=23',
        'https://picsum.photos/400/300?random=24'
      ],
      rating: 4.0,
      reviewCount: 89,
      badge: 'new',
      inStock: true,
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-02-01'),
      characteristics: [
        { label: 'Marque', value: 'Brand X' },
        { label: 'Modèle', value: 'YZ-2024' },
        { label: 'Couleur', value: 'Bleu' },
        { label: 'Matériau', value: 'Plastique' }
      ],
      details: [
        'Design ergonomique pour un confort optimal',
        'Technologie de pointe intégrée',
        'Garantie de 1 an',
        'Livraison gratuite incluse'
      ],
      relatedProducts: [1, 3, 5]
    },
    {
      id: 7,
      name: 'Produit 3',
      description: 'Description détaillée du produit 3 avec ses avantages.',
      price: 159.99,
      oldPrice: 199.99,
      category: 'Catégorie 3',
      imageUrl: 'https://picsum.photos/400/300?random=25',
      images: [
        'https://picsum.photos/400/300?random=25',
        'https://picsum.photos/400/300?random=26',
        'https://picsum.photos/400/300?random=27',
        'https://picsum.photos/400/300?random=28'
      ],
      rating: 2.3,
      reviewCount: 256,
      badge: 'sale',
      inStock: true,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-02-15'),
      characteristics: [
        { label: 'Marque', value: 'Brand Z' },
        { label: 'Modèle', value: 'AB-2024' },
        { label: 'Couleur', value: 'Gris' },
        { label: 'Matériau', value: 'Acier' }
      ],
      details: [
        'Design ergonomique pour un confort optimal',
        'Technologie de pointe intégrée',
        'Garantie de 3 ans',
        'Livraison gratuite incluse'
      ],
      relatedProducts: [1, 2, 4]
    },
    {
      id: 8,
      name: 'Produit Premium 1',
      description: 'Une description détaillée du produit premium avec ses caractéristiques uniques.',
      price: 99.99,
      category: 'Catégorie 1',
      imageUrl: 'https://picsum.photos/400/300?random=29',
      images: [
        'https://picsum.photos/400/300?random=29',
        'https://picsum.photos/400/300?random=30',
        'https://picsum.photos/400/300?random=31',
        'https://picsum.photos/400/300?random=32'
      ],
      rating: 4.5,
      reviewCount: 128,
      badge: 'popular',
      inStock: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
      characteristics: [
        { label: 'Marque', value: 'Premium Brand' },
        { label: 'Modèle', value: 'XL-2024' },
        { label: 'Couleur', value: 'Noir' },
        { label: 'Matériau', value: 'Aluminium' }
      ],
      details: [
        'Design ergonomique pour un confort optimal',
        'Technologie de pointe intégrée',
        'Garantie de 2 ans',
        'Livraison gratuite incluse'
      ],
      relatedProducts: [2, 3, 4]
    },
    {
      id: 9,
      name: 'Produit 3',
      description: 'Description détaillée du produit 2 avec ses spécificités.',
      price: 149.99,
      category: 'Catégorie 2',
      imageUrl: 'https://picsum.photos/400/300?random=33',
      images: [
        'https://picsum.photos/400/300?random=33',
        'https://picsum.photos/400/300?random=34',
        'https://picsum.photos/400/300?random=35',
        'https://picsum.photos/400/300?random=36'
      ],
      rating: 4.0,
      reviewCount: 89,
      badge: 'new',
      inStock: true,
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-02-01'),
      characteristics: [
        { label: 'Marque', value: 'Brand X' },
        { label: 'Modèle', value: 'YZ-2024' },
        { label: 'Couleur', value: 'Bleu' },
        { label: 'Matériau', value: 'Plastique' }
      ],
      details: [
        'Design ergonomique pour un confort optimal',
        'Technologie de pointe intégrée',
        'Garantie de 1 an',
        'Livraison gratuite incluse'
      ],
      relatedProducts: [1, 3, 5]
    },
    {
      id: 10,
      name: 'Produit 3',
      description: 'Description détaillée du produit 3 avec ses avantages.',
      price: 159.99,
      oldPrice: 199.99,
      category: 'Catégorie 3',
      imageUrl: 'https://picsum.photos/400/300?random=37',
      images: [
        'https://picsum.photos/400/300?random=37',
        'https://picsum.photos/400/300?random=38',
        'https://picsum.photos/400/300?random=39',
        'https://picsum.photos/400/300?random=40'
      ],
      rating: 4.1,
      reviewCount: 256,
      badge: 'sale',
      inStock: true,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-02-15'),
      characteristics: [
        { label: 'Marque', value: 'Brand Z' },
        { label: 'Modèle', value: 'AB-2024' },
        { label: 'Couleur', value: 'Gris' },
        { label: 'Matériau', value: 'Acier' }
      ],
      details: [
        'Design ergonomique pour un confort optimal',
        'Technologie de pointe intégrée',
        'Garantie de 3 ans',
        'Livraison gratuite incluse'
      ],
      relatedProducts: [1, 2, 4]
    },
    {
      id: 11,
      name: 'Produit-produit',
      description: 'Description détaillée du produit 3 avec ses avantages.',
      price: 155.99,
      oldPrice: 195.99,
      category: 'Catégorie 3',
      imageUrl: 'https://picsum.photos/400/300?random=37',
      images: [
        'https://picsum.photos/400/300?random=37',
        'https://picsum.photos/400/300?random=38',
        'https://picsum.photos/400/300?random=39',
        'https://picsum.photos/400/300?random=40'
      ],
      rating: 2.0,
      reviewCount: 256,
      badge: 'sale',
      inStock: true,
      createdAt: new Date('2025-10-15'),
      updatedAt: new Date('2024-02-15'),
      characteristics: [
        { label: 'Marque', value: 'Brand Z' },
        { label: 'Modèle', value: 'AB-2024' },
        { label: 'Couleur', value: 'Gris' },
        { label: 'Matériau', value: 'Acier' }
      ],
      details: [
        'Design ergonomique pour un confort optimal',
        'Technologie de pointe intégrée',
        'Garantie de 3 ans',
        'Livraison gratuite incluse'
      ],
      relatedProducts: [1, 2, 4]
    },
    {
      id: 12,
      name: 'Produit 3',
      description: 'Description détaillée du produit 3 avec ses avantages.',
      price: 129.99,
      oldPrice: 129.99,
      category: 'Catégorie 3',
      imageUrl: 'https://picsum.photos/400/300?random=37',
      images: [
        'https://picsum.photos/400/300?random=37',
        'https://picsum.photos/400/300?random=38',
        'https://picsum.photos/400/300?random=39',
        'https://picsum.photos/400/300?random=40'
      ],
      rating: 4.5,
      reviewCount: 256,
      badge: 'new',
      inStock: true,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-02-15'),
      characteristics: [
        { label: 'Marque', value: 'Brand Z' },
        { label: 'Modèle', value: 'AB-2024' },
        { label: 'Couleur', value: 'Gris' },
        { label: 'Matériau', value: 'Acier' }
      ],
      details: [
        'Design ergonomique pour un confort optimal',
        'Technologie de pointe intégrée',
        'Garantie de 3 ans',
        'Livraison gratuite incluse'
      ],
      relatedProducts: [1, 2, 4]
    },
    {
      id: 13,
      name: 'Produit-produit',
      description: 'Description détaillée du produit 3 avec ses avantages.',
      price: 155.99,
      oldPrice: 195.99,
      category: 'Catégorie 3',
      imageUrl: 'https://picsum.photos/400/300?random=37',
      images: [
        'https://picsum.photos/400/300?random=37',
        'https://picsum.photos/400/300?random=38',
        'https://picsum.photos/400/300?random=39',
        'https://picsum.photos/400/300?random=40'
      ],
      rating: 5.0,
      reviewCount: 256,
      badge: 'popular',
      inStock: true,
      createdAt: new Date('2025-10-15'),
      updatedAt: new Date('2024-02-15'),
      characteristics: [
        { label: 'Marque', value: 'Brand Z' },
        { label: 'Modèle', value: 'AB-2024' },
        { label: 'Couleur', value: 'Gris' },
        { label: 'Matériau', value: 'Acier' }
      ],
      details: [
        'Design ergonomique pour un confort optimal',
        'Technologie de pointe intégrée',
        'Garantie de 3 ans',
        'Livraison gratuite incluse'
      ],
      relatedProducts: [1, 2, 4]
    },
  ];

  private categories: Category[] = [
    {
      id: 1,
      name: 'Catégorie 1',
      icon: 'fas fa-laptop',
      productCount: 12
    },
    {
      id: 2,
      name: 'Catégorie 2',
      icon: 'fas fa-mobile-alt',
      productCount: 8
    },
    {
      id: 3,
      name: 'Catégorie 3',
      icon: 'fas fa-headphones',
      productCount: 15
    },

  ];

  constructor() { }

  // Récupérer tous les produits avec filtrage optionnel et pagination
  getProducts(filter?: ProductFilter): Observable<PaginatedProducts> {
    let filteredProducts = [...this.products];

    if (filter) {
      if (filter.category) {
        filteredProducts = filteredProducts.filter(p => p.category === filter.category);
      }

      if (filter.search) {
        const searchLower = filter.search.toLowerCase();
        filteredProducts = filteredProducts.filter(p =>
          p.name.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower)
        );
      }

      if (filter.minPrice !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.price >= filter.minPrice!);
      }

      if (filter.maxPrice !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.price <= filter.maxPrice!);
      }

      if (filter.sortBy) {
        switch (filter.sortBy) {
          case 'popular':
            filteredProducts.sort((a, b) => b.reviewCount - a.reviewCount);
            break;
          case 'recent':
            filteredProducts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
            break;
          case 'price-asc':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
          case 'price-desc':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        }
      }
    }

    // Pagination
    const page = filter?.page || 1;
    const pageSize = filter?.pageSize || 6;
    const total = filteredProducts.length;
    const totalPages = Math.ceil(total / pageSize);
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const items = filteredProducts.slice(start, end);

    // Simuler un délai de réponse API
    return of({
      items,
      total,
      page,
      pageSize,
      totalPages
    }).pipe(delay(300));
  }

  // Récupérer un produit par son ID
  getProductById(id: number): Observable<Product | undefined> {
    return of(this.products.find(p => p.id === id)).pipe(delay(300));
  }

  // Récupérer les produits en promotion
  getPromotionalProducts(): Observable<Product[]> {
    return this.getProducts().pipe(
      map(products => products.items.filter(p => p.badge === 'sale'))
    );
  }

  // Récupérer les nouveaux produits
  getNewProducts(): Observable<Product[]> {
    return this.getProducts().pipe(
      map(products => products.items.filter(p => p.badge === 'new'))
    );
  }

  // Récupérer les produits populaires
  getPopularProducts(): Observable<Product[]> {
    return this.getProducts().pipe(
      map(products => products.items.filter(p => p.badge === 'popular'))
    );
  }

  // Récupérer toutes les catégories
  getCategories(): Observable<Category[]> {
    return of(this.categories).pipe(delay(300));
  }

  // Récupérer une catégorie par son ID
  getCategoryById(id: number): Observable<Category | undefined> {
    return of(this.categories.find(c => c.id === id)).pipe(delay(300));
  }

  // Mettre à jour le nombre de produits dans une catégorie
  private updateCategoryProductCount(categoryName: string): void {
    const category = this.categories.find(c => c.name === categoryName);
    if (category) {
      category.productCount = this.products.filter(p => p.category === categoryName).length;
    }
  }

  // Ajouter un nouveau produit
  addProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Observable<Product> {
    const newProduct: Product = {
      ...product,
      id: Math.max(...this.products.map(p => p.id)) + 1,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.products.push(newProduct);
    this.updateCategoryProductCount(newProduct.category);

    return of(newProduct).pipe(delay(300));
  }

  // Mettre à jour un produit existant
  updateProduct(id: number, updates: Partial<Product>): Observable<Product | undefined> {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) return of(undefined);

    const updatedProduct: Product = {
      ...this.products[index],
      ...updates,
      updatedAt: new Date()
    };

    this.products[index] = updatedProduct;

    if (updates.category) {
      this.updateCategoryProductCount(this.products[index].category);
      this.updateCategoryProductCount(updates.category);
    }

    return of(updatedProduct).pipe(delay(300));
  }

  // Supprimer un produit
  deleteProduct(id: number): Observable<boolean> {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) return of(false);

    const category = this.products[index].category;
    this.products.splice(index, 1);
    this.updateCategoryProductCount(category);

    return of(true).pipe(delay(300));
  }
}
