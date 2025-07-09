import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FavoritesService } from '../../services/favorites.service';
import { Product } from '../../models/product.model';

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
              <button class="action-button remove-favorite" (click)="removeFromFavorites(product.id)">
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
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favorites: Product[] = [];

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit(): void {
    this.favoritesService.getFavorites().subscribe(
      favorites => this.favorites = favorites
    );
  }

  removeFromFavorites(productId: number): void {
    this.favoritesService.removeFromFavorites(productId);
  }

  getRatingStars(rating: number): number[] {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return Array(fullStars).fill(1)
      .concat(hasHalfStar ? [0.5] : [])
      .concat(Array(emptyStars).fill(0));
  }
} 