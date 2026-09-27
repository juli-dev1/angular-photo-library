import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './shared/layout/header/header.component';
import { AppFooterComponent } from './shared/layout/footer/footer.component';
import { CollectionNavComponent } from './shared/layout/collection-nav/collection-nav.component';

@Component({
  template: '<p>Photo route</p>',
  standalone: false
})
class PhotoRouteComponent {}

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule.withRoutes([{ path: 'photos/:id', component: PhotoRouteComponent }]),
      MatButtonModule,
      MatIconModule
    ],
    declarations: [AppComponent, AppHeaderComponent, AppFooterComponent, CollectionNavComponent, PhotoRouteComponent]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'gallery-template'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('gallery-template');
  });
  it('should render the application layout', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-header')).not.toBeNull();
    expect(compiled.querySelector('main.page-content')).not.toBeNull();
    expect(compiled.querySelector('app-footer')).not.toBeNull();
  });

  it('keeps the header and collection navigation visible on a photo route', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    await TestBed.inject(Router).navigateByUrl('/photos/42');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-header')).not.toBeNull();
    expect(compiled.querySelectorAll('.collection-nav a').length).toBe(2);
    expect(compiled.textContent).toContain('Photo route');
  });
});
