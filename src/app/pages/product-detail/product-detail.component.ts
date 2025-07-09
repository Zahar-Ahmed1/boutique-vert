import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { FavoritesService } from '../../services/favorites.service';
import { Product } from '../../models/product.model';
import { switchMap, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, ErrorMessageComponent],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-out', style({ transform: 'translateX(0)' }))
      ])
    ])
  ]
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  loading = true;
  error = false;
  errorMessage = '';
  selectedImageIndex = 0;
  relatedProducts: Product[] = [];
  quantity = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => {
        const id = +params['id'];
        if (isNaN(id)) {
          throw new Error('ID de produit invalide');
        }
        return this.productService.getProductById(id).pipe(
          tap(product => {
            if (product) {
              this.loadSimilarProducts(product);
            }
          }),
          catchError(error => {
            this.error = true;
            this.errorMessage = error.message || 'Impossible de charger le produit';
            this.loading = false;
            return of(undefined);
          })
        );
      })
    ).subscribe(product => {
      if (!product) {
        this.error = true;
        this.errorMessage = 'Produit non trouvé';
      } else {
        this.product = product;
      }
      this.loading = false;
    });
  }

  loadSimilarProducts(currentProduct: Product): void {
    this.productService.getProducts({
      page: 1,
      pageSize: 100,
      sortBy: 'recent'
    }).pipe(
      catchError(error => {
        console.error('Erreur lors du chargement des produits similaires:', error);
        return of({ items: [], total: 0, page: 1, pageSize: 10 });
      })
    ).subscribe(response => {
      this.relatedProducts = response.items
        .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
        .slice(0, 4);

      console.log('Produits similaires trouvés:', this.relatedProducts);
    });
  }

  selectImage(index: number): void {
    this.selectedImageIndex = index;
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  getRatingStars(rating: number): number[] {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return Array(fullStars).fill(1)
      .concat(hasHalfStar ? [0.5] : [])
      .concat(Array(emptyStars).fill(0));
  }

  toggleFavorite(): void {
    if (!this.product) return;
    
    if (this.isProductInFavorites()) {
      this.favoritesService.removeFromFavorites(this.product.id);
    } else {
      this.favoritesService.addToFavorites(this.product);
    }
  }

  isProductInFavorites(): boolean {
    return this.product ? this.favoritesService.isProductFavorite(this.product.id) : false;
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }
} 