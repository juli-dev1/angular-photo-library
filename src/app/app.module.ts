import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './shared/layout/header/header.component';
import { AppFooterComponent } from './shared/layout/footer/footer.component';
import { CollectionNavComponent } from './shared/layout/collection-nav/collection-nav.component';
import { GalleryComponent } from './features/gallery/gallery.component';
import { FavoritesComponent } from './features/favorites/favorites.component';
import { PhotoDetailComponent } from './features/photo-detail/photo-detail.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppFooterComponent,
    CollectionNavComponent,
    GalleryComponent,
    FavoritesComponent,
    PhotoDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
