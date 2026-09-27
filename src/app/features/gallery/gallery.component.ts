import { ChangeDetectionStrategy, Component, HostListener, OnInit, inject, signal, DestroyRef } from '@angular/core';
import { Photo } from '../../core/models/photo.model';
import { PhotoService } from '../../core/services/photo.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-gallery',
  standalone: false,
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryComponent implements OnInit {
  private readonly photoService = inject(PhotoService);
  private readonly destroyRef = inject(DestroyRef);

  private readonly pageSize = 12;
  private page = 0;

  readonly photos = signal<Photo[]>([]);
  readonly isLoading = signal(false);

  ngOnInit(): void {
    this.loadNextPage();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (this.isLoading()) return;
    if (this.isNearBottom()) this.loadNextPage();
  }

  private loadNextPage(): void {
    if (this.isLoading()) return;

    this.isLoading.set(true);
    this.photoService.getBatch(this.page, this.pageSize)
    .pipe(
      takeUntilDestroyed(this.destroyRef),
      finalize(() => this.isLoading.set(false)),
    )
    .subscribe({
      next: (batch) => {
        this.photos.update((photos) => [...photos, ...batch]);
        this.page += 1;
      },
      error: (error) => {
        console.error('Failed to load photos', error);
      },
    });
  }

  private isNearBottom(): boolean {
    const loadMoreThreshold = 300; // Pixels from the bottom of the page to trigger loading more photos
    const scrollPosition = window.innerHeight + window.scrollY;
    const pageHeight = document.documentElement.scrollHeight;

    return scrollPosition >= pageHeight - loadMoreThreshold;
  };
}