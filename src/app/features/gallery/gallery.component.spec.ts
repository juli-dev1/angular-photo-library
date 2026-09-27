import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { GalleryComponent } from './gallery.component';

describe('GalleryComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GalleryComponent]
    }).compileComponents();
  });

  it('shows a loading indicator while the first photos are loading', () => {
    const fixture = TestBed.createComponent(GalleryComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[role="status"]')).not.toBeNull();
  });

  it('shows Picsum photos after a short loading delay', fakeAsync(() => {
    const fixture = TestBed.createComponent(GalleryComponent);
    fixture.detectChanges();

    tick(199);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('img').length).toBe(0);

    tick(51);
    fixture.detectChanges();

    const images = fixture.nativeElement.querySelectorAll('img') as NodeListOf<HTMLImageElement>;
    expect(images.length).toBeGreaterThan(0);
    expect(Array.from(images).every((image) => image.getAttribute('src')?.includes('picsum.photos/200/300'))).toBeTrue();
  }));

  it('loads another batch of photos when the user reaches the bottom', fakeAsync(() => {
    spyOnProperty(window, 'innerHeight', 'get').and.returnValue(800);
    spyOnProperty(window, 'scrollY', 'get').and.returnValue(800);
    spyOnProperty(document.documentElement, 'scrollHeight', 'get').and.returnValue(800);

    const fixture = TestBed.createComponent(GalleryComponent);
    fixture.detectChanges();
    tick(250);
    fixture.detectChanges();

    const initialCount = fixture.nativeElement.querySelectorAll('img').length;
    window.dispatchEvent(new Event('scroll'));
    fixture.detectChanges();
    tick(250);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('img').length).toBeGreaterThan(initialCount);
  }));

  it('adds the clicked photo to favorites and confirms success', fakeAsync(() => {
    const fixture = TestBed.createComponent(GalleryComponent);
    fixture.detectChanges();
    tick(250);
    fixture.detectChanges();

    const photoCard = fixture.nativeElement.querySelector('.photo-card') as HTMLElement | null;
    expect(photoCard).not.toBeNull();

    if (photoCard) {
      photoCard.click();
      fixture.detectChanges();

      expect(photoCard.getAttribute('aria-pressed')).toBe('true');
      expect(fixture.nativeElement.querySelector('[role="status"]')?.textContent).toContain('Added to favorites');
    }
  }));
});