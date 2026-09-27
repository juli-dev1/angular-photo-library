import { Photo } from '../models/photo.model';
import { FavoritesService } from './favorites.service';

describe('FavoritesService', () => {
  const storageKey = 'gallery-template:favorites';
  const photo: Photo = {
    id: 7,
    url: 'https://picsum.photos/200/300?random=7',
    alt: 'Random photo 7'
  };

  beforeEach(() => localStorage.removeItem(storageKey));
  afterEach(() => localStorage.removeItem(storageKey));

  it('restores saved photos after the service is recreated', () => {
    const firstService = new FavoritesService();
    firstService.addFavorite(photo);

    const serviceAfterRefresh = new FavoritesService();

    expect(serviceAfterRefresh.favorites()).toEqual([photo]);
  });

  it('removes a photo from favorites and persists the change', () => {
    const service = new FavoritesService();
    service.addFavorite(photo);

    expect(service.removeFavorite(photo.id)).toBeTrue();
    expect(service.favorites()).toEqual([]);
    expect(new FavoritesService().favorites()).toEqual([]);
  });
});