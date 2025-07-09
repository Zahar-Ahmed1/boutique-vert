import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favorites: Product[] = [];
  private favoritesSubject = new BehaviorSubject<Product[]>([]);

  constructor() {
    // Charger les favoris depuis le localStorage au démarrage
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      this.favorites = JSON.parse(savedFavorites);
      this.favoritesSubject.next(this.favorites);
    }
  }

  getFavorites(): Observable<Product[]> {
    return this.favoritesSubject.asObservable();
  }

  addToFavorites(product: Product): void {
    if (!this.favorites.find(p => p.id === product.id)) {
      this.favorites = [...this.favorites, product];
      this.updateFavorites();
    }
  }

  removeFromFavorites(productId: number): void {
    this.favorites = this.favorites.filter(p => p.id !== productId);
    this.updateFavorites();
  }

  isProductFavorite(productId: number): boolean {
    return this.favorites.some(p => p.id === productId);
  }

  private updateFavorites(): void {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
    this.favoritesSubject.next(this.favorites);
  }
} 