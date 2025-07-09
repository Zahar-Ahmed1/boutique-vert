import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { FavoritesService } from '../../services/favorites.service';
import { Product, Category, ProductFilter } from '../../models/product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  loading = true;
  searchQuery = '';
  selectedCategory = '';
  selectedSort = 'popular';

  // Pagination
  currentPage = 1;
  pageSize = 6;
  totalPages = 1;
  totalItems = 0;

  constructor(
    private productService: ProductService,
    private favoritesService: FavoritesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe(
      categories => {
        this.categories = categories;
      }
    );
  }

  loadProducts(): void {
    this.loading = true;
    const filter: ProductFilter = {
      search: this.searchQuery || undefined,
      category: this.selectedCategory || undefined,
      sortBy: this.selectedSort as 'popular' | 'recent' | 'price-asc' | 'price-desc',
      page: this.currentPage,
      pageSize: this.pageSize
    };

    this.productService.getProducts(filter).subscribe(
      response => {
        this.products = response.items;
        this.totalPages = response.totalPages;
        this.totalItems = response.total;
        this.loading = false;
      },
      error => {
        console.error('Erreur lors du chargement des produits:', error);
        this.loading = false;
      }
    );
  }

  toggleFavorite(event: Event, product: Product): void {
    event.stopPropagation(); // Empêche la navigation vers les détails du produit

    if (this.isProductInFavorites(product.id)) {
      this.favoritesService.removeFromFavorites(product.id);
    } else {
      this.favoritesService.addToFavorites(product);
    }
  }

  isProductInFavorites(productId: number): boolean {
    return this.favoritesService.isProductFavorite(productId);
  }

  onSearch(): void {
    this.currentPage = 1;
    this.loadProducts();
  }

  onCategoryChange(): void {
    this.currentPage = 1;
    this.loadProducts();
  }

  onSortChange(): void {
    this.currentPage = 1;
    this.loadProducts();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadProducts();
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getPages(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;

    if (this.totalPages <= maxVisiblePages) {
      // Si le nombre total de pages est inférieur ou égal au nombre maximum de pages visibles
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Calcul des pages à afficher
      let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
      let endPage = startPage + maxVisiblePages - 1;

      if (endPage > this.totalPages) {
        endPage = this.totalPages;
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  }

  getRatingStars(rating: number): number[] {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return Array(fullStars).fill(1)
      .concat(hasHalfStar ? [0.5] : [])
      .concat(Array(emptyStars).fill(0));
  }

  getDisplayedProductsRange(): { start: number; end: number } {
    const start = (this.currentPage - 1) * this.pageSize + 1;
    const end = Math.min(this.currentPage * this.pageSize, this.totalItems);
    return { start, end };
  }

  navigateToProductDetails(productId: number): void {
    this.router.navigate(['/products', productId]);
  }

  // Gestion du compte à rebours
  getCountdownTime(): { days: string; hours: string; minutes: string } {
    const now = new Date();
    const endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2); // 2 jours à partir d'aujourd'hui
    const diff = endDate.getTime() - now.getTime();

    const days = Math.floor(diff / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');

    return { days, hours, minutes };
  }
  //badge
  getBadgeLabel(badge: string): string {
    switch (badge) {
      case 'sale': return '-30%';
      case 'new': return 'Nouveau';
      case 'popular': return 'Populaire';
      default: return '';
    }
  }
}
