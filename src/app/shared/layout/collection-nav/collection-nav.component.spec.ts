import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CollectionNavComponent } from './collection-nav.component';

@Component({
  template: '<p>Navigation target</p>',
  standalone: false
})
class NavigationTargetComponent {}

describe('CollectionNavComponent', () => {
  let fixture: ComponentFixture<CollectionNavComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollectionNavComponent, NavigationTargetComponent],
      imports: [
        MatButtonModule,
        MatIconModule,
        RouterTestingModule.withRoutes([
          { path: 'home', component: NavigationTargetComponent },
          { path: 'favorites', component: NavigationTargetComponent }
        ])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CollectionNavComponent);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('renders Photos and Favorites links with their expected paths', () => {
    const photosLink = fixture.nativeElement.querySelector('a[routerLink="/home"]') as HTMLAnchorElement | null;
    const favoritesLink = fixture.nativeElement.querySelector('a[routerLink="/favorites"]') as HTMLAnchorElement | null;

    expect(photosLink).not.toBeNull();
    expect(photosLink?.textContent).toContain('Photos');
    expect(photosLink?.getAttribute('href')).toBe('/home');
    expect(favoritesLink).not.toBeNull();
    expect(favoritesLink?.textContent).toContain('Favorites');
    expect(favoritesLink?.getAttribute('href')).toBe('/favorites');
  });

  it('navigates to Favorites when its link is clicked', async () => {
    const favoritesLink = fixture.nativeElement.querySelector('a[routerLink="/favorites"]') as HTMLAnchorElement | null;

    expect(favoritesLink).not.toBeNull();
    if (favoritesLink) {
      favoritesLink.click();
      await fixture.whenStable();
      expect(router.url).toBe('/favorites');
    }
  });
});