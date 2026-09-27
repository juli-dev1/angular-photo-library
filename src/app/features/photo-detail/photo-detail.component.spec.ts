import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import type { Photo } from '../../core/models/photo.model';
import { PhotoService } from '../../core/services/photo.service';
import { PhotoDetailComponent } from './photo-detail.component';

describe('PhotoDetailComponent', () => {
  const photo: Photo = {
    id: 42,
    url: 'https://picsum.photos/200/300?random=42',
    alt: 'Random photo 42'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhotoDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: convertToParamMap({ id: '42' }) } }
        },
        {
          provide: PhotoService,
          useValue: { getBatch: jasmine.createSpy('getBatch').and.returnValue(of([photo])) }
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
    if (images.length === 1) {
      expect(images[0].getAttribute('src')).toBe(photo.url);
      expect(images[0].getAttribute('alt')).toBe(photo.alt);
    }
    expect(fixture.nativeElement.querySelector('.photo-detail')).not.toBeNull();
  }));
});