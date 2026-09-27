import { Component } from '@angular/core';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { GalleryComponent } from './gallery.component';

@Component({
  template: '<p>Photo detail route</p>',
  standalone: false
})
class PhotoRouteTargetComponent {}

describe('GalleryComponent', () => {
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GalleryComponent, PhotoRouteTargetComponent],
      imports: [RouterTestingModule.withRoutes([
        { path: 'photos/:id', component: PhotoRouteTargetComponent }
      ])]
    }).compileComponents();

    router = TestBed.inject(Router);
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

  it('navigates to the photo detail route when a photo is clicked', fakeAsync(() => {
    const fixture = TestBed.createComponent(GalleryComponent);
    fixture.detectChanges();
    tick(250);
    fixture.detectChanges();

    const photoLink = fixture.nativeElement.querySelector('a[href="/photos/1"]') as HTMLAnchorElement | null;
    expect(photoLink).not.toBeNull();

    if (photoLink) {
      photoLink.click();
      tick();
      expect(router.url).toBe('/photos/1');
    }
  }));
});