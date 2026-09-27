import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FavoritesService } from '../../core/services/favorites.service';
import { FavoritesComponent } from './favorites.component';

describe('FavoritesComponent', () => {
  const storageKey = 'gallery-template:favorites';

  beforeEach(() => localStorage.removeItem(storageKey));
  afterEach(() => localStorage.removeItem(storageKey));

  it('shows photos saved by the Gallery', async () => {
    await TestBed.configureTestingModule({
      declarations: [FavoritesComponent],
      imports: [RouterTestingModule]
    }).compileComponents();

    const photo = {
      id: 7,
      url: 'https://picsum.photos/200/300?random=7',
      alt: 'Random photo 7'
    };
    TestBed.inject(FavoritesService).addFavorite(photo);

    const fixture = TestBed.createComponent(FavoritesComponent);
    fixture.detectChanges();

    const image = fixture.nativeElement.querySelector('img') as HTMLImageElement | null;
    expect(image?.getAttribute('src')).toBe(photo.url);
    expect(image?.getAttribute('alt')).toBe(photo.alt);
  });
});