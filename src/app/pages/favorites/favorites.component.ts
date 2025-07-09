import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FavoritesService } from '../../services/favorites.service';
import { Product } from '../../models/product.model';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="page-header">
      <div class="header-content">
        <h1>Mes Favoris</h1>
        <p>Retrouvez tous vos produits préférés</p>
      </div>
    </div>

    <div class="favorites-container">
      <div *ngIf="favorites.length === 0" class="no-favorites">
        <i class="fas fa-heart-broken"></i>
        <p>Vous n'avez pas encore de produits favoris</p>
        <button routerLink="/products" class="browse-button">
          Parcourir les produits
        </button>
      </div>

      <div *ngIf="favorites.length > 0" class="products-grid">
        <div *ngFor="let product of favorites" class="product-card">
          <div *ngIf="product.badge" class="product-badge" [class]="product.badge">
            {{product.badge === 'sale' ? '-20%' : (product.badge === 'new' ? 'Nouveau' : 'Populaire')}}
          </div>
          
          <div class="product-image">
            <img [src]="product.images?.[0] || product.imageUrl" [alt]="product.name">
            <div class="product-actions">
              <button class="action-button" [routerLink]="['/products', product.id]">
                <i class="fas fa-eye"></i>
              </button>
              <button class="action-button remove-favorite" (click)="removeFromFavorites(product)">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>

          <div class="product-info">
            <div class="product-category">{{product.category}}</div>
            <h3>{{product.name}}</h3>
            <div class="product-rating">
              <ng-container *ngFor="let star of getRatingStars(product.rating)">
                <i class="fas fa-star" *ngIf="star === 1"></i>
                <i class="fas fa-star-half-alt" *ngIf="star === 0.5"></i>
                <i class="far fa-star" *ngIf="star === 0"></i>
              </ng-container>
              <span>({{product.rating}})</span>
            </div>
            <p class="description">{{product.description}}</p>
            <div class="product-footer">
              <p class="price">
                <span *ngIf="product.oldPrice" class="old-price">{{product.oldPrice}} €</span>
                {{product.price}} €
              </p>
              <button class="details-button" [routerLink]="['/products', product.id]">
                Voir détails
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./favorites.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.5s ease', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('staggerAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.5s ease', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class FavoritesComponent implements OnInit {
  favorites: Product[] = [];
  recommendedProducts: Product[] = [];

  constructor(private favoritesService: FavoritesService, private router: Router) {}

  ngOnInit(): void {
    this.favoritesService.getFavorites().subscribe(
      favorites => this.favorites = favorites
    );

    // Charger les produits recommandés
    this.loadRecommendedProducts();
  }

  removeFromFavorites(product: Product): void {
    this.favoritesService.removeFromFavorites(product.id);
  }

  getRatingStars(rating: number): number[] {
    const stars: number[] = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(1);
    }

    if (hasHalfStar) {
      stars.push(0.5);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(0);
    }

    return stars;
  }

  addToCart(product: Product) {
    // Implémenter la logique d'ajout au panier
    console.log('Ajouter au panier:', product);
  }

  private loadRecommendedProducts() {
    // Simuler le chargement des produits recommandés
    // Dans une application réelle, cela viendrait d'une API
    this.recommendedProducts = [
      {
        id: 1,
        name: 'Produit Recommandé 1',
        price: 99.99,
        description: 'Description du produit recommandé 1',
        category: 'Catégorie 1',
        rating: 4.5,
        imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
        badge: 'new',
        reviewCount: 12,
        inStock: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Produit Recommandé 2',
        price: 149.99,
        oldPrice: 199.99,
        description: 'Description du produit recommandé 2',
        category: 'Catégorie 2',
        rating: 4.0,
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
        badge: 'sale',
        reviewCount: 8,
        inStock: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'Produit Recommandé 3',
        price: 79.99,
        description: 'Description du produit recommandé 3',
        category: 'Catégorie 3',
        rating: 4.8,
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
        badge: 'popular',
        reviewCount: 15,
        inStock: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
  }
} 