import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { filter, finalize, map, switchMap } from 'rxjs';
import { FavoritesService } from '../../core/services/favorites.service';
import { Photo } from '../../core/models/photo.model';
import { PhotoService } from '../../core/services/photo.service';

@Component({
  selector: 'app-photo-detail',
  standalone: false,
  templateUrl: './photo-detail.component.html',
  styleUrls: ['./photo-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly photoService = inject(PhotoService);
  private readonly favoritesService = inject(FavoritesService);
  private readonly destroyRef = inject(DestroyRef);

  isLoading = signal(false);
  readonly photo = signal<Photo | null>(null);

  isFavorite(photoId: number): boolean {
    return this.favoritesService.isFavorite(photoId);
  }

  removeFromFavorites(photoId: number): void {
    this.favoritesService.removeFavorite(photoId);
  }

  ngOnInit(): void {
    this.route.paramMap
    .pipe(
        map((params) => Number(params.get('id'))),
        filter((id) => Number.isInteger(id) && id > 0),
        switchMap((id) => {
            this.isLoading.set(true);

            return this.photoService.getById(id).pipe(
                finalize(() => this.isLoading.set(false)),
            );
        }),
        takeUntilDestroyed(this.destroyRef),
    )
    .subscribe({
        next: (photo) => this.photo.set(photo ?? null),
        error: (error: unknown) =>
        console.error('Failed to load photo', error),
    });

  }
}