import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { delay, of } from 'rxjs';
import { FavoritesService } from '../../core/services/favorites.service';
import type { Photo } from '../../core/models/photo.model';
import { PhotoService } from '../../core/services/photo.service';
import { PhotoDetailComponent } from './photo-detail.component';

describe('PhotoDetailComponent', () => {
  let photoService: jasmine.SpyObj<PhotoService>;
  let favoritesService: {
    isFavorite: jasmine.Spy;
    removeFavorite: jasmine.Spy;
  };

  const photo: Photo = {
    id: 42,
    url: 'https://picsum.photos/200/300?random=42',
    alt: 'Random photo 42'
  };

  beforeEach(async () => {
    photoService = jasmine.createSpyObj<PhotoService>('PhotoService', ['getById']);
    photoService.getById.and.returnValue(of(photo).pipe(delay(250)));
    favoritesService = {
      isFavorite: jasmine.createSpy('isFavorite').and.returnValue(true),
      removeFavorite: jasmine.createSpy('removeFavorite')
    };

    await TestBed.configureTestingModule({
      declarations: [PhotoDetailComponent],
      imports: [MatButtonModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of(convertToParamMap({ id: '42' })) }
        },
        {
          provide: PhotoService,
          useValue: photoService
        },
        {
          provide: FavoritesService,
          useValue: favoritesService
        }
      ]
    }).compileComponents();
  });

  it('renders one full photo for the id in the route', fakeAsync(() => {
    const fixture = TestBed.createComponent(PhotoDetailComponent);
    fixture.detectChanges();
    tick(250);
    fixture.detectChanges();

    const images = fixture.nativeElement.querySelectorAll('img') as NodeListOf<HTMLImageElement>;

    expect(images.length).toBe(1);
    expect(photoService.getById).toHaveBeenCalledOnceWith(42);
    if (images.length === 1) {
      expect(images[0].getAttribute('src')).toBe(photo.url);
      expect(images[0].getAttribute('alt')).toBe(photo.alt);
    }
    expect(fixture.nativeElement.querySelector('.photo-detail')).not.toBeNull();
  }));

  it('shows a Remove from favorites button below a favorited photo', fakeAsync(() => {
    const fixture = TestBed.createComponent(PhotoDetailComponent);
    fixture.detectChanges();
    tick(250);
    fixture.detectChanges();

    const image = fixture.nativeElement.querySelector('img') as HTMLImageElement | null;
    const removeButton = fixture.nativeElement.querySelector('button.remove-from-favorites') as HTMLButtonElement | null;

    expect(image).not.toBeNull();
    expect(removeButton).not.toBeNull();
    expect(removeButton?.textContent).toContain('Remove from favorites');

    if (image && removeButton) {
      expect(Boolean(image.compareDocumentPosition(removeButton) & Node.DOCUMENT_POSITION_FOLLOWING)).toBeTrue();
    }
  }));

  it('removes the displayed photo from favorites when the button is clicked', fakeAsync(() => {
    const fixture = TestBed.createComponent(PhotoDetailComponent);
    fixture.detectChanges();
    tick(250);
    fixture.detectChanges();

    const removeButton = fixture.nativeElement.querySelector('button.remove-from-favorites') as HTMLButtonElement | null;
    expect(removeButton).not.toBeNull();

    removeButton?.click();
    expect(favoritesService.removeFavorite).toHaveBeenCalledWith(42);
  }));
});