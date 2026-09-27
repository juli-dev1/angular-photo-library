import { Injectable, signal } from '@angular/core';
import { Photo } from '../models/photo.model';

const STORAGE_KEY = 'gallery-template:favorites';

@Injectable({ providedIn: 'root' })

export class FavoritesService {
  private readonly favoritesState = signal(this.readFavorites());
  readonly favorites = this.favoritesState.asReadonly();

  isFavorite(photoId: number): boolean {
    return this.favoritesState().some((photo) => photo.id === photoId);
  }

  addFavorite(photo: Photo): boolean {
    if (this.isFavorite(photo.id)) {
      return false;
    }

    const favorites = [...this.favoritesState(), photo];
    this.favoritesState.set(favorites);
    this.saveFavorites(favorites);
    return true;
  }

  removeFavorite(photoId: number): boolean {
    const favorites = this.favoritesState();
    const updatedFavorites = favorites.filter((photo) => photo.id !== photoId);

    if (updatedFavorites.length === favorites.length) {
      return false;
    }

    this.favoritesState.set(updatedFavorites);
    this.saveFavorites(updatedFavorites);
    return true;
  }

  private readFavorites(): Photo[] {
    try {
      const storedFavorites = localStorage.getItem(STORAGE_KEY);
      if (!storedFavorites) {
        return [];
      }

      const parsed: unknown = JSON.parse(storedFavorites);
      return Array.isArray(parsed) ? 
        parsed.filter((value): value is Photo => this.isPhoto(value)) : [];
    } catch {
      return [];
    }
  }

  private saveFavorites(favorites: Photo[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      
    }
  }

  private isPhoto(value: unknown): value is Photo {
    if (typeof value !== 'object' || value === null) {
      return false;
    }

    const photo = value as Record<string, unknown>;
    return Number.isInteger(photo['id']) && Number(photo['id']) > 0
      && typeof photo['url'] === 'string'
      && typeof photo['alt'] === 'string';
  }
}