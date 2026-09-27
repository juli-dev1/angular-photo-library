import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import type { Photo } from '../models/photo.model';
import { PhotoService } from './photo.service';

describe('PhotoService', () => {
  let service: PhotoService;

  beforeEach(() => {
    service = TestBed.inject(PhotoService);
  });

  it('returns a mapped page after the simulated request delay', fakeAsync(() => {
    let photos: Photo[] | undefined;
    service.getBatch(1, 2).subscribe((result) => photos = result);

    tick(249);
    expect(photos).toBeUndefined();

    tick(1);
    expect(photos?.map((photo) => photo.id)).toEqual([3, 4]);
    expect(photos?.[0].url).toBe('https://picsum.photos/200/300?random=3');
    expect(photos?.[0].alt).toBe('Random photo 3');
  }));
});